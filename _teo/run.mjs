import test from 'teo'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const rutines = [
	'state-creation',
	'normalize',
	'flatten',
	'union',
	'intersection',
	'difference',
	'sym-diff',
	'sum',
	'rest',
	'multiply',
	'division',
	'contains',
	'subset'
]

let totalPassed = 0
let totalFailed = 0

for (const rutine of rutines) {
	const result = await test(__dirname, rutine)
	console.log(`\n${result.title}: ${result.passed}/${result.totalCases} passed`)
	for (const c of result.cases) {
		const icon = c.status === 'PASS' ? '✓' : '✗'
		console.log(`  ${icon} ${c.caseKey}: ${c.status}`)
		if (c.status === 'FAIL') {
			console.log(`    expected:`, JSON.stringify(c.expectedOutput))
			console.log(`    actual:  `, JSON.stringify(c.actualOutput))
		}
		if (c.status === 'ERROR') {
			console.log(`    error:`, c.error)
			if (c.stack) console.log(`    stack:`, c.stack)
		}
	}
	totalPassed += result.passed
	totalFailed += result.failed
}

console.log(`\n=== TOTAL: ${totalPassed} passed, ${totalFailed} failed ===`)
