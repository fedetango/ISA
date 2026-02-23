// isa-eval — Expression evaluator for ISA algebra
//
// Parses an expression string into an AST via parseExpr(),
// then walks the tree applying ISA operations.

import { parseExpr } from './isa-parse.mjs'
import { St } from './isa-state.mjs'
import { union, intersection, difference, symDiff, sum, rest, multiply, division } from './isa-operations.mjs'

const OPS = {
	'∪': union, '∩': intersection, '--': difference, '△': symDiff,
	'+': sum,   '-': rest,          '*': multiply,   '/': division
}

function evaluate(input) {
	const ast = typeof input === 'string' ? parseExpr(input) : input
	if (ast.type === 'state') return [ast.value]
	const left = evaluate(ast.left)
	const right = evaluate(ast.right)
	const a = left.length === 1 ? left[0] : St(null, left)
	const b = right.length === 1 ? right[0] : St(null, right)
	return OPS[ast.op](a, b)
}

export { evaluate }
