# ISA — Proof Sketches

This document formalizes the logical structure of ISA by classifying every rule into one of three categories:

- **Axiom** — assumed without proof. The irreducible foundation.
- **Definition** — a chosen convention. Not derivable, not provable, but deliberate.
- **Theorem** — derivable from axioms and definitions. Each includes a proof sketch.

---

## 1. Axioms

The minimal set assumed without demonstration.

### A1 — Everything is a State

```
St
```

There is one primitive: State. Everything expressible in ISA is a State.

### A2 — A State is a set of States

```
St = { St1 }
St = { St1, St2 }
```

A State can contain other States. There is no atom — any State can be decomposed or composed.

### A3 — Identity

```
Id{ St }    where Id = St
```

A State placed before curly braces is the Identity of the group. Identity is a grammatical role, not a separate type. The Identity is itself a member of the set it labels.

---

## 2. Definitions

Operational conventions that are chosen, not derived. They could have been defined differently without contradiction — but once adopted, the rest of the system depends on them.

### D1 — Identidad Gramatical

```
St1{ St2, St3 } = { St1, St2, St3 }
```

The Identity is a member of its own set. The curly-brace notation is syntactic sugar — it highlights which State is the reference, but does not create hierarchy.

**Status:** Not derivable from A1–A3. A3 says the Identity *is* a State, but does not dictate that it is a *member* of the group it labels. D1 is the definitional choice that makes it so.

### D2 — Quantifier

```
Q(St)
```

A Quantifier is a numerical annotation expressing how many instances of a State exist. Every State has an implicit Quantifier of 1:

```
St = 1(St)    // semantic equivalence: same count (1 instance)
```

This equivalence is semantic, not operational. `A` (bare) and `1(A)` (quantified) represent the same quantity but behave differently — see D8 (Absolute/Open).

Quantifiers are not States. They are a meta-notation operating on States.

**Status:** Definitional. A1–A3 do not mention quantity. D2 introduces counting as an external tool applied to States.

### D3 — Quantifier Scope

A Quantifier affects exactly what is inside its parentheses — nothing more:

```
2(A){B} = {2(A), B}         // Quantifier on A only; B unaffected
2({A, B}) = 2 instances of the composite {A, B}    // Quantifier on the composite
```

**Status:** Definitional. Specifies the binding rules of Quantifier notation.

### D4 — Quantifier Zero

```
0(St) = {}
```

Zero instances of a State is equivalent to the empty set. The State is absent.

**Status:** Definitional. Establishes the boundary between presence and absence.

### D5 — Negative Quantifier

```
-Q(St)    where Q > 0
```

A negative Quantifier expresses debt — a deficit record. Debt is distinct from absence:

| Quantifier | Meaning | Record |
|---|---|---|
| `3(St)` | present | yes |
| `0(St) = {}` | absent | no |
| `-3(St)` | debt | yes |

**Status:** Definitional. Extends the Quantifier domain from natural numbers to integers. Requires D4 as the boundary between positive and negative.

### D6 — Operators

Binary operations between States:

- Arithmetic: `+` `-` `*` `/`
- Set: `∪` `∩` `△` `--`
- Relational: `∋` `⊆`

**Status:** Definitional. The operators and their semantics are chosen conventions.

### D7 — Precedence

| Level | Operators | Family |
|---|---|---|
| 0 (highest) | `Q()` | Quantifier binding |
| 1 | `*` `/` | Arithmetic — multiplicative |
| 2 | `+` `-` | Arithmetic — additive |
| 3 | `∩` | Set — intersection |
| 4 | `∪` `--` `△` | Set — union / difference |
| Statement | `∋` `⊆` | Relational |

Level 0: The Quantifier binds to its State before any operator evaluates. Arithmetic operators (levels 1–2) force Quantifier binding on bare operands (`A → 1(A)`) as part of their evaluation.

**Status:** Definitional. Evaluation order is a convention.

### D8 — Absolute and Open States

A State has two modes determined by its form:

- **Absolute** (`A`): bare, no explicit Quantifier. The entity itself. Referencing it twice is referencing the same thing. `{A, A} = {A}`.
- **Open** (`Q(A)`): explicitly quantified. An instance count. Each instance shares the Identity but may differ internally. `{1(A), 1(A)} = 2(A)`.

