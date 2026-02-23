## ISA Extended Arithmetic

- ISA supports arithmetic operators for operating on quantized numbers.

- Every arithmetic operation results in an increase, decrease, or permanence of the quantitative value of the state it affects.

- Arithmetic operates exclusively on Quantifiers. Structure is modified through properties (Factorización Distributiva, Conmutatividad Relacional, etc.), not through arithmetic.

- Set operations and arithmetic are complementary. When set operations encounter the same Identity, State Collapse applies and the Quantifiers follow arithmetic rules: `2(X) ∪ 3(X) = 5(X)`.

---

### SUM

Increases the quantification of a State:

```
2(StMale) + 3(StMale) = 5(StMale)
```

With structure (Factorización Distributiva):

```
StMale{ StJuan{StArg}, StPedro{StChile} }  +  StMale{ StCarlos{StArg} }
= StMale{ StJuan{StArg}, StPedro{StChile}, StCarlos{StArg} }
// 3(StMale), 2(StArg), 1(StChile)
```

#### Different Identities

Sum between different Identities is not valid:

```
2(X) + 3(Y) = 2(X) + 3(Y)    // Cannot simplify. Stays as expression.
```

When the terms share a common State at different levels, ISA properties (Identidad Gramatical, Conmutatividad Relacional) can bring them to the same level, allowing the common State to be operated:

```
2(Y) + 3(X){2(Y)}
= 2(Y) + {3(X), 2(Y)}        // Flatten via Identidad Gramatical
= {3(X), 4(Y)}                // Same-identity sum on Y: 2+2=4
```

---

### REST

Decreases the quantification of a State:

```
5(StMale) - 2(StMale) = 3(StMale)
```

With structure:

```
StMale{ StJuan{StArg}, StPedro{StChile}, StCarlos{StArg} }  -  1(StChile)
= StMale{ StJuan{StArg}, StCarlos{StArg} }
// 2(StMale), 2(StArg), 0(StChile)
```

#### Different Identities

Rest between different Identities is not valid:

```
3(Y) - 2(X) = 3(Y) - 2(X)    // Cannot simplify. Stays as expression.
```

When the terms share a common State, properties can bring it to the same level. The coherence constraint `A - B + B = A` requires negative Quantifiers when subtracting more than what exists:

```
2(Y) - 3(X){2(Y)}
= 2(Y) - {3(X), 2(Y)}        // Flatten via Identidad Gramatical
= {-3(X), 0(Y)}               // Y: 2-2=0, X: 0-3=-3
= -3(X)
```

Verification:

```
-3(X) + 3(X){2(Y)}
= -3(X) + {3(X), 2(Y)}
= {0(X), 2(Y)}
= 2(Y)  ✓
```

ISA admits negative Quantifiers. A negative Quantifier expresses a deficit — States that were subtracted without existing on the operand side.

---

### MULTIPLY

Multiplication is generative. The first operand persists as Identity, the arithmetic product is placed as inner content.

```
2(A) * 3(A) = 2(A){ 6(A) }
2(X) * 3(Y) = 2(X){ 6(Y) }
```

One rule. No distinction between same or different identity. ISA properties resolve the structure naturally.

#### Why generative — Conservación de Estados

In ISA, arithmetic operates on States, not on abstract numbers. A purely arithmetic result like `2(A) * 3(A) = 6(A)` would imply that the 2 original States disappeared — but no destructive operation removed them. By Conservación de Estados, the original operands persist and the product is generated as new inner content.

#### Grammatical asymmetry

The first operand takes the role of Identity by writing convention. By Conmutatividad Relacional, the perspective can be freely inverted without loss of information:

```
2(A) * 3(B) = 2(A){ 6(B) }    // perspective from A
            = 3(B){ 6(A) }    // perspective from B
```

The product is the same. The direction is grammatical, not ontological.

#### Collapse

The result may be collapsed via Identidad Gramatical at the operator's discretion. This is an explicit decision — the operator chooses to lose the operational trace:

```
2(A){ 6(A) }  →  8(A)
```

---

### DIVISION

Divides the quantification of a State.

#### Same Identity — Direct Quotient

```
6(A) / 2(A) = 3(A)
```

The quantifications divide directly.

#### Different Identities

Division between different Identities stays as expression:

```
6(X) / 3(Y) = 6(X) / 3(Y)    // Cannot simplify. Stays as expression.
```

Like SUM and REST, arithmetic between different Identities does not simplify directly.

#### Composite Distribution Property

Any division between different Identities can be expanded into composite form. The divisor's quantifier defines the number of groups. Each group contains the quotient of the dividend and one instance of the divisor:

```
Q1(X) / Q2(Y) = Q2({ (Q1/Q2)(X), 1(Y) })
```

```
12(X) / 4(Y) = 4({ 3(X), 1(Y) })
// 4 groups, each containing 3 Xs and 1 Y
// Total X: 4 × 3 = 12 ✓
// Total Y: 4 × 1 = 4  ✓
```

The divisor does not disappear — it is represented inside each group as the criterion that defines the grouping. This satisfies Conservación de Estados: all States from both operands are preserved in the result.

This form uses composite quantification `Q({...})` (not Identity notation), so Identidad Gramatical does not apply — internal counts multiply correctly.
