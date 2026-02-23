import { parse } from '../../../lib/isa-parse.mjs'

async function Evaluator(input) {
	const result = parse(input.text)
	return stateToPlain(result)
}

function stateToPlain(s) {
	return { id: s.id, q: s.q, open: s.open, inner: s.inner.map(i => stateToPlain(i)) }
}

const ASSERT_KEY = 'isa-eq'
export { Evaluator, ASSERT_KEY }