The Quantifier is the gate between modes. Writing `Q(A)` declares: "I am counting instances." Writing `A` declares: "this is the entity."

Arithmetic operators force the Absolute → Open transformation: `A + A` first becomes `1(A) + 1(A)`, then evaluates.

When an Absolute and Open reference to the same State coexist, the Quantifier has already resolved (level 0 precedence). The Open form forces the Absolute reference to be counted — Quantifier Contagion (see T7b).

**Status:** Definitional. Establishes the operational distinction between bare and quantified forms. Depends on D2 and D7.

---

## 3. Theorems

Derivable from axioms and definitions. Ordered by dependency — each theorem may depend on prior theorems.

---

### T1 — Indeterminismo Compositivo

**Statement:** States are not atomic units. An Identity is equivalent under any valid partition of its inner States.

```
StA ∪ StB = StX ∪ StY ∪ StZ  →  St1{ StA, StB } = St1{ StX, StY, StZ }
```

**Proof sketch:**

By A2, a State is a set of States. A set is defined by its members, not by how those members are grouped. If `StA ∪ StB` and `StX ∪ StY ∪ StZ` resolve to the same members, then by A2 and A3 the Identity `St1` contains the same States regardless of partition. The grouping is transparent. ∎

**Depends on:** A2, A3.

---

### T2 — Relaciones sin Dirección

**Statement:** Relations have no direction. If St1 is related to St2, then St2 is related to St1.

```
St1{ St2 } — St1 and St2 are related
St2{ St1 } — same fact, different perspective
```

**Proof sketch:**

By D1 (Identidad Gramatical): `St1{ St2 } = { St1, St2 }` and `St2{ St1 } = { St1, St2 }`. Both flatten to the same set. The Identity role is grammatical (D1), not ontological. Therefore the association is symmetric — only the discretion criterion determines which State is presented as Identity. ∎

**Depends on:** D1.

---

### T3 — Redundancia de Estados

**Statement:** A State can contain itself. With bare (Absolute) references, this is redundant. With a Quantifier (Open), it produces additional instances.

```
St1{ St1 }      = {St1, St1}      = {St1}    = St1      // absolute — same entity, redundant
St1{ 1(St1) }   = {St1, 1(St1)}   = 2(St1)              // open — Quantifier creates instance
```

**Proof sketch:**

**Case 1 — Absolute:** By D1: `St1{ St1 } = { St1, St1 }`. Both references are bare (D8, Absolute). An Absolute State is the entity itself — referencing it twice is referencing the same thing. The duplicate collapses: `{St1, St1} = {St1}`. The self-reference is a no-op. ✓

**Case 2 — Open:** By D1: `St1{ 1(St1) } = { St1, 1(St1) }`. The inner reference has an explicit Quantifier (D8, Open). By D7, the Quantifier resolves at level 0 — before the set evaluates. The Open instance forces the Absolute reference to be counted (Quantifier Contagion). Absolute contributes 1, Open contributes 1. Total: `2(St1)`. ✓

The difference is entirely determined by the Quantifier. Without it, self-containment is redundant. With it, self-containment produces instances. ∎

**Depends on:** A2, D1, D7, D8.

---

### T4 — Conmutatividad Relacional

**Statement:** The role of Identity and inner State can be swapped term by term.

```
StA{St1, St2} + StB{St1, St3} = St1{StA, St2} + St1{StB, St3}
```

Per term, the Identity and any inner State can exchange roles:

```
StA·St1 = St1·StA
```

**Proof sketch:**

By D1: `StA{ St1 } = { StA, St1 }` and `St1{ StA } = { St1, StA }`. Both are the same set (A2 — set membership is unordered). Therefore swapping the Identity role does not change the underlying relation.

The quantification is preserved: if `StA{ St1, St2 }` contributes `1(St1)`, then `St1{ StA }` still contributes `1(St1)`. The structural associations change (the perspective shifts), but the data content is identical. ∎

**Depends on:** A2, D1, T2.

---

### T5 — Factorización Distributiva

