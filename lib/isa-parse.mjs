// isa-parse — Parser and serializer for ISA notation
//
// Grammar (states):
//   state     = open | absolute | composite
//   open      = Q "(" (ID | composite) ")" inner?
//   absolute  = ID inner?
//   composite = "{" "}" | "{" state ("," state)* "}"
//   inner     = "{" state ("," state)* "}"
//   Q         = "-"? NUMBER
//   ID        = [A-Za-z_][A-Za-z0-9_]*
//
// Grammar (expressions — precedence lowest→highest):
//   expr   = level4
//   level4 = level3 (("∪" | "--" | "△") level3)*
//   level3 = level2 ("∩" level2)*
//   level2 = level1 (("+" | "-") level1)*
//   level1 = atom (("*" | "/") atom)*
//   atom   = "(" expr ")" | state

import { St } from './isa-state.mjs'

// ─── Tokenizer ───

const TOKEN = /(\d+(?:\.\d+)?)|(--|[+\-*/∪∩△])|([A-Za-z_][A-Za-z0-9_]*)|([{}(),])/g

function tokenize(input) {
	const tokens = []
	let m
	TOKEN.lastIndex = 0
	while ((m = TOKEN.exec(input)) !== null) {
		if (m[1] !== undefined) tokens.push({ type: 'NUM', value: Number(m[1]) })
		else if (m[2] !== undefined) tokens.push({ type: 'OP', value: m[2] })
		else if (m[3] !== undefined) tokens.push({ type: 'ID', value: m[3] })
		else tokens.push({ type: m[4], value: m[4] })
	}
	tokens.push({ type: 'EOF', value: null })
	return tokens
}

// ─── Shared parser helpers ───

function createParserState(tokens) {
	let pos = 0
	function peek() { return tokens[pos] }
	function peek2() { return tokens[pos + 1] || { type: 'EOF', value: null } }
	function advance() { return tokens[pos++] }
	function expect(type) {
		const t = advance()
		if (t.type !== type) throw new Error(`Expected ${type}, got ${t.type} "${t.value}"`)
		return t
	}
	return { peek, peek2, advance, expect }
}

function stateParser(p) {
	// state = open | absolute | composite
	function parseState() {
		const t = p.peek()

		// composite: "{" ... "}"
		if (t.type === '{') return parseComposite()

		// open: NUM "(" ... or negative open: OP(-) NUM "("
		if (t.type === 'NUM') return parseOpen()

		// negative open: "-" NUM "("
		if (t.type === 'OP' && t.value === '-' && p.peek2().type === 'NUM') {
			// Look ahead: OP(-) NUM "(" → negative open state
			const peek3 = p.peek2()
			// We need to check token at pos+2
			if (peek3.type === 'NUM') {
				// peek at pos+2 for "("
				const savedPos = getCurrentPos()
				p.advance() // consume "-"
				const numTok = p.peek()
				if (numTok.type === 'NUM' && p.peek2().type === '(') {
					// It's a negative open state: -NUM(...)
					return parseOpenNeg()
				}
				// Not a negative open — backtrack
				restorePos(savedPos)
			}
		}

		// absolute: ID inner?
		if (t.type === 'ID') return parseAbsolute()

		throw new Error(`Unexpected token ${t.type} "${t.value}"`)
	}

	let _pos_ref = null
	function getCurrentPos() { return _pos_ref() }
	function restorePos(pos) { _pos_set(pos) }

	// Inject pos access — these get set by the caller
	function setPosAccess(getPos, setPos) {
		_pos_ref = getPos
		_pos_set = setPos
	}
	let _pos_set = null

	// absolute = ID inner?
	function parseAbsolute() {
		const id = p.expect('ID').value
		const inner = maybeInner()
		return St(id, inner.length ? inner : undefined)
	}

	// open = NUM "(" (ID | composite) ")" inner?
	function parseOpen() {
		const q = p.expect('NUM').value
		p.expect('(')

		let id, compositeInner
		if (p.peek().type === '{') {
			compositeInner = parseStateList()
			id = null
		} else {
			id = p.expect('ID').value
		}

		p.expect(')')
		const inner = maybeInner()

		if (id === null) {
			const allInner = [...compositeInner, ...inner]
			return St(null, q, allInner.length ? allInner : undefined)
		}

		return St(id, q, inner.length ? inner : undefined)
	}

	// parseOpenNeg — already consumed "-", now at NUM "(" ...
	function parseOpenNeg() {
		const q = -p.expect('NUM').value
		p.expect('(')

		let id, compositeInner
		if (p.peek().type === '{') {
			compositeInner = parseStateList()
			id = null
		} else {
			id = p.expect('ID').value
		}

		p.expect(')')
		const inner = maybeInner()

		if (id === null) {
			const allInner = [...compositeInner, ...inner]
			return St(null, q, allInner.length ? allInner : undefined)
		}

		return St(id, q, inner.length ? inner : undefined)
	}

	// composite = "{" "}" | "{" state ("," state)* "}"
	function parseComposite() {
		const states = parseStateList()
		const inner = maybeInner()
		if (states.length === 0 && inner.length === 0) {
			return St(null, [])
		}
		const allInner = [...states, ...inner]
		return St(null, allInner.length ? allInner : undefined)
	}

	// "{" state? ("," state)* "}"
	function parseStateList() {
		p.expect('{')
		const states = []
		if (p.peek().type !== '}') {
			states.push(parseState())
			while (p.peek().type === ',') {
				p.advance()
				states.push(parseState())
			}
		}
		p.expect('}')
		return states
	}

	// inner? = "{" state ("," state)* "}" | ε
	function maybeInner() {
		if (p.peek().type === '{') return parseStateList()
		return []
	}

	return { parseState, setPosAccess }
}

