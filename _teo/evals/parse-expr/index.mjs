import { parseExpr } from '../../../lib/isa-parse.mjs'

async function Evaluator(input) {
	const result = parseExpr(input.text)
	return astToPlain(result)
}

function stateToPlain(s) {
	return { id: s.id, q: s.q, open: s.open, inner: s.inner.map(i => stateToPlain(i)) }
}

function astToPlain(node) {
	if (node.type === 'state') return { type: 'state', value: stateToPlain(node.value) }
	return { type: 'op', op: node.op, left: astToPlain(node.left), right: astToPlain(node.right) }
}

const ASSERT_KEY = 'deep-eq'
export { Evaluator, ASSERT_KEY }