**Statement:** When multiple Identities share a common inner State, the common State can be extracted as root Identity.

```
StA{St1, St2} + StB{St1, St3} = St1{ StA{St2}, StB{St3} }
```

**Proof sketch:**

Starting from the left side. By D1, flatten each term:
```
{ StA, St1, St2 } + { StB, St1, St3 }
```

St1 appears in both terms. By T4 (Conmutatividad Relacional), we can swap the Identity role:
```
StA{St1, St2} = St1{StA, St2}    (swap in first term)
StB{St1, St3} = St1{StB, St3}    (swap in second term)
```

Now both terms share the Identity St1. By State Collapse (T7), they merge under St1:
```
St1{ StA, St2, StB, St3 }
```

The flat form loses the original associations. But the factorized form preserves them: in the original expression, St2 was associated with StA (both were inner States of the same term), and St3 was associated with StB. The factorization re-expresses these original associations as sub-Identities:
```
St1{ StA{St2}, StB{St3} }
```

This is valid because T4 only swapped the root Identity (St1 ↔ StA, St1 ↔ StB) — the internal associations within each term were not altered. The common factor (St1) becomes the root Identity, and each original term becomes a sub-Identity preserving its specific associations. ∎

**Depends on:** D1, T4, T7.

---

### T6 — Propiedad Asociativa

**Statement:** Union, Intersection, and Symmetric Difference are associative. Difference is not.

```
(St1 ∪ St2) ∪ St3 = St1 ∪ (St2 ∪ St3)
(St1 ∩ St2) ∩ St3 = St1 ∩ (St2 ∩ St3)
(St1 △ St2) △ St3 = St1 △ (St2 △ St3)
```

**Proof sketch:**

This is a direct consequence of T1 (Indeterminismo Compositivo). Since States are defined by their members (not by grouping), and ∪, ∩, △ resolve to a final set of members independent of intermediate grouping, associativity holds.

Counterexample for `--`:
```
({A, B, C} -- {B}) -- {C} = {A, C} -- {C} = {A}
{A, B, C} -- ({B} -- {C}) = {A, B, C} -- {B} = {A, C}
{A} ≠ {A, C}
```

`--` is not associative because the intermediate result affects what is available for the second subtraction. ∎

**Depends on:** T1, D6.

---

### T7 — State Collapse

**Statement:** When two terms with the same root Identity are subjected to a set operation, they collapse into a single Identity. The operation is then applied to their inner States.

```
St1{St2, St5} ∪ St1{St3} = St1{St2, St5, St3}
```

**Proof sketch:**

By D1, the Identity is a member of its set. When both terms share the same Identity:
```
Left:  { St1, St2, St5 }
Right: { St1, St3 }
```

Union (D6) merges membership. St1 appears in both sides as a bare (Absolute) reference (D8). An Absolute State is the entity itself — it is idempotent under set operations (`A ∪ A = A`). The Identity collapses to one, and the remaining inner States merge:
```
{ St1, St2, St5 } ∪ { St1, St3 } = { St1, St2, St5, St3 }
```

Recomposing with St1 as Identity: `St1{ St2, St5, St3 }`.

When Quantifiers are present (Open States), the same Identity is detected and collapsed, but the Quantifiers resolve arithmetically — each set operation has its own rule (T11 SUM for ∪, T12 MIN for ∩, etc.).

The same mechanism applies to ∩, △, and `--` — the shared Identity collapses, and the operation is applied to the inner States. ∎

**Depends on:** A2, D1, D6, D8.

---

### T7b — Quantifier Contagion

**Statement:** When an Absolute and Open reference to the same State coexist (in a set or as operands), the Open form forces the Absolute reference to be counted as 1 instance.

```
{A, 1(A)}    = 2(A)       // absolute (1) + open (1) = 2
{A, 2(A)}    = 3(A)       // absolute (1) + open (2) = 3
A ∪ 1(A)     = 2(A)       // contagion under operation → SUM
```

**Proof sketch:**

By D7, the Quantifier resolves at level 0 — before any operator or set evaluation. When both forms coexist:

