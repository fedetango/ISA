## ISA Operation Precedence

When multiple operators appear in an expression without parentheses, evaluation follows the precedence levels below. Higher levels resolve first.

---

### Precedence Table

| Level | Operators | Family |
|---|---|---|
| 0 (highest) | `Q()` | Quantifier binding |
| 1 | `*` `/` | Arithmetic — multiplicative |
| 2 | `+` `-` | Arithmetic — additive |
| 3 | `∩` | Set — intersection |
| 4 | `∪` `--` `△` | Set — union / difference |
| Statement | `∋` `⊆` | Relational |

**Level 0 — Quantifier binding:** The Quantifier `Q(St)` binds to its State before any operator evaluates. This determines whether a State is Absolute (bare) or Open (quantified). See State Instances for the full distinction.

Arithmetic operators (levels 1–2) force Quantifier binding on bare operands: `A + A` first transforms to `1(A) + 1(A)`, then evaluates. This means arithmetic always operates on Open States.

**Parentheses** always override precedence:

```
2(X) * 3(Y) + 4(Y)    →  (2(X) * 3(Y)) + 4(Y)    // * before +
A ∪ B ∩ C             →  A ∪ (B ∩ C)              // ∩ before ∪
2(X) * 3(Y) ∪ 4(Y)    →  (2(X) * 3(Y)) ∪ 4(Y)    // arithmetic before set
```

---

### Associativity

Operators at the same level evaluate **left to right**:

```
A -- B -- C      =  (A -- B) -- C
12(X) / 4(X) / 2(X)  =  (12(X) / 4(X)) / 2(X)  =  3(X)
A ∪ B ∪ C       =  (A ∪ B) ∪ C
```

This matters for non-associative operators (`--`, `-`, `/`). Use parentheses when the intended grouping differs from left-to-right.

---

### Relational Operators — Statement Level

`∋` and `⊆` are not composable with arithmetic or set operators. They are **statement-level**: they operate on fully resolved expressions and return a truth value, not a State.

```
St1{ St2, St3 } ∋ St2    // valid — query on resolved expression
(A ∋ B) ∪ C              // invalid — True/False cannot be unioned with a State
```

---

### `--` Does Not Produce Negative Quantifiers

`--` (Difference) is a set operation — it operates on membership, not quantity. Membership cannot be negative. When the right side exceeds what exists on the left, the result floors at `{}`:

```
3(X) -- 5(X) = {}
```

This distinguishes `--` from `-` (REST), which is arithmetic and can produce deficit:

```
3(X) - 5(X) = -2(X)    // deficit — only REST can produce debt
```

Debt records (`-X`) can only originate from REST, never from Difference.

---

### Set Operations with Quantifiers — State Collapse Rules

When State Collapse occurs, each set operation delegates Quantifier resolution differently:

#### Union (∪) — Quantifiers SUM

```
5(X) ∪ 4(X) = 9(X)
-2(X) ∪ 3(X) = 1(X)
```

#### Intersection (∩) — Quantifiers take MINIMUM (same sign only)

Intersection extracts what is shared. Before applying ∩, terms with quantifiers are read in their set form — the root Identity is what determines collapse:

```
3(X) → 3 instances of {X}    // X is the root identity
```

State Collapse in ∩ applies only when both sides share the **same root identity with the same sign**. The shared portion is then taken:

```
5(X) ∩ 4(X) = 4(X)      // same identity, same sign → minimum count
-3(X) ∩ -5(X) = -3(X)   // both negative X → shared debt: min(|-3|,|-5|) = 3 → -3
```

**Mixed sign — different entities:**

Positive `X` and negative `X` (debt) are distinct from the membership perspective. Intersection finds what is shared — presence and debt cannot be shared:

```
3(X) ∩ -2(X) = {}    // positive X ≠ debt X → no shared entity
```

**Different identities:**

```
3{X} ∩ 2(Y) = {}     // X ≠ Y → no State Collapse → {}
```

The notation `3{X}` makes the root identity explicit when evaluating set operations.

#### Symmetric Difference (△) — Quantifiers take ABSOLUTE DIFFERENCE

Symmetric difference keeps only what is unique to each side. Applies only to same-sign same-identity terms:

```
5(X) △ 4(X) = 1(X)
```

