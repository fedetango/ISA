#### ISA Set Operation Rules

- The most basic and axiomatic operations of ISA are set operations (taken from set theory).

- State Collapse:  If two identical states (Identities) are subjected to an operation, they collapse into a single Identity. The operation is then recursively passed down and applied to their contained states.
`St1 {St2, St5} ∪ St1 {St3} = St1 {St2, St5, St3}`

#### Contains (`∋`)
The exact inverse of Belongs To (`∋`). It asks if the State on the left has the State on the right as a direct child.

- Identity containing a flat state:
  `St1 {St2, St3} ∋ St2 ➔ True`

- Identity containing another Identity:
  `St1 { St2 {St3} } ∋ St2 {St3} ➔ True`

##### Contains with Quantifiers

Contains distinguishes between positive instances and deficit records. `-X` is a query modifier — the State is always `X`, but the sign specifies which dimension to query:

- `∋ X` — asks for positive instances of X
- `∋ -X` — asks for a deficit record of X

```
St1{ -2(X) } ∋ X    ➔ False   // no positive instances
St1{ -2(X) } ∋ -X   ➔ True    // deficit record present
St1{ }       ∋ X    ➔ False   // absent: no instances
St1{ }       ∋ -X   ➔ False   // absent: no debt either
St1{ 3(X) }  ∋ X    ➔ True
St1{ 3(X) }  ∋ -X   ➔ False
```

This preserves the distinction between absence (`0(St) = {}`, no record) and debt (`-3(St)`, deficit registered).


#### Subset (⊆ / ⊂)
Evaluates if all the states on the left side are completely contained within the right side. In ISA, if the root identities match, the subset relation evaluates their internal states.

Subset of flat states:
{St1} ⊆ {St1, St2} ➔ True

Same identity, partial internal states:
St1 {St2} ⊆ St1 {St2, St3} ➔ True (The roots match, and the left's internal states are a subset of the right's).

Different identities:
St1 {St2} ⊆ St3 {St1, St2} ➔ False (Even though the internal states are present, the root context St1 is not a subset of St3).

Nested subset evaluation:
{St1 {St2}} ⊆ {St1 {St2, St3}, St4} ➔ True (The entire structure St1 {St2} exists as a valid subset inside the right side)


#### Union (∪)
The Union in ISA acts as a "Deep Merge". It combines states and collapses shared identities to enrich their internal states.

- Union of states (Flat):
  `{St1, St2} ∪ {St2, St3} = {St1, St2, St3}`

- Same identity, different states (State Collapse):
  `St1 {St2} ∪ St1 {St3} = St1 {St2, St3}`

- Different identities (Disjoint):
  `St1 {St2} ∪ St3 {St4} = { St1 {St2}, St3 {St4} }`

- Nested Collapse:
  `{St1, St2 {St3}} ∪ {St2 {St4}} = { St1, St2 {St3, St4} }`

##### Union and Quantifiers — Formal Rule

When State Collapse occurs in Union, Quantifiers from both sides **sum**. This is the formal bridge between set and arithmetic perspectives: Union detects the same root Identity (set perspective), collapses, and delegates Quantifier resolution to arithmetic (SUM).

By precedence, the `-` in a negative quantifier resolves as arithmetic (level 2) before `∪` (level 4) is evaluated. The result is that Union operates on the signed quantifier values and sums them:

```
2(X) ∪ 3(X)    = 5(X)    // same identity, SUM: 2+3
-2(X) ∪ 3(X)   = 1(X)    // same root identity X, SUM: -2+3
-2(X) ∪ -3(X)  = -5(X)   // same identity, SUM: -2+(-3)
```

Union combines memberships — positive and debt instances of the same State interact arithmetically through State Collapse. This contrasts with Intersection, where mixed signs are treated as distinct entities (see Precedence).

##### Union with Mixed Absolute/Open States

When Union encounters the same Identity as both Absolute (bare) and Open (quantified), the Quantifier has already resolved (level 0 precedence). The Open form forces the Absolute reference to be counted — Union then sums:

```
{St1, St2} ∪ {St2, St3}          = {St1, St2, St3}           // all absolute — idempotent
{St1, 1(St2)} ∪ {1(St2), St3}    = {St1, 2(St2), St3}        // both open — SUM: 1+1
{St1, St2} ∪ {1(St2), St3}       = {St1, 2(St2), St3}        // mixed — contagion → SUM: 1+1
{St1, St2} ∪ {3(St2), St3}       = {St1, 4(St2), St3}        // mixed — contagion → SUM: 1+3
```

