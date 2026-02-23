import { evaluate } from '../../../lib/isa-eval.mjs'

async function Evaluator(input) {
	const result = evaluate(input.text)
	return result.map(s => stateToPlain(s))
}

function stateToPlain(s) {
	return { id: s.id, q: s.q, open: s.open, inner: s.inner.map(i => stateToPlain(i)) }
}

const ASSERT_KEY = 'isa-eq'
export { Evaluator, ASSERT_KEY }
