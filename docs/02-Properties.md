#### Indeterminismo Compositivo

States are not absolute units — they can be freely split or merged. An Identity is defined by its total content, not by how that content is partitioned internally.

```
StA ∪ StB = StX ∪ StY ∪ StZ;  St1{ StA, StB } = St1{ StX, StY, StZ }
```

No State is atomic. The same Identity is equivalent under any valid partition of its inner States.

#### Propiedad Asociativa

Operations in ISA are associative — intermediate groupings do not affect the result:

```
(St1 ∪ St2) ∪ St3 = St1 ∪ (St2 ∪ St3)
(St1 ∩ St2) ∩ St3 = St1 ∩ (St2 ∩ St3)
(St1 △ St2) △ St3 = St1 △ (St2 △ St3)
```

This is a direct consequence of Indeterminismo Compositivo: since States are not absolute, the grouping of intermediate operations is transparent to the final result. Note: Difference (`--`) is not associative.

#### Conservación de Estados

In ISA, no State disappears without an explicit destructive operation. States are entities, not abstractions — they persist unless actively removed by a destructive operation (REST `-`, Difference `--`).

SUM and Union satisfy this trivially: they only add. MULTIPLY manifests this property explicitly: its generative nature exists precisely to avoid implicit destruction of the original operands (see MULTIPLY in Extended Arithmetic).

#### Operación a Mismo Nivel

Two States operate at the same level when both are direct members of the same set. When an operand is nested inside the other, a level reduction is applied using existing properties before operating.

```
// Given:
St1{ StA{ St2, St3 } }  +  1(St2)

// Step 1 — Identidad Gramatical: flatten the container
St1{ StA{ St2, St3 } } = { St1, StA, St2, St3 }

// Step 2 — Operate at the same level
{ St1, StA, St2, St3 } + 1(St2) = { St1, StA, 2(St2), St3 }

// Step 3 (optional) — Recompose the original structure
St1{ StA{ 2(St2), St3 } }
```

The procedure is: (1) flatten until both operands are at the same level, (2) operate, (3) optionally recompose. Level reduction always resolves through existing properties (Identidad Gramatical, Conmutatividad Relacional, Factorización Distributiva) — no new mechanism is needed. Flattening deliberately loses structure — the operator chooses what level to preserve.

#### Factorización Distributiva

When multiple Identities share a common inner State, it can be extracted as the root Identity. The remaining states are preserved as sub-Identities.

```
StA{St1, St2} + StB{St1, St3} = St1{ StA{St2}, StB{St3} }
```

Analogous to the distributive property in conventional arithmetic:

```
a(x,d) + b(x,e) = x·(a(d), b(e))
// Conventional: ax + bx = x(a + b)
```

The common factor (St1) becomes the Identity. The specific associations are preserved: St2 remains with StA, St3 remains with StB.

#### Conmutatividad Relacional

The role of Identity and inner State can be swapped term by term. This is a change of discretion criterion — the same data reorganized from a different perspective.

```
StA{St1, St2} + StB{St1, St3} = St1{StA, St2} + St1{StB, St3}
```

Analogous to commutativity applied per term:

```
StA·St1 = St1·StA
```

The quantification is preserved: both sides yield `2(St1)`. The structural associations change (St2 moves from characteristic of StA to characteristic of St1). This is valid because States are completely independent and can participate in multiple sets simultaneously.

#### Quantifier Cero

A State with a Quantifier of zero is equivalent to the empty set. Zero instances means the State is not present.

```
0(St) = {}
```

This is consistent with Conservación de Estados: a State only reaches zero through an explicit destructive operation (REST, Difference). Once at zero, it is absent — not "existing with zero instances."

#### Quantifier Negativo

A negative Quantifier expresses a debt — States that were subtracted without existing on the operand side. Debts arise exclusively from destructive operations (REST, Difference) applied beyond what exists.

```
0(St) - 3(St) = -3(St)    // subtracting from absence creates debt
```

The three quantifier states are semantically distinct:

| Quantifier | Meaning | Record |
|---|---|---|
| `3(St)` | present — positive instances | yes |
| `0(St) = {}` | absent — no instances | no |
| `-3(St)` | debt — deficit registered | yes |

**Algebraic incomparability with zero:** `0(St) = {}` has no state — there is no algebraic object to compare against. The ordering relation (`-3(St) < 0`) does not apply algebraically. The relationship between negative and zero is operational, not ordinal:

```
-3(St) + 3(St) = 0(St) = {}    // debt resolves to absence
```

Debt and absence are distinct: absence carries no record, debt does. This distinction is queryable via Contains (`∋ -X`).

Negative Quantifiers follow standard arithmetic sign rules in all operations:

```
-2(X) + 3(X) = 1(X)
-2(X) * 3(Y) = -2(X){ -6(Y) }
-2(X) * -3(Y) = -2(X){ 6(Y) }
```

#### Redundancia de Estados

A State can contain itself. This is not prohibited but redundant — it expresses a self-association that adds no new information.

```
St1{ St1 } — valid but redundant. Like saying "Alejandro is associated with Alejandro."
```

The redundant reference does not create duplication or recursion. It is simply a no-op in terms of information.

#### Identidad Gramatical

Identities are grammatical tools, not a separate type. An Identity is a State that is syntactically highlighted as the reference of a group. The curly-brace notation is equivalent to flat membership:

```
St1{ St2, St3 } = { St1, St2, St3 }
```

The Identity (St1) is itself a member of the set. The braces only indicate that St1 is the chosen reference for that association. This means nesting can always be flattened:

```
St1{ St2{ St3 } } → { St1, St2, St3 }
```

Flattening is a deliberate operation — like sum or multiply. When flattening, the operator knowingly loses the association structure. The properties (Factorización Distributiva, State Collapse, Conmutatividad Relacional) exist precisely to operate between levels without losing information.

#### Relaciones sin Dirección

What unites States is a relation. Relations in ISA have no direction and no hierarchy.

```
St1{ St2 }  — St1 and St2 are related
St2{ St1 }  — same fact, different perspective
```

This is a direct consequence of Conmutatividad Relacional: the role of Identity and inner State can always be swapped. The association is symmetric — only the discretion criterion determines which State is presented as the Identity.

#### Circularidad Permitida

ISA explicitly allows circular references. Infinite recursion downward is not a problem because ISA operates only on the data present in the expression — it does not assume completeness.

```
St1{ St2{ St1 } } — valid. ISA does not attempt to resolve the full chain.
```

ISA acknowledges that it never knows all the data. It operates on what exists in the operation. There is no well-foundedness requirement and no base case — States are defined by their expressed content, not by a terminal element.