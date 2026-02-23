// isa-state — Core state representation for ISA algebra

/**
 * St(id, q?, inner?) — State factory
 *
 * Signatures:
 *   St("A")              → Absolute: { id:"A", q:1, open:false, inner:[] }
 *   St("A", 2)           → Open:     { id:"A", q:2, open:true,  inner:[] }
 *   St("A", 1)           → Open:     { id:"A", q:1, open:true,  inner:[] }
 *   St("A", [St("B")])   → Absolute with inner: { id:"A", q:1, open:false, inner:[B] }
 *   St("A", 2, [St("B")])→ Open with inner:     { id:"A", q:2, open:true,  inner:[B] }
 *   St(null, 2, [...])   → Composite: { id:null, q:2, open:true, inner:[...] }
 */
function St(id, q, inner) {
	// St(id, inner[]) — shorthand: q is array → treat as inner
	if (Array.isArray(q)) {
		inner = q
		q = undefined
	}

	const open = q !== undefined
	const qVal = open ? q : 1

	return Object.freeze({
		id:    id ?? null,
		q:     qVal,
		open,
		inner: Object.freeze(inner ? [...inner] : [])
	})
}

/**
 * matchSets(a, b, cmp) — O(n^2) bipartite matching
 * Returns true iff every element in a has a unique match in b via cmp.
 */
function matchSets(a, b, cmp) {
	if (a.length !== b.length) return false
	const used = new Set()
	for (const ai of a) {
		let found = false
		for (let j = 0; j < b.length; j++) {
			if (!used.has(j) && cmp(ai, b[j])) { used.add(j); found = true; break }
		}
		if (!found) return false
	}
	return true
}

/**
 * sameId(a, b) — Identity comparison
 * String ids: strict equality
 * Composites (null id): deep inner comparison (order-independent)
 */
function sameId(a, b) {
	if (a.id !== null && b.id !== null) return a.id === b.id
	if (a.id !== null || b.id !== null) return false
	return matchSets(a.inner, b.inner, eq)
}

/**
 * eq(a, b) — Deep structural equality
 */
function eq(a, b) {
	if (a.id !== b.id) return false
	if (a.q !== b.q) return false
	if (a.open !== b.open) return false
	return matchSets(a.inner, b.inner, eq)
}

/**
 * toOpen(state) — Force Absolute → Open (D8 arithmetic transform)
 * A → 1(A), already open → unchanged
 */
function toOpen(state) {
	if (state.open) return state
	return St(state.id, state.q, state.inner.length ? [...state.inner] : undefined)
}

/**
 * flatten(state) — Identidad Gramatical (D1)
 * A{B, C} → [A, B, C]
 * Returns State[] — the identity itself (as absolute) + all inner states
 */
function flatten(state) {
	if (state.inner.length === 0) return [state]
	// Identity becomes a bare absolute state (no inner)
	const self = state.id !== null
		? St(state.id)
		: null
	const parts = self ? [self, ...state.inner] : [...state.inner]
	return parts
}

/**
 * normalize(states[]) — Resolve a flat set
 *
 * Algorithm:
 * 1. Group by identity (sameId)
 * 2. Per group:
 *    - Has any open (or mixed) → SUM effectiveQ (absolute=1 via contagion, open=q)
 *    - All absolute → keep one (dedup)
 * 3. Filter out q=0 (D4: 0(St) = {})
 * 4. Return normalized array
 */
function normalize(states) {
	if (states.length === 0) return []

	// Group by identity
	const groups = []
	const groupMap = [] // parallel: representative state per group

	for (const s of states) {
		let found = false
		for (let g = 0; g < groups.length; g++) {
			if (sameId(groupMap[g], s)) {
				groups[g].push(s)
				found = true
				break
			}
		}
		if (!found) {
			groups.push([s])
			groupMap.push(s)
		}
	}

	const result = []

	for (const group of groups) {
		const hasOpen = group.some(s => s.open)

		if (hasOpen) {
			// Open or mixed → SUM effectiveQ (absolute counts as 1 via contagion)
			let totalQ = 0
			let mergedInner = []
			for (const s of group) {
				totalQ += s.open ? s.q : 1
				mergedInner.push(...s.inner)
			}
			mergedInner = normalize(mergedInner)
			if (totalQ === 0) continue // D4: 0(St) = {}
			result.push(St(group[0].id, totalQ, mergedInner.length ? mergedInner : undefined))
		} else {
			// All absolute → dedup: keep first
			result.push(group[0])
		}
	}

	return result
}

export { St, sameId, eq, toOpen, flatten, normalize }
