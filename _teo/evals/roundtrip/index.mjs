import { St } from '../../../lib/isa-state.mjs'
import { parse, stringify } from '../../../lib/isa-parse.mjs'

async function Evaluator(input) {
	if (input.mode === 'parse-stringify') {
		// parse text, stringify back, compare with original
		const state = parse(input.text)
		return stringify(state)
	}
	if (input.mode === 'stringify-parse') {
		// build state, stringify, parse back, compare with original state
		const state = buildSt(input.state)
		const text = stringify(state)
		const back = parse(text)
		return stateToPlain(back)
	}
}

function buildSt(obj) {
	const inner = obj.inner ? obj.inner.map(i => buildSt(i)) : undefined
	if (obj.q !== undefined && inner) return St(obj.id, obj.q, inner)
	if (obj.q !== undefined) return St(obj.id, obj.q)
	if (inner) return St(obj.id, inner)
	return St(obj.id)
}

function stateToPlain(s) {
	return { id: s.id, q: s.q, open: s.open, inner: s.inner.map(i => stateToPlain(i)) }
}

const ASSERT_KEY = 'isa-eq'
export { Evaluator, ASSERT_KEY }