// ─── parse(input) — single state (original API) ───

function parse(input) {
	const tokens = tokenize(input)
	let pos = 0
	const p = {
		peek() { return tokens[pos] },
		peek2() { return tokens[pos + 1] || { type: 'EOF', value: null } },
		advance() { return tokens[pos++] },
		expect(type) {
			const t = tokens[pos++]
			if (t.type !== type) throw new Error(`Expected ${type}, got ${t.type} "${t.value}"`)
			return t
		}
	}

	const sp = stateParser(p)
	sp.setPosAccess(() => pos, (v) => { pos = v })

	const result = sp.parseState()
	if (tokens[pos].type !== 'EOF') {
		throw new Error(`Unexpected trailing token ${tokens[pos].type} "${tokens[pos].value}"`)
	}
	return result
}

// ─── parseExpr(input) — expression with operators → AST ───

function parseExpr(input) {
	const tokens = tokenize(input)
	let pos = 0
	const p = {
		peek() { return tokens[pos] },
		peek2() { return tokens[pos + 1] || { type: 'EOF', value: null } },
		advance() { return tokens[pos++] },
		expect(type) {
			const t = tokens[pos++]
			if (t.type !== type) throw new Error(`Expected ${type}, got ${t.type} "${t.value}"`)
			return t
		}
	}

	const sp = stateParser(p)
	sp.setPosAccess(() => pos, (v) => { pos = v })

	// Precedence climbing parser
	// level4: set ops (∪, --, △) — lowest precedence
	function level4() {
		let left = level3()
		while (tokens[pos].type === 'OP' && (tokens[pos].value === '∪' || tokens[pos].value === '--' || tokens[pos].value === '△')) {
			const op = tokens[pos++].value
			const right = level3()
			left = { type: 'op', op, left, right }
		}
		return left
	}

	// level3: intersection (∩)
	function level3() {
		let left = level2()
		while (tokens[pos].type === 'OP' && tokens[pos].value === '∩') {
			const op = tokens[pos++].value
			const right = level2()
			left = { type: 'op', op, left, right }
		}
		return left
	}

	// level2: addition/subtraction (+, -)
	function level2() {
		let left = level1()
		while (tokens[pos].type === 'OP' && (tokens[pos].value === '+' || tokens[pos].value === '-')) {
			// Disambiguate: "-" NUM "(" is a negative state in next atom, not subtraction
			if (tokens[pos].value === '-' && tokens[pos + 1]?.type === 'NUM' && tokens[pos + 2]?.type === '(') {
				break
			}
			const op = tokens[pos++].value
			const right = level1()
			left = { type: 'op', op, left, right }
		}
		return left
	}

	// level1: multiplication/division (*, /)
	function level1() {
		let left = atom()
		while (tokens[pos].type === 'OP' && (tokens[pos].value === '*' || tokens[pos].value === '/')) {
			const op = tokens[pos++].value
			const right = atom()
			left = { type: 'op', op, left, right }
		}
		return left
	}

	// atom: "(" expr ")" | state
	function atom() {
		// Check for grouping parentheses: "(" that is NOT preceded by NUM (which would be open state)
		if (tokens[pos].type === '(') {
			// This is a grouping paren — parse inner expression
			pos++ // consume "("
			const expr = level4()
			p.expect(')')
			return expr
		}
		// Otherwise it's a state literal
		const st = sp.parseState()
		return { type: 'state', value: st }
	}

	const result = level4()
	if (tokens[pos].type !== 'EOF') {
		throw new Error(`Unexpected trailing token ${tokens[pos].type} "${tokens[pos].value}"`)
	}
	return result
}

// ─── Stringify ───

function stringify(state) {
	if (state.id === null) {
		// Composite
		const innerStr = state.inner.map(s => stringify(s)).join(', ')
		if (state.open) {
			// Quantified composite: Q({A, B})
			return `${state.q}({${innerStr}})`
		}
		// Bare composite: { A, B } or {}
		return `{${innerStr ? ' ' + innerStr + ' ' : ''}}`
	}

	let result = ''

	if (state.open) {
		// Open: Q(ID)
		result = `${state.q}(${state.id})`
	} else {
		// Absolute: ID
		result = state.id
	}

	// Append inner if present
	if (state.inner.length > 0) {
		const innerStr = state.inner.map(s => stringify(s)).join(', ')
		result += `{ ${innerStr} }`
	}

	return result
}

export { parse, parseExpr, stringify }