The rule is: Union over a quantified State implies SUM. Once one side has an explicit Quantifier, the other side's reference is counted as 1 instance.

#### Intersection (∩)
The Intersection extracts the shared architecture between two sets. Identities only survive if they are present in both sides, and the operation collapses them to intersect their contents.

- Intersection of flat states:
  `{St1, St2} ∩ {St2, St3} = {St2}`

- Same identity, intersecting states:
  `St1 {St2, St3} ∩ St1 {St3, St4} = St1 {St3}`

Same identity, disjoint states:
St1 {St2} ∩ St1 {St3} = St1 {} = St1 (The identity is shared, but its contents have no intersection. An empty Identity is equivalent to the State itself — it is not a special case nor equivalent to the empty set).

Different identities:
St1 {St2} ∩ St3 {St2} = {} (Even if internal states match, the root identities are different).

##### Intersection with Mixed Absolute/Open States

When Intersection encounters the same Identity as both Absolute and Open, the Quantifier resolves first (level 0). Contagion applies — the Absolute reference is counted as 1 instance. Intersection then takes the minimum:

```
{A, B} ∩ {A, C}              = {A}              // all absolute — shared entity
{A, B} ∩ {1(A), C}           = {1(A)}           // mixed — contagion → MIN: min(1,1) = 1
{3(A), B} ∩ {1(A), C}        = {1(A)}           // both open — MIN: min(3,1) = 1
{3(A), B} ∩ {A, C}           = {1(A)}           // mixed — contagion → MIN: min(3,1) = 1
```

Once any side is quantified, the result is Open. The Quantifier survives the intersection.

#### Difference (--)
The Difference subtracts the right side from the left side. If an identity matches, it collapses to subtract the internal states of the right from the internal states of the left.

Difference of flat states:
{St1, St2, St3} -- {St2} = {St1, St3}

Same identity, subtracting internal states:
St1 {St2, St3} -- St1 {St3} = St1 {St2}

Subtracting the identity itself:
St1 {St2, St3} -- {St1} = {} (Removing the root state eliminates the entire node).

Different identities:
St1 {St2} -- St3 {St2} = St1 {St2} (No collapse occurs; the left side remains intact).

##### Difference with Mixed Absolute/Open States

When Difference encounters the same Identity as both Absolute and Open, the Quantifier resolves first (level 0). Contagion applies — the Absolute reference is counted as 1 instance. Difference then subtracts, floored at `{}`:

```
{A, B} -- {A}                = {B}              // all absolute — A removed
{A, B} -- {1(A)}             = {B}              // mixed — contagion → 1-1=0 → A gone
{3(A), B} -- {A}             = {2(A), B}        // mixed — contagion → 3-1=2
{3(A), B} -- {2(A)}          = {1(A), B}        // both open → 3-2=1
{A, B} -- {3(A)}             = {B}              // mixed — contagion → 1-3 floors at {} → A gone
```

Contagion does not change the floor rule: Difference never produces debt, regardless of whether the States are absolute or open.

#### Asymmetric Difference / Symmetric Difference (△)
The Symmetric Difference keeps only what is unique to each side. When identities collapse, the symmetric difference is applied to their internal nested states.

Symmetric difference of flat states:
{St1, St2} △ {St2, St3} = {St1, St3}

Same identity (Nested Symmetric Difference):
St1 {St2, St3} △ St1 {St3, St4} = St1 {St2, St4} (The identity matches and collapses, but only the unique internal states survive).

Different identities:
St1 {St2} △ St3 {St4} = { St1 {St2}, St3 {St4} }

##### Symmetric Difference with Mixed Absolute/Open States

When Symmetric Difference encounters the same Identity as both Absolute and Open, the Quantifier resolves first (level 0). Contagion applies — the Absolute reference is counted as 1 instance. Symmetric Difference then takes the absolute difference of Quantifiers:

```
{A, B} △ {A, C}              = {B, C}           // all absolute — A shared, removed from both
{A, B} △ {1(A), C}           = {B, C}           // mixed — contagion → |1-1|=0 → A gone
{3(A), B} △ {A, C}           = {2(A), B, C}     // mixed — contagion → |3-1|=2
{3(A), B} △ {5(A), C}        = {2(A), B, C}     // both open → |3-5|=2
```