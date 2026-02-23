import { eq } from '../../../lib/isa-state.mjs'

export default async function(actual, expected) {
	// Both should be arrays of states
	if (!Array.isArray(actual) || !Array.isArray(expected)) {
		// Single state comparison
		if (!Array.isArray(actual) && !Array.isArray(expected)) {
			const valid = deepEqual(actual, expected)
			return { valid, code: valid ? 200 : 422, errors: valid ? [] : [`Mismatch: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`], message: valid ? 'match' : 'mismatch' }
		}
		return { valid: false, code: 422, errors: ['Type mismatch: one is array, other is not'], message: 'type mismatch' }
	}

	if (actual.length !== expected.length) {
		return { valid: false, code: 422, errors: [`Length mismatch: ${actual.length} vs ${expected.length}`], message: 'length mismatch' }
	}

	// Order-independent comparison using eq
	const used = new Set()
	for (const a of actual) {
		let found = false
		for (let j = 0; j < expected.length; j++) {
			if (!used.has(j) && eq(a, expected[j])) {
				used.add(j)
				found = true
				break
			}
		}
		if (!found) {
			return { valid: false, code: 422, errors: [`No match for: ${JSON.stringify(a)}`], message: 'element mismatch' }
		}
	}
	return { valid: true, code: 200, errors: [], message: 'all states match' }
}

function deepEqual(a, b) {
	if (a === b) return true
	if (typeof a !== typeof b) return false
	if (typeof a !== 'object' || a === null || b === null) return false
	const ka = Object.keys(a), kb = Object.keys(b)
	if (ka.length !== kb.length) return false
	return ka.every(k => deepEqual(a[k], b[k]))
}