#### Difference (--) — Quantifiers subtract, floored at `{}`

```
5(X) -- 3(X) = 2(X)
3(X) -- 5(X) = {}        // floors at {}, no debt
```

---

### Procedural Examples

Step-by-step evaluation applying precedence rules.

---

#### Example 1 — Arithmetic before Set

```
2(X) * 3(Y) ∪ 4(Y)
```

```
// Step 1: Level 1 — resolve *
(2(X) * 3(Y)) ∪ 4(Y)
= 2(X){6(Y)} ∪ 4(Y)

// Step 2: Level 4 — resolve ∪
// Top-level: 2(X){6(Y)} has root identity X
//            4(Y)        has root identity Y
// X ≠ Y → no State Collapse
= { 2(X){6(Y)}, 4(Y) }
```

---

#### Example 2 — Union with mixed-sign quantifiers

```
3(X) ∪ -2(X)
```

```
// Step 1: Level 2 — the - is arithmetic, resolves the sign of 2(X)
// -2(X) = debt of X (negative quantifier)

// Step 2: Level 4 — resolve ∪
// Both sides have root identity X → State Collapse
// Quantifiers SUM: 3 + (-2) = 1
= 1(X)
```

Union combines memberships — debt and presence interact arithmetically via State Collapse.

---

#### Example 3 — Intersection with mixed-sign quantifiers

```
3(X) ∩ -2(X)
```

```
// Step 1: Level 2 — the - resolves the sign of 2(X)
// -2(X) = debt of X

// Step 2: Level 3 — resolve ∩
// Both have root identity X, but opposite signs
// Positive X and debt X are distinct entities from the membership perspective
// Intersection finds what is shared — presence and debt cannot be shared
= {}
```

Intersection cannot share presence and debt. Compare with Union (Example 2): Union combines, Intersection requires shared kind.

---

#### Example 4 — Intersection with different identities

```
3(X) ∩ 2(Y)    where X ≠ Y
```

```
// Step 1: express terms in set form — root identity becomes visible
3(X) → 3{X}    // X is the root identity
2(Y) → 2{Y}    // Y is the root identity

// Step 2: Level 3 — resolve ∩
// 3{X} ∩ 2{Y}: X ≠ Y → no State Collapse
= {}
```

---

#### Example 5 — Chained mixed operators

```
2(X) * 3(X) + 4(X) ∩ 6(X) ∪ 1(X)
```

```
// Step 1: Level 1 — resolve *
(2(X) * 3(X)) + 4(X) ∩ 6(X) ∪ 1(X)
= 2(X){6(X)} + 4(X) ∩ 6(X) ∪ 1(X)

// Step 2: Level 2 — resolve +
// 2(X){6(X)} + 4(X): different levels (Operación a Mismo Nivel)
// Flatten: {2(X), 6(X)} + 4(X) → {2(X), 6(X), 4(X)} = 12(X)  (via State Collapse)
12(X) ∩ 6(X) ∪ 1(X)

// Step 3: Level 3 — resolve ∩
// 12(X) ∩ 6(X): same identity, same sign → minimum = 6(X)
6(X) ∪ 1(X)

// Step 4: Level 4 — resolve ∪
// State Collapse → SUM: 6 + 1 = 7(X)
= 7(X)
```

---

#### Example 6 — Quantifier binding (level 0) and contagion

```
{A, B} ∪ {1(A), C}
```

```
// Step 0: Level 0 — Quantifier binding
// 1(A) binds: A is Open on the right side
// A on the left is bare (Absolute)

// Step 1: Level 4 — resolve ∪
// A appears as Absolute on left, Open (1(A)) on right
// Quantifier already resolved (level 0) → contagion: Absolute A is counted as 1
// SUM: 1 + 1 = 2(A)
= {2(A), B, C}
```

---

#### Example 7 — Arithmetic forces Quantifier on bare States

```
A + A ∪ B
```

```
// Step 0: Level 0 — no explicit Quantifiers to bind

// Step 1: Level 2 — resolve +
// + forces A → 1(A): both operands become Open
// 1(A) + 1(A) = 2(A)
2(A) ∪ B

// Step 2: Level 4 — resolve ∪
// 2(A) and B are different identities → no collapse
= {2(A), B}
```