1. The Open reference `Q(A)` is already resolved: A is quantified with Q instances.
2. The Absolute reference `A` is bare. By D2, `A = 1(A)` semantically — it represents 1 instance.
3. The Open form has declared a counting context. Within that context, the Absolute reference cannot remain outside the count — it would create an ambiguity (is A present as entity or as instance?).
4. The resolution is forced by precedence: the Quantifier (level 0) has already established the counting context before the set or operation evaluates. The Absolute reference is read as 1 instance.

This is not a separate rule — it is a consequence of D7 (precedence) and D8 (the Absolute/Open distinction). The Quantifier resolves first, and its presence forces the entire context into the quantification perspective. ∎

**Depends on:** D2, D7, D8.

---

### T7c — Automatic Resolution in Sets

**Statement:** When a flat set contains multiple Open references to the same Identity, the Quantifiers sum automatically.

```
{2(A), 6(A)} = 8(A)       // both open, same Identity → SUM: 2+6
{A, A}       = {A}         // both absolute → dedup
{A, 2(A)}   = 3(A)        // mixed → contagion (T7b), then SUM: 1+2
```

**Proof sketch:**

By D7, Quantifiers resolve at level 0. After resolution:
- Absolute duplicates: same entity, collapse to one (D8).
- Open duplicates: same Identity, both quantified. The set contains two instance counts for the same State. By the same mechanism as Union (T11) — merging instances of the same State is counting them together — the Quantifiers sum.
- Mixed: contagion (T7b) first converts the Absolute reference to 1 instance, then Quantifiers sum.

This is automatic: once the set is evaluated (after all higher-precedence levels resolve), same-Identity Open references cannot coexist without resolution. The set notation `{...}` implicitly performs the same membership merge as Union on its contents. ∎

**Depends on:** D7, D8, T7b, T11.

---

### T8 — Conservación de Estados (non-destructive operations)

**Statement:** SUM, Union, and Multiply never reduce the total number of State instances. Only REST (`-`) and Difference (`--`) can remove States.

**Proof sketch:**

**SUM:** `Q1(St) + Q2(St) = (Q1+Q2)(St)`. By D2 and D6, the Quantifiers add. Since Q1 ≥ 1 and Q2 ≥ 1, the result is strictly greater. No instance is removed. ✓

**Union:** By T7 (State Collapse), shared Identities collapse and inner States merge. Merging only adds members from both sides — no member present on either side is absent from the result. ✓

**Multiply:** `Q1(A) * Q2(B) = Q1(A){ (Q1·Q2)(B) }`. The first operand persists as Identity. The product generates new inner content. The original A instances remain; B instances are amplified. Nothing is destroyed. ✓

**REST and Difference are destructive by definition:** REST decreases Quantifiers (can produce debt). Difference removes matching members. These are the only operations that reduce State presence. ✓ ∎

**Depends on:** D2, D5, D6, T7.

---

### T9 — REST Coherence

**Statement:** REST is coherent — subtracting and re-adding produces the original.

```
A - B + B = A
```

**Proof sketch:**

Let `A = Q1(St)`, `B = Q2(St)`.
```
Q1(St) - Q2(St) + Q2(St)
= (Q1 - Q2)(St) + Q2(St)       // REST: Quantifiers subtract
= (Q1 - Q2 + Q2)(St)            // SUM: Quantifiers add
= Q1(St)                         // arithmetic identity
```

This holds for all cases:
- `Q1 > Q2`: intermediate result is positive. Re-adding restores.
- `Q1 = Q2`: intermediate result is `0(St) = {}` (D4). Adding Q2 restores.
- `Q1 < Q2`: intermediate result is negative (D5, debt). Adding Q2 cancels the debt exactly.

The coherence of REST depends on D5 (negative Quantifiers). Without debt, the case `Q1 < Q2` would break the identity. ∎

**Depends on:** D2, D4, D5, D6.

---

### T10 — Difference does not produce debt

**Statement:** `--` (Difference) floors at `{}`. It never produces negative Quantifiers.

```
3(X) -- 5(X) = {}
3(X) -  5(X) = -2(X)
```

**Proof sketch:**

`--` is a set operation (D6). It operates on membership, which is binary: a State is present or absent. There is no concept of "negative membership."

By D4, `0(St) = {}` — zero instances means absence. Once all instances are removed, there is nothing left to subtract. The operation terminates at `{}`.

In contrast, `-` (REST) is arithmetic (D6). It operates on Quantifiers, which are integers (D5). Integers extend below zero, so REST can produce debt.

The two operators occupy disjoint domains: `--` on membership (bounded at `{}`), `-` on quantity (unbounded). No conflict. ∎

**Depends on:** D4, D5, D6.

---

### T11 — Union Quantifier Rule (SUM)

**Statement:** When State Collapse occurs in Union, Quantifiers sum.

```
2(X) ∪ 3(X) = 5(X)
-2(X) ∪ 3(X) = 1(X)
```

**Proof sketch:**

Union merges membership (T7). When the same Identity collapses, the instances from both sides must be accounted for. The Quantifier is the tool that counts instances (D2). Merging instances of the same State is counting them together — which is SUM.

For negative Quantifiers: by D7 (Precedence), the `-` in `-2(X)` resolves at level 2 (arithmetic) before `∪` at level 4. So `∪` receives the already-signed value and sums: `(-2) + 3 = 1`. ∎

**Depends on:** D2, D5, D7, T7.

---

### T12 — Intersection Quantifier Rule (MIN, shared)

**Statement:** When State Collapse occurs in Intersection, Quantifiers resolve to what is shared. Mixed signs produce `{}`.

```
5(X) ∩ 4(X) = 4(X)
-3(X) ∩ -5(X) = -3(X)
3(X) ∩ -2(X) = {}
```

**Proof sketch:**

**Positive, same Identity:** Intersection extracts what is shared (D6). `5(X)` represents 5 Open instances (D8). `4(X)` represents 4. What they share is at most 4 — the minimum. Result: `4(X)`. ✓

**Mixed sign:** Positive X (presence) and negative X (debt) are semantically distinct entities (D5). Presence and debt cannot be "shared" — they are different dimensions. Intersection finds nothing in common. Result: `{}`. ✓

**Same-sign negatives:** Both are debt records of the same State. Intersection extracts what is shared — the overlapping debt. `-3(X)` has 3 units of debt, `-5(X)` has 5. Both share at least 3 units of debt. The shared magnitude is `min(|-3|, |-5|) = 3`, expressed as `-3(X)`. Arithmetically: `max(-3, -5) = -3`. Result: `-3(X)`. ✓

This is semantically consistent: for positives, "what they share" is the lesser count (minimum). For negatives, "what they share" is the lesser magnitude of debt (closest to zero). In both cases, Intersection answers: "how much do both have in common?" ∎

**Depends on:** D2, D4, D5, D6, D8, T7.

---

### T13 — Division Composite Distribution preserves quantities

**Statement:** The Composite Distribution formula preserves total quantities of both operands.

```
Q1(X) / Q2(Y) = Q2({ (Q1/Q2)(X), 1(Y) })
```

**Proof sketch:**

Verify total X in result:
```
Q2 groups × (Q1/Q2) instances of X per group = Q2 · (Q1/Q2) = Q1 ✓
```

Verify total Y in result:
```
Q2 groups × 1 instance of Y per group = Q2 ✓
```

Both operand totals are conserved in the result. This satisfies T8 (Conservación de Estados): no State disappears — the dividend is distributed and the divisor is represented inside each group. ∎

**Depends on:** D2, D3, T8.

---

### T14 — Multiply Collapse consistency

**Statement:** Collapsing the result of Multiply via Identidad Gramatical produces a consistent total.

```
2(A) * 3(A) = 2(A){ 6(A) }
Collapse: 2(A){ 6(A) } → {2(A), 6(A)} → 8(A)
```

**Proof sketch:**

The collapse has two steps — the first is deliberate, the second is automatic:

**Step 1 — Flatten (deliberate):** By D1 (Identidad Gramatical): `2(A){ 6(A) } = { 2(A), 6(A) }`. This is the operator's choice — D1 is applied deliberately, and the structural trace of the multiplication is lost.

