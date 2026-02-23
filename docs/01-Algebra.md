# Identity and State Algebra (ISA)

**Identity and State Algebra (ISA)** is a mathematical model that allows the expression of operations on discrete entities. It is an extension of set theory.

---

### Fundaments

ISA extends set theory, which shapes modern mathematics, and defines everything under a single concept: states.

Applying this to the physical or computer world, we can think of states as a set of specific values (although this isn't formally defined in algebra).

The identity that defines the elements is also a state. ISA is based on the principle that every characteristic can be a distinguishing feature and therefore a marker of discretion, continuity, and quantification.

Imagine a fruit bowl. How many fruits are there? How many citrus fruits are there? How many lemons are there? How many different types of fruit are there? These are four distinct questions, and each one distinguishes the cumulative elements by a different state (in ISA, this is the identity).

This has a deeper reason, related to explaining the existence of properties that enable quantification in the universe. But that's a topic for another article.

### Reasons for creation

- Closed coherence (autrodescipt)
- Avoid ambiguities
- Self-controlled extension

---

### Definitions

#### Axioms

- Everything is a State.
- A State is a set of States.
- A State that acts as container of other States is known as an Identity.

#### State (St)

The fundamental primitive. Everything is a State. A State is a set of States.

```
St
St = { St }
St = { St, St }
```

#### Instance

The appearances of a State within an expression. Each occurrence of a State counts as an instance.

```
A + 2(A) = 3(A)  → 3 instances of State A.
```

The Quantifier is the notation that expresses the number of instances.

#### Identity (Id)

A grammatical tool for associating States. Marked by placing a State before curly braces — the first State is the Identity. Does not establish hierarchy.

```
Id{ St }          // where Id = St
```

```
A{ St1, St2 }             // A is Identity of { St1, St2 }
{St1, St2}{ St3, St4 }    // {St1, St2} is Identity of { St3, St4 }
```

#### Quantifier (Q)

A semantic and operational tool. Expresses how many instances of a State exist.

```
Q(St){ St }
```

```
6(A){ B, C }
A{ B, 3(C) }
A{ B, 3({D, F}) }
8({J, K})
2({A, B}){C, D}
```

#### Operators

Binary operations between States.

```
St [op] St
```

Arithmetic: `+` (sum), `-` (rest), `*` (multiply), `/` (divide)

Set: `∪` (union), `∩` (intersection), `△` (symmetric difference), `--` (difference)

Relational: `∋` (contains), `⊆` (subset)

#### Ontological Perspective of Operations

ISA has two families of operations — set and arithmetic — because they correspond to two different perspectives on what a State is. The distinction is not in the State itself but in the operation applied to it.

**Set operations** treat States as unique entities (membership perspective). The question is binary: is the State present or not? A State cannot be duplicated because it is already itself. `A ∪ A = A` — idempotent.

**Arithmetic operations** treat States as instantiable characteristics (quantification perspective). The question is quantitative: how many instances exist? `A + A = 2(A)` — additive.

The same State can be operated from either perspective. No State has a fixed nature — the operator decides:

```
// A UUID (intuitively unique) can be quantified:
3(UUID-123)

// A characteristic (intuitively instantiable) can be checked for membership:
{Male, Female} ∋ Male
```

This is consistent with Discretional Quantification: just as the same data yields different counts depending on the criterion, the same State behaves as unique or instantiable depending on the operation. The choice of operator IS the declaration of perspective.

State Collapse is the bridge between both perspectives: when a set operation encounters the same Identity, it delegates to arithmetic to resolve the Quantifiers. `2(X) ∪ 3(X) = 5(X)` — the Identity collapses (set perspective), the Quantifiers sum (arithmetic perspective).

#### Combined Examples

```
// Identity + State: a person with characteristics
Juan{ Male, Argentinian }

// Quantifier + Identity: 3 males, each with a country
Male{ Juan{Arg}, Pedro{Chile}, Carlos{Arg} }

// Discretional Instances: same data, different counts depending on criterion
// From Male: 3(Male). From Arg: 2(Arg). From Chile: 1(Chile).

// Operator + State Collapse: union merges shared identities
Male{ Juan, Pedro } ∪ Male{ Carlos } = Male{ Juan, Pedro, Carlos }

// Quantifier + Operator: arithmetic on same identity
2(A){B} + 3(A){C} = 5(A){B, C}

// Composite Identity + Quantifier + Operator
2({A, B}){C} ∪ ({A, B}){D} = 3({A, B}){C, D}
```

#### Operations

An operation applies an operator between two terms:

```
term operator term
```

Operations can appear inside terms as internal expressions:

```
Q({e1, Q(e2) * e3}){e4}
```

#### Full Expression

A complete ISA expression combines terms, operators, and optional declarations:

```
[declaration ;] term [operator term]*
```

#### Declaration

ISA expressions can be **declarative**. A term can declare a contract — binding the current content of an Identity as a named reference — before an operation is applied.

`;` — separates the declarative plane from the operative plane.

`St1 { StContent }` — declares that `St1` currently contains `StContent`. Binds `StContent` as a reference to that state.

#### Example — State Replacement

```
St1 { St1Content };  StAssign = { St1 -- St1Content } ∪ St1NewContent
```

`St1Content` is declared as the current inner states of `St1`. The operation then removes them (Difference `--`) and adds the new content, producing `StAssign` with exactly `St1NewContent` under the same Identity.