import { St } from '../../../lib/isa-state.mjs'
import { contains } from '../../../lib/isa-operations.mjs'

async function Evaluator(input) {
	const a = buildSt(input.a)
	const target = buildSt(input.target)
	return contains(a, target)
}

function buildSt(obj) {
	const inner = obj.inner ? obj.inner.map(i => buildSt(i)) : undefined
	if (obj.q !== undefined && inner) return St(obj.id, obj.q, inner)
	if (obj.q !== undefined) return St(obj.id, obj.q)
	if (inner) return St(obj.id, inner)
	return St(obj.id)
}

const ASSERT_KEY = ''
export { Evaluator, ASSERT_KEY }
