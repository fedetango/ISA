import { St } from '../../../lib/isa-state.mjs'
import { stringify } from '../../../lib/isa-parse.mjs'

async function Evaluator(input) {
	const state = buildSt(input.state)
	return stringify(state)
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
