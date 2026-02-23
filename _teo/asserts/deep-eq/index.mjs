export default async function(actual, expected) {
	const valid = deepEqual(actual, expected)
	return {
		valid,
		code: valid ? 200 : 422,
		errors: valid ? [] : [`Mismatch:\n  actual:   ${JSON.stringify(actual)}\n  expected: ${JSON.stringify(expected)}`],
		message: valid ? 'match' : 'mismatch'
	}
}

function deepEqual(a, b) {
	if (a === b) return true
	if (typeof a !== typeof b) return false
	if (typeof a !== 'object' || a === null || b === null) return false
	if (Array.isArray(a) !== Array.isArray(b)) return false
	const ka = Object.keys(a), kb = Object.keys(b)
	if (ka.length !== kb.length) return false
	return ka.every(k => deepEqual(a[k], b[k]))
}