**Step 2 — Resolution (automatic):** The flat set `{ 2(A), 6(A) }` contains two Open references (D8) to the same Identity A. Both Quantifiers have already resolved (level 0, D7). Same Identity, both Open → Quantifiers SUM: `2 + 6 = 8(A)`. This resolution is automatic — it is a consequence of precedence, not a separate decision.

Verification against direct arithmetic: `2 × 3 = 6` (product), plus the 2 original instances = 8 total. The original operand is preserved (T8) and the product is generated. ✓ ∎

**Depends on:** D1, D2, D7, D8, T8.

---

### T15 — Commutativity of Operations

**Statement:** Union, Intersection, Symmetric Difference, SUM, and Multiply are commutative. Difference, REST, and Division are not.

**Commutative:**

```
A ∪ B = B ∪ A
A ∩ B = B ∩ A
A △ B = B △ A
A + B = B + A
```

**Not commutative:**

```
A -- B ≠ B -- A       // {A, B} -- {B} = {A}, but {B} -- {A, B} = {}
A - B ≠ B - A         // 5(X) - 3(X) = 2(X), but 3(X) - 5(X) = -2(X)
A / B ≠ B / A         // 6(X) / 2(X) = 3(X), but 2(X) / 6(X) = (2/6)(X)
```

**Multiply — relationally commutative:**

```
2(A) * 3(B) = 2(A){ 6(B) }    // perspective from A
3(B) * 2(A) = 3(B){ 6(A) }    // perspective from B
```

The product is the same data — only the grammatical perspective differs. By T4 (Conmutatividad Relacional), the Identity role can be swapped. Multiply is not syntactically commutative but is relationally commutative. ∎

**Proof sketch:**

For ∪, ∩, △: by D1, both operands flatten to sets. Set membership is unordered (A2). The operation's result depends only on which members are present, not on the order of operands. ✓

For +: `Q1(St) + Q2(St) = (Q1+Q2)(St) = (Q2+Q1)(St) = Q2(St) + Q1(St)`. Addition of integers is commutative. ✓

For --, -, /: counterexamples above. The operations are asymmetric — the first operand is the base and the second is the modifier. ✓

**Depends on:** A2, D1, D6, T4.

---

### T16 — Difference Quantifier Rule (subtract, floored)

**Statement:** When State Collapse occurs in Difference, Quantifiers subtract. The result floors at `{}`.

```
5(X) -- 3(X) = 2(X)
3(X) -- 5(X) = {}
```

**Proof sketch:**

Difference removes the right side's members from the left (D6). When the same Identity collapses (T7), the question is: how many instances remain?

`5(X) -- 3(X)`: 5 instances, remove 3. `5 - 3 = 2` remain. Result: `2(X)`. ✓

`3(X) -- 5(X)`: 3 instances, attempt to remove 5. Only 3 exist. By T10, `--` cannot produce debt — it floors at `{}`. Result: `{}`. ✓

The rule is: subtract Quantifiers, but the result cannot go below `0(X) = {}` (D4). ∎

**Depends on:** D2, D4, D6, T7, T10.

---

### T17 — Symmetric Difference Quantifier Rule (absolute difference)

**Statement:** When State Collapse occurs in Symmetric Difference, Quantifiers resolve to the absolute difference.

```
5(X) △ 4(X) = 1(X)
4(X) △ 5(X) = 1(X)
```

**Proof sketch:**

Symmetric Difference keeps what is unique to each side (D6). When the same Identity collapses (T7):

`5(X) △ 4(X)`: both sides share 4 instances (the overlap). The unique portion is `|5 - 4| = 1`. Result: `1(X)`. ✓

This is commutative (T15): `|5 - 4| = |4 - 5| = 1`. ✓

The absolute difference cannot be negative, so the result is always `≥ 0`. When `Q1 = Q2`, the result is `0(X) = {}` (D4) — both sides are identical, nothing is unique. ∎

**Depends on:** D2, D4, D6, T7, T15.

---

### T18 — Operación a Mismo Nivel

**Statement:** Two States operate at the same level when both are direct members of the same set. When an operand is nested inside the other, level reduction via existing properties resolves the nesting before the operation is applied.

