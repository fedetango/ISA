# Identity and State Algebra (ISA)

**Identity and State Algebra (ISA)** is a mathematical model that allows the expression of operations on discrete entities. It is an extension of set theory.

**ISA** is understood on two levels: **LEVEL 1: OPERABILITY** and **LEVEL 2: DEFINITION**.

---

## LEVEL 1: OPERABILITY
- Level 1 defines how entities interact based on their `Identity` and `State`

### Key Concepts:

- `Identity (Id)`: Unambiguously identified entity.
- `State (St)`: Unambiguous sum of values related to an entity.

### Nomenclature
- `Set (SET / {})`: Entity Set
- `Specific identity/state ( )`: `Id(1)` o `St(20)`
- `Entity status (.)`: `Id(1).St(x1)`
- `Value Set ({})`: `{1, 2, 3, Id(1), St(2)}`
- `Separation of Terms ([  ])`

### Axioms
`St(1) = St{1}`
`Id(1) = Id{1}`

### Operations

### Union (`∪`)
- Union of states:
`St(a1) ∪ St(a2) = St(x3) = St{a1, a2}`

- Same identity, different states: 
`Id(1).St(1) ∪ Id(1).St(2) = Id(1).[St(1) ∪ St(2)]`

- Diferentes identidades:
`Id(A).St(1) ∪ Id(A).St(2) =  Id(A).St(1, 2)`

### Intesrection (`∩`)

### Difference (`-`)

### Asymetric Difference (`△`)

---

## LEVEL 2: DEFINITION
Level 2 establishes how identities are defined

- `Node (N)`: The minimum operating entity.
- `Relation (Rel)`
- `Value (V)`
- `Version (Ver)`
- `Module (M)`