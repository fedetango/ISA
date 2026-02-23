## Quantification in ISA

- In ISA, numbers are not constructed from sets, but rather emerge from them.

- The philosophy is that numbers are always and in every case simplifying tools that express the quantification of specific states.

- `2(St1)` implies the existence of two states, St1.

- There are no numbers that do not quantify a state.

- By default, all states are assigned a quantization value of 1.

---

### Discretional Quantification

The same set of States can be quantified differently depending on the discretion criterion:

```
StJuan{StMale, StArg}  +  StPedro{StMale, StChile}  +  StLucia{StFemale, StArg}

// Discretion by StMale:   2(StMale)
// Discretion by StFemale: 1(StFemale)
// Discretion by StArg:    2(StArg)
// Discretion by StChile:  1(StChile)
```

Numbers are always relative to a discretion criterion. There is no absolute count — only counts of specific States.

### Arithmetic is Discretional

Sum and Rest between quantified States are only valid when operating on the same State:

```
2(StMale) + 3(StMale) = 5(StMale)    // Valid: same State
3(StMale) + 2(StArg) = ?              // Not directly valid: different States
```

Operating between different States requires knowledge of their internal composition and the application of Factorización Distributiva or Conmutatividad Relacional to bring them to a common State before operating.

Multiplication follows a unified rule for all States (see MULTIPLY in Extended Arithmetic).

---

### Quantifiers

A Quantifier is the numerical value applied to a State or set. In ISA, every number is a Quantifier — there are no standalone numbers. Quantifiers express how many instances of their target exist.

By default, every State has an implicit Quantifier of 1:

```
St1 = 1(St1)
```

---

### Quantifier Scope

A Quantifier affects exactly what is inside its parentheses — nothing more.

#### On a single State

```
2(A)
// 2 instances of A
```

#### On a composite (set)

```
2({A, B})
// 2 instances of the composite {A, B}
// Each instance contains 1 A and 1 B
// The Quantifier does NOT distribute to inner members
```

#### On an Identity with inner States

```
2(A){B}
// 2 quantifies A (the Identity). B is inner — unaffected.
// By Identidad Gramatical: A{B} = {A, B}
// Therefore: {2(A), B}
```

#### On a composite Identity with inner States

```
2({A}){B}
// 2 quantifies the composite {A}. B is inner — unaffected.
// {2({A}), B}
```

---

### Internal Quantification

States inside a composite carry their own Quantifiers. These describe the composition of each instance:

```
4({2(A)})
// 4 instances of a composite containing 2(A)
// Total A: 4 * 2 = 8

3({A, 2(B)})
// 3 instances of a composite containing A and 2(B)
// Total A: 3, Total B: 3 * 2 = 6
```

The outer Quantifier determines how many instances exist. Inner Quantifiers describe what each instance contains.

