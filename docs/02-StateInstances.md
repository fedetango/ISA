## State Instances

ISA distinguishes two modes of treating a State: **Absolute** and **Open**. The distinction determines how a State behaves under operations — particularly whether identical references are idempotent or additive.

---

### Absolute State

An Absolute State is the entity itself. Referencing it twice is referencing the same thing. There is only one — it cannot differ from itself.

```
A = A    // tautological — same element
```

Under set operations, an Absolute State is idempotent:

```
A ∪ A = A    // same entity, membership is binary
A ∩ A = A
```

In notation, duplicate bare references collapse — they are the same entity:

```
{A, A} = {A}    // same absolute state, one entity
```

An Absolute State has no explicit Quantifier. It is bare:

```
A
St1{ St2, St3 }    // St1, St2, St3 are all absolute here
```

---

### Open State

An Open State is an instantiable type. Each instance shares the Identity but can contain different inner States. Two instances of the same Open State are not the same element.

```
A ≠ A    // different instances of the same state
```

An Open State is marked by an explicit Quantifier:

```
2(A)              // 2 instances of A
3(A){ B, C }      // 3 instances of A, each containing B and C
```

Under set operations with State Collapse, Open States resolve arithmetically:

```
2(A) ∪ 3(A) = 5(A)    // 5 distinct instances, SUM
```

---

### What Opens a State

A State is Absolute by default. Two mechanisms open it:

#### 1. Explicit Quantifier

Writing a Quantifier declares instances. The Quantifier is the gate between absolute and open:

```
A        // absolute — the entity itself
1(A)     // open — 1 instance (explicitly quantified)
2(A)     // open — 2 instances
```

Even `1(A)` is open — the act of writing a Quantifier is a declaration: "I am counting instances."

#### 2. Arithmetic Operator

Arithmetic operators force quantification on their operands. Before the operation evaluates, each bare operand is transformed to its quantified form:

```
A + A
→ 1(A) + 1(A)    // step 1: arithmetic forces A → 1(A)
→ 2(A)            // step 2: SUM on open States

A * B
→ 1(A) * 1(B)    // step 1: arithmetic forces A → 1(A), B → 1(B)
→ 1(A){ 1(B) }   // step 2: MULTIPLY
```

The transformation `A → 1(A)` is a real intermediate step — the arithmetic operator forces the Quantifier onto the operand before evaluating. This is consistent with the precedence model: arithmetic operators (levels 1–2) resolve before set operators (levels 3–4), and the Quantifier is forced as part of that resolution.

The arithmetic operator is not a separate opening mechanism — it forces the Quantifier, which is the only gate.

---

### Resolution Order and Quantifier Contagion

When absolute and open references to the same State coexist, the resolution follows precedence:

1. **Quantifiers resolve first** — `Q(A)` binds to its State before any operator or set evaluation. This is the highest precedence in the expression.
2. **Absolute deduplication** — bare duplicates of the same State collapse: `{A, A} = {A}`.
3. **Mixed resolution** — if the same Identity exists as both absolute and open after steps 1–2, the Quantifier propagates. The absolute reference is counted as 1 instance and the Quantifiers sum.

```
{A, A}       = {A}            // step 2: bare duplicates collapse
{A, A, 1(A)} = {A, 1(A)}     // step 2: bare dedup → then step 3
             = 2(A)           // step 3: absolute (1) + open (1) = 2
```

This is not a separate rule — it is an effect of precedence. The Quantifier has already resolved before the set is evaluated. Once an open instance exists, the absolute reference is forced into the count:

```
{A}           = A              // no Quantifier — absolute
{A, 1(A)}    = 2(A)           // Quantifier resolved first → contagion
{A, 2(A)}    = 3(A)           // absolute (1) + open (2) = 3
{2(A), 3(A)} = 5(A)           // both open → SUM: 2 + 3 = 5
```

#### Contagion under operations

The same precedence logic applies to operations. The Quantifier resolves before the operator evaluates:

```
A ∪ A     = A        // both absolute — set idempotence
A ∪ 1(A)  = 2(A)     // 1(A) resolved first → contagion → SUM: 1 + 1
A ∩ 1(A)  = 1(A)     // contagion → MIN: min(1, 1) = 1
A -- 1(A) = {}       // contagion → subtract: 1 - 1 = 0 → {}
```

---

### Equivalence of A and 1(A)

`A` and `1(A)` are semantically equivalent — both represent one instance of A:

```
A = 1(A)    // semantic: same count (1 instance)
```

They are operationally distinct — they behave differently under set operations:

```
A ∪ A       = A       // absolute — idempotent
1(A) ∪ 1(A) = 2(A)    // open — SUM
```

The Quantifier notation is the boundary. Writing `1(A)` is an explicit declaration: "this is an instance, and I am counting." Writing `A` is a reference to the entity: "this is the thing itself."

`A = 1(A)` means: if you need to express the quantity of a bare State, it is 1. It does not mean that `A` and `1(A)` are interchangeable in all operational contexts.

---

### Self-Containment

By Identidad Gramatical: `St1{ St1 } = { St1, St1 }`. Both references are bare — same absolute entity:

```
St1{ St1 } = {St1, St1} = {St1} = St1    // redundant — same entity
```

Self-containment is a no-op. The Identity position and the inner position both reference the same absolute State.

But with an explicit Quantifier, the inner reference is open:

```
St1{ 1(St1) } = {St1, 1(St1)} = 2(St1)    // the Quantifier opens the inner reference
St1{ 2(St1) } = {St1, 2(St1)} = 3(St1)    // absolute (1) + open (2) = 3
```

The Quantifier on the inner State is what makes the difference.

---

### Behavior Under Operations

| Expression | State Mode | Result | Mechanism |
|---|---|---|---|
| `A ∪ A` | absolute | `A` | set idempotence |
| `2(A) ∪ 3(A)` | open | `5(A)` | State Collapse → SUM |
| `1(A) ∪ 1(A)` | open | `2(A)` | State Collapse → SUM |
| `A + A` | → open | `2(A)` | arithmetic forces Quantifier |
| `A ∩ A` | absolute | `A` | set idempotence |
| `3(A) ∩ 5(A)` | open | `3(A)` | State Collapse → MIN |
| `A -- A` | absolute | `{}` | same entity removed |
| `3(A) -- 2(A)` | open | `1(A)` | Quantifiers subtract |
| `A △ A` | absolute | `{}` | nothing unique to either side |
| `3(A) △ 5(A)` | open | `2(A)` | absolute difference |

---

### Interaction with Ontological Perspective

The Ontological Perspective (see Algebra) describes two perspectives determined by the **operator**: set (membership) vs arithmetic (quantification).

The Absolute/Open distinction describes two modes determined by the **State's form**: bare (entity) vs quantified (instances).

These are orthogonal axes:

```
                    Operator Perspective
                    Set          Arithmetic
State    Absolute   A ∪ A = A    A + A = 2(A) → opens it
Mode     Open       2(A) ∪ 3(A) = 5(A)    2(A) + 3(A) = 5(A)
```

Set operations **respect** the State's mode — if absolute, idempotent; if open, delegate to arithmetic via State Collapse.

Arithmetic operations **force** openness — they always treat operands as instantiable, regardless of original form.

---

### The Quantifier is the Gate

The presence or absence of an explicit Quantifier is what determines the mode. This is not a property of the State itself — the same State can be absolute in one expression and open in another:

```
// Male as absolute — one entity, membership query
{Male, Female} ∋ Male    ➔ True

// Male as open — explicitly quantified
3(Male){ Juan, Pedro, Carlos }
```

The State has no fixed nature. The Quantifier declares the mode.
