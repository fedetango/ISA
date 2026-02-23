# ISA — Identity and State Algebra

ISA is a mathematical algebra that extends set theory with one insight: **every entity can be both a unique thing and a counted instance, and the notation itself decides which**.

Write `A` and you have the entity — referencing it twice changes nothing: `{A, A} = {A}`.
Write `1(A)` and you have one *instance* — two instances add up: `{1(A), 1(A)} = 2(A)`.

The Quantifier `Q()` is the only gate between these two modes. Everything else — operations, collapse rules, conservation laws — derives from this single distinction.

## Discretional Quantification

In ISA, there are no standalone numbers. Every number is a Quantifier — it counts instances of a specific State. `2` alone means nothing; `2(Male)` does. The same data yields different counts depending on the criterion:

```
Male{Juan{Arg}, Pedro{Chile}} + Female{Lucía{Arg}}
→ 2(Male), 1(Female), 2(Arg), 1(Chile)
```

All counts derive algebraically from the same expression via perspective reorganization (T4, T5). No filters, no external functions — the algebra itself supports "count by X" as a native operation.

## Three Axioms

| | Axiom | Meaning |
|---|---|---|
| **A1** | Everything is a State | One primitive. No types, no atoms. |
| **A2** | A State is a set of States | Composition is universal. |
| **A3** | Identity is a grammatical role | `A{ B, C }` means A is the reference point of the set `{A, B, C}`. |

From three axioms plus eight definitions, ISA derives 18 theorems covering set operations, arithmetic, conservation, and collapse.

## Absolute vs Open — The Core Distinction

| Mode | Notation | Behavior | Example |
|---|---|---|---|
| **Absolute** | `A` | The entity itself. Idempotent. | `A ∪ A = A` |
| **Open** | `Q(A)` | Counted instances. Arithmetic. | `2(A) ∪ 3(A) = 5(A)` |

`A = 1(A)` semantically (both mean "one instance"), but **not** operationally. This is intentional — the same data yields different results depending on whether you treat it as a *thing* or a *quantity*.

When both modes coexist, Open wins (**Contagion**): `{A, 2(A)} = 3(A)`.

Arithmetic operators force the gate open: `A + A` → `1(A) + 1(A)` → `2(A)`.

## Notation

```
A                   Absolute state
2(A)                Open state (2 instances)
-2(A)               Debt (deficit record, not absence)
A{ B, C }           A with inner states B and C
3(A){ B, 2(C) }     3 instances of A, each containing B and 2(C)
{ A, B }            Composite (set, no highlighted identity)
2({A, B})           2 instances of composite {A,B}
{}                  Empty (absence, no record)
```

## Operations

### Precedence (highest → lowest)

| Level | Operators | Category |
|---|---|---|
| 0 | `Q()` | Quantifier binding |
| 1 | `*` `/` | Arithmetic multiplicative |
| 2 | `+` `-` | Arithmetic additive |
| 3 | `∩` | Set intersection |
| 4 | `∪` `--` `△` | Set union / difference |

### Set Operations — Respect State Mode

Same identity in a set operation triggers **State Collapse**: the operation recurses into inner states and resolves Quantifiers by its own rule.

| Operation | Quantifier Rule | Unpaired elements | Example |
|---|---|---|---|
| `∪` Union | SUM: `a + b` | keep both sides | `2(A) ∪ 3(A) = 5(A)` |
| `∩` Intersection | MIN: closest to 0 | discard | `5(A) ∩ 3(A) = 3(A)` |
| `--` Difference | Subtract floored: `max(0, a-b)` | keep left only | `5(A) -- 3(A) = 2(A)` |
| `△` Sym. Difference | Absolute diff: `\|a-b\|` | keep both sides | `5(A) △ 3(A) = 2(A)` |

Mixed signs in intersection → `{}` (presence and debt are distinct entities).

Difference **floors at `{}`** — it never produces debt.

### Arithmetic Operations — Force Quantification

| Operation | Rule | Example |
|---|---|---|
| `+` SUM | Add Q, merge inner via `∪` | `2(A) + 3(A) = 5(A)` |
| `-` REST | Subtract Q, **can produce debt** | `2(A) - 5(A) = -3(A)` |
| `*` MULTIPLY | Generative: `Q1(A) * Q2(B) = Q1(A){ Q1·Q2(B) }` | `2(A) * 3(B) = 2(A){ 6(B) }` |
| `/` DIVISION | Same id: quotient. Diff id: composite distribution | `12(X) / 4(Y) = 4({ 3(X), 1(Y) })` |

Multiply is **generative** — the first operand becomes the Identity, the product goes inside. Both operands are conserved.

Division across different identities distributes: `12(X) / 4(Y)` means "4 groups, each containing 3 X's and 1 Y."

### Relational Operations

| Operation | Returns | Example |
|---|---|---|
| `∋` Contains | boolean | `A{ B, C } ∋ B` → true |
| `⊆` Subset | boolean | `{A} ⊆ {A, B}` → true |

Contains distinguishes positive presence (`∋ X`) from debt records (`∋ -X`).

## Key Properties

**Conservación de Estados** — SUM, Union, and Multiply never reduce instances. Only REST and Difference are destructive.

**State Collapse** — When two states share Identity in a set operation, they merge. The operation recurses into inner states; the Quantifier resolves per the operation's rule.

**Quantifier Contagion** — Open form forces Absolute to be counted: `{A, 1(A)} = 2(A)`. This is a consequence of precedence level 0 (Quantifier resolves first).

**Identidad Gramatical** — `A{ B, C } = { A, B, C }`. Identity is a member of its own set. The curly braces highlight which member is the reference point; flattening them produces the same set.

**Negative Quantifiers express debt, not absence** — `-3(A)` is a record of deficit (from REST). `0(A) = {}` is absence (no record). Only REST produces debt; Difference floors at `{}`.

## Definitions

| | Definition | Rule |
|---|---|---|
| D1 | Identidad Gramatical | `A{ B } = { A, B }` |
| D2 | Quantifier | `A = 1(A)` semantic, not operational |
| D3 | Quantifier Scope | `Q` affects only what's inside its `()` |
| D4 | Quantifier Zero | `0(St) = {}` |
| D5 | Negative Quantifier | `-Q(St)` = debt record |
| D6 | Operators | Set, arithmetic, relational |
| D7 | Precedence | Levels 0–4 |
| D8 | Absolute/Open States | The Quantifier gate |

## Theorems

| | Theorem | Statement |
|---|---|---|
| T1 | Indeterminismo Compositivo | States not atomic; equivalent under any partition |
| T2 | Relaciones sin Dirección | Relations symmetric; roles swappable |
| T3 | Redundancia | `{A, A} = {A}` absolute; `{1(A), 1(A)} = 2(A)` open |
| T4 | Conmutatividad Relacional | Identity/inner roles swappable per term |
| T5 | Factorización Distributiva | Common inner extracted as root |
| T6 | Asociatividad | `∪`, `∩`, `△` associative; `--` is not |
| T7 | State Collapse | Same identity collapses; inner recursed |
| T7b | Quantifier Contagion | Mixed modes → Open wins (SUM) |
| T7c | Auto-resolution | `{2(A), 6(A)} = 8(A)` |
| T8 | Conservación | Non-destructive ops preserve instances |
| T9 | REST Coherence | `A - B + B = A` |
| T10 | Difference ≠ debt | `--` floors at `{}` |
| T11 | Union → SUM | Quantifiers add on collapse |
| T12 | Intersection → MIN | Same sign: min. Mixed: `{}` |
| T13 | Division Distribution | Composite distribution property |
| T14 | Multiply Collapse | Generative then flatten → sum total |
| T15 | Commutativity | `∪ ∩ △ + *` commutative; `-- - /` not |
| T16 | Difference → subtract | Floored at `{}` |
| T17 | Sym.Diff → abs diff | `\|a - b\|` |
| T18 | Operación a Mismo Nivel | Flatten levels before operating |

## ISABasic — Engine

```
ISABasic/
├── index.mjs              ← Public API (re-exports lib/)
├── lib/
│   ├── isa-state.mjs      ← St, sameId, eq, normalize, flatten, toOpen
│   ├── isa-operations.mjs ← union, intersection, difference, symDiff,
│   │                        sum, rest, multiply, division, contains, subset
│   └── isa-parse.mjs      ← parse (text → St), stringify (St → text)
└── _teo/                  ← 72 tests (16 routines)
```

### Usage

```js
import { St, parse, stringify, union, sum, normalize } from './index.mjs'

// Build states
const a = St("A", 2, [St("B")])         // 2(A){ B }
const b = parse("3(A){ C }")            // 3(A){ C }

// Operate
const result = union(a, b)              // [St("A", 5, [St("B"), St("C")])]

// Read
stringify(result[0])                    // "5(A){ B, C }"

// Normalize resolves flat sets
normalize([St("A"), St("A", 2)])        // [St("A", 3)] — contagion: 1+2
```

### Test Suite

```bash
node _teo/run.mjs
# 72 passed, 0 failed
```

13 operation routines + 3 parse/stringify routines. All operations tested with absolute, open, negative, inner, composite, and mixed cases.
