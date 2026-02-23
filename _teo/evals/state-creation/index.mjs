import { St } from '../../../lib/isa-state.mjs'

async function Evaluator(input) {
	const args = input.args
	// Reconstruct inner states if provided
	const parsed = args.map(a => {
		if (a !== null && typeof a === 'object' && a._st) return buildSt(a)
		if (Array.isArray(a)) return a.map(i => buildSt(i))
		return a
	})
	const result = St(...parsed)
	return stateToPlain(result)
}

function buildSt(obj) {
	const inner = obj.inner ? obj.inner.map(i => buildSt(i)) : undefined
	if (obj.q !== undefined && inner) return St(obj.id, obj.q, inner)
	if (obj.q !== undefined) return St(obj.id, obj.q)
	if (inner) return St(obj.id, inner)
	return St(obj.id)
}

function stateToPlain(s) {
	return {
		id: s.id,
		q: s.q,
		open: s.open,
		inner: s.inner.map(i => stateToPlain(i))
	}
}

const ASSERT_KEY = 'isa-eq'
export { Evaluator, ASSERT_KEY }