```
St1{ StA{ St2, St3 } }  +  1(St2)
→ { St1, StA, St2, St3 } + 1(St2)     // flatten via D1
→ { St1, StA, 2(St2), St3 }            // operate at same level
→ St1{ StA{ 2(St2), St3 } }            // optional recomposition
```

**Proof sketch:**

The procedure is: (1) flatten via D1 (Identidad Gramatical) until both operands are at the same level, (2) operate, (3) optionally recompose.

Step 1 is justified by D1 — flattening is always available as a deliberate operation.

Step 2 applies the operator between States now at the same level. In the example, `St2` (from the flattened left) and `1(St2)` (from the right) share the same Identity. By T7b (Contagion), the bare `St2` is counted as 1 instance. SUM: `1 + 1 = 2(St2)`. ✓

Step 3 is optional — recomposition restores the original structure using T4 (Conmutatividad Relacional) and T5 (Factorización Distributiva). The operator chooses whether to preserve or discard structure.

Level reduction always resolves through existing properties — no new mechanism is needed. ∎

**Depends on:** D1, T4, T5, T7b.

---

## Dependency Graph

```
A1, A2, A3 (Axioms)
    │
    D1 (Identidad Gramatical)
    D2 (Quantifier — semantic: A = 1(A))
    D3 (Quantifier Scope)
    D4 (Quantifier Zero)
    D5 (Negative Quantifier)
    D6 (Operators)
    D7 (Precedence — Level 0: Quantifier binding)
    D8 (Absolute/Open States)
    │
    ├── T1   Indeterminismo Compositivo       ← A2, A3
    ├── T2   Relaciones sin Dirección         ← D1
    ├── T3   Redundancia de Estados           ← A2, D1, D7, D8
    ├── T4   Conmutatividad Relacional        ← A2, D1, T2
    ├── T5   Factorización Distributiva       ← D1, T4, T7
    ├── T6   Propiedad Asociativa             ← T1, D6
    ├── T7   State Collapse                   ← A2, D1, D6, D8
    ├── T7b  Quantifier Contagion             ← D2, D7, D8
    ├── T7c  Auto-resolution in Sets          ← D7, D8, T7b, T11
    ├── T8   Conservación de Estados          ← D2, D5, D6, T7
    ├── T9   REST Coherence                   ← D2, D4, D5, D6
    ├── T10  Difference ≠ debt                ← D4, D5, D6
    ├── T11  Union Quantifier SUM             ← D2, D5, D7, T7
    ├── T12  Intersection Quantifier MIN      ← D2, D4, D5, D6, D8, T7
    ├── T13  Division Composite Distribution  ← D2, D3, T8
    ├── T14  Multiply Collapse consistency    ← D1, D2, D7, D8, T8
    ├── T15  Commutativity of Operations      ← A2, D1, D6, T4
    ├── T16  Difference Quantifier Rule       ← D2, D4, D6, T7, T10
    ├── T17  Sym. Diff. Quantifier Rule       ← D2, D4, D6, T7, T15
    └── T18  Operación a Mismo Nivel          ← D1, T4, T5, T7b
```

---

## Resolved Questions

1. **T12 — Negative Intersection:** Resolved as **shared debt**. `-3(X) ∩ -5(X) = -3(X)`. The shared magnitude is `min(|-3|, |-5|) = 3`, i.e. `max(-3, -5) = -3`. Both sides share at least 3 units of debt. This is consistent with positive Intersection (minimum count) — in both cases, the answer is "how much do both have in common."

2. **Circularidad Permitida:** Resolved — **no special rule needed**. Circular structures dissolve through existing properties before operating. `St1{ St2{ St1 } }` flattens via D1 (Identidad Gramatical) to `{ St1, St2, St1 }`, then deduplicates via D8 (Absolute) to `{ St1, St2 }`. If Quantifiers are present, they resolve via T7b (Contagion). Simplification before operation eliminates all circularity.

3. **Conservación in compositions:** Resolved — **T8 extends by induction**. Compositions of non-destructive operations (SUM, Union, Multiply) conserve all States: each step conserves, the next operates on a result that already contains everything. Compositions that include destructive operations (REST, Difference) break conservation exactly at the destructive step — by design. No additional theorem is needed; T8's per-operation guarantee composes naturally.
