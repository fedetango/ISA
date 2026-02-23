// isa-operations — Set, arithmetic, and relational operations for ISA algebra

import { St, sameId, normalize, toOpen, eq } from './isa-state.mjs'

// ─── Helpers ───

/** Get effective quantifier: open → q, absolute → 1 */
function effectiveQ(s) {
	return s.open ? s.q : 1
}

/**
 * Pair states by identity across two sets.
 * Returns { paired: [[a,b],...], onlyA: [...], onlyB: [...] }
 */
function pairByIdentity(setA, setB) {
	const paired = []
	const onlyA = []
	const usedB = new Set()

	for (const a of setA) {
		let found = false
		for (let j = 0; j < setB.length; j++) {
			if (!usedB.has(j) && sameId(a, setB[j])) {
				paired.push([a, setB[j]])
				usedB.add(j)
				found = true
				break
			}
		}
		if (!found) onlyA.push(a)
	}

	const onlyB = setB.filter((_, j) => !usedB.has(j))
	return { paired, onlyA, onlyB }
}

/** Expand a state into a flat set for set operations */
function toSet(s) {
	if (s.id === null && s.inner.length > 0) {
		return [...s.inner]
	}
	return [s]
}

/** signMin — intersection qRule: closest to 0, mixed signs → 0 */
function signMin(a, b) {
	if ((a > 0 && b < 0) || (a < 0 && b > 0)) return 0
	return a >= 0 ? Math.min(a, b) : Math.max(a, b)
}

// ─── Unified Set Operation ───

const UNION     = { qRule: (a, b) => a + b,              keepA: true,  keepB: true  }
const INTERSECT = { qRule: (a, b) => signMin(a, b),      keepA: false, keepB: false }
const DIFF      = { qRule: (a, b) => Math.max(0, a - b), keepA: true,  keepB: false }
const SYM_DIFF  = { qRule: (a, b) => Math.abs(a - b),    keepA: true,  keepB: true  }

/**
 * setOp(a, b, cfg) — Unified set operation
 *
 * Same identity → collapse via qRule + recurse inner
 * Different identity → delegate to setOpSets
 */
function setOp(a, b, cfg) {
	const setA = toSet(a), setB = toSet(b)

	if (a.id !== null && b.id !== null && sameId(a, b)) {
		const qa = effectiveQ(a), qb = effectiveQ(b)
		const resultQ = cfg.qRule(qa, qb)
		const resultInner = setOpSets(a.inner, b.inner, cfg)

		if (resultQ === 0 && resultInner.length === 0) return []

		// Both absolute → preserve entity, Q irrelevant
		if (!a.open && !b.open) {
			return [St(a.id, resultInner.length ? resultInner : undefined)]
		}

		// Open → use computed Q
		return [St(a.id, resultQ, resultInner.length ? resultInner : undefined)]
	}

	// Different identities → pair + recurse
	return setOpSets(setA, setB, cfg)
}

/**
 * setOpSets(setA, setB, cfg) — Apply set operation to two state arrays
 */
function setOpSets(setA, setB, cfg) {
	const { paired, onlyA, onlyB } = pairByIdentity(setA, setB)
	const result = []
	for (const [a, b] of paired) result.push(...setOp(a, b, cfg))
	if (cfg.keepA) result.push(...onlyA)
	if (cfg.keepB) result.push(...onlyB)
	return normalize(result)
}

// ─── Public Set Operations ───

const union        = (a, b) => setOp(a, b, UNION)
const intersection = (a, b) => setOp(a, b, INTERSECT)
const difference   = (a, b) => setOp(a, b, DIFF)
const symDiff      = (a, b) => setOp(a, b, SYM_DIFF)

// ─── Arithmetic Operations ───

/**
 * sum(a, b) — +
 * Forces open, adds quantifiers. Same id only for direct sum.
 * Different id → stays as expression (returns both terms)
 */
function sum(a, b) {
	const oa = toOpen(a)
	const ob = toOpen(b)

	if (sameId(oa, ob)) {
		const totalQ = oa.q + ob.q
		const mergedInner = setOpSets(oa.inner, ob.inner, UNION)
		if (totalQ === 0) return []
		return [St(oa.id, totalQ, mergedInner.length ? mergedInner : undefined)]
	}

	return normalize([oa, ob])
}

/**
 * rest(a, b) — -
 * Forces open, subtracts quantifiers. Can produce debt (negative Q).
 */
function rest(a, b) {
	const oa = toOpen(a)
	const ob = toOpen(b)

	if (sameId(oa, ob)) {
		const diffQ = oa.q - ob.q
		if (diffQ === 0) return []
		const mergedInner = setOpSets(oa.inner, ob.inner, DIFF)
		return [St(oa.id, diffQ, mergedInner.length ? mergedInner : undefined)]
	}

	const negB = St(ob.id, -ob.q, ob.inner.length ? [...ob.inner] : undefined)
	return normalize([oa, negB])
}

/**
 * multiply(a, b) — *
 * Generative: Q1(A) * Q2(B) = Q1(A){ (Q1*Q2)(B) }
 */
function multiply(a, b) {
	const oa = toOpen(a)
	const ob = toOpen(b)

	const productQ = oa.q * ob.q
	const productInner = St(ob.id, productQ, ob.inner.length ? [...ob.inner] : undefined)
	const allInner = [...oa.inner, productInner]
	return [St(oa.id, oa.q, allInner)]
}

/**
 * division(a, b) — /
 * Same id: direct quotient Q1/Q2
 * Different id: composite distribution Q2({ (Q1/Q2)(X), 1(Y) })
 */
function division(a, b) {
	const oa = toOpen(a)
	const ob = toOpen(b)

	if (sameId(oa, ob)) {
		if (ob.q === 0) throw new Error('Division by zero quantifier')
		const quotient = oa.q / ob.q
		return [St(oa.id, quotient, oa.inner.length ? [...oa.inner] : undefined)]
	}

	if (ob.q === 0) throw new Error('Division by zero quantifier')
	const perGroup = oa.q / ob.q
	const innerX = St(oa.id, perGroup, oa.inner.length ? [...oa.inner] : undefined)
	const innerY = St(ob.id, 1, ob.inner.length ? [...ob.inner] : undefined)
	return [St(null, ob.q, [innerX, innerY])]
}

// ─── Relational Operations ───

/**
 * contains(a, target) — ∋
 * Checks if state a has target as direct child.
 */
function contains(a, target) {
	const searchIn = a.inner

	if (target.q < 0) {
		return searchIn.some(s => sameId(s, target) && s.q < 0)
	}

	return searchIn.some(s => sameId(s, target) && effectiveQ(s) > 0)
}

/**
 * subset(a, b) — ⊆
 * All states in a must be contained in b.
 */
function subset(a, b) {
	const setA = toSet(a)
	const setB = toSet(b)

	for (const sa of setA) {
		let found = false
		for (const sb of setB) {
			if (sameId(sa, sb)) {
				const qa = effectiveQ(sa)
				const qb = effectiveQ(sb)
				if (qa <= qb) {
					if (sa.inner.length > 0 && sb.inner.length > 0) {
						if (subset(
							St(null, 1, sa.inner),
							St(null, 1, sb.inner)
						)) {
							found = true
						}
					} else if (sa.inner.length === 0) {
						found = true
					}
				}
				break
			}
		}
		if (!found) return false
	}
	return true
}

export {
	union, intersection, difference, symDiff,
	sum, rest, multiply, division,
	contains, subset
}
