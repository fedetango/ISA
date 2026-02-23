import { St } from '../../../lib/isa-state.mjs'
import { division } from '../../../lib/isa-operations.mjs'

async function Evaluator(input) {
	const a = buildSt(input.a)
	const b = buildSt(input.b)
	try {
		const result = division(a, b)
		return result.map(s => stateToPlain(s))
	} catch (e) {
		return { error: e.message }
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
