// isa-parse — Parser and serializer for ISA notation
//
// Grammar:
//   state     = open | absolute | composite
//   open      = Q "(" (ID | composite) ")" inner?
//   absolute  = ID inner?
//   composite = "{" "}" | "{" state ("," state)* "}"
//   inner     = "{" state ("," state)* "}"
//   Q         = "-"? NUMBER
//   ID        = [A-Za-z_][A-Za-z0-9_]*

import { St } from './isa-state.mjs'

// ─── Tokenizer ───

const TOKEN = /(-?\d+(?:\.\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|([{}(),])/g

function tokenize(input) {
	const tokens = []
	let m
	TOKEN.lastIndex = 0
	while ((m = TOKEN.exec(input)) !== null) {
		if (m[1] !== undefined) tokens.push({ type: 'NUM', value: Number(m[1]) })
		else if (m[2] !== undefined) tokens.push({ type: 'ID', value: m[2] })
		else tokens.push({ type: m[3], value: m[3] })
	}
	tokens.push({ type: 'EOF', value: null })
	return tokens
}

// ─── Parser ───

function parse(input) {
	const tokens = tokenize(input)
	let pos = 0

	function peek() { return tokens[pos] }
	function advance() { return tokens[pos++] }
	function expect(type) {
		const t = advance()
		if (t.type !== type) throw new Error(`Expected ${type}, got ${t.type} "${t.value}"`)
		return t
	}

	// state = open | absolute | composite
	function parseState() {
		const t = peek()

		// composite: "{" ... "}"
		if (t.type === '{') return parseComposite()

		// open: NUM "(" ...
		if (t.type === 'NUM') return parseOpen()

		// absolute: ID inner?
		if (t.type === 'ID') return parseAbsolute()

		throw new Error(`Unexpected token ${t.type} "${t.value}"`)
	}

	// absolute = ID inner?
	function parseAbsolute() {
		const id = expect('ID').value
		const inner = maybeInner()
		return St(id, inner.length ? inner : undefined)
	}

	// open = Q "(" (ID | composite) ")" inner?
	function parseOpen() {
		const q = expect('NUM').value
		expect('(')

		let id, compositeInner
		if (peek().type === '{') {
			// quantified composite: Q({A, B})
			compositeInner = parseStateList()
			id = null
		} else {
			id = expect('ID').value
		}

		expect(')')
		const inner = maybeInner()

		if (id === null) {
			// quantified composite — inner from {} + extra inner from trailing {}
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
			// {} → empty composite
			return St(null, [])
		}
		const allInner = [...states, ...inner]
		return St(null, allInner.length ? allInner : undefined)
	}

	// "{" state? ("," state)* "}"
	function parseStateList() {
		expect('{')
		const states = []
		if (peek().type !== '}') {
			states.push(parseState())
			while (peek().type === ',') {
				advance() // consume ","
				states.push(parseState())
			}
		}
		expect('}')
		return states
	}

	// inner? = "{" state ("," state)* "}" | ε
	function maybeInner() {
		if (peek().type === '{') return parseStateList()
		return []
	}

	const result = parseState()
	if (peek().type !== 'EOF') {
		throw new Error(`Unexpected trailing token ${peek().type} "${peek().value}"`)
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

export { parse, stringify }
