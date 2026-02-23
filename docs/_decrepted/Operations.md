# Operations
- The nodes can operate on each other.
- Nodes can be joined, differentiated, intersected, and more according to set theory.

## Principles
- **Immutable**: Operations return NEW node (original nodes unchanged)
- **Recursive**: Apply to all depth levels
- **NodeLinks as Sets**: No duplicates, all links are implicit arrays

---

## `@Related` 

```md
@Node01 ∈ @Node02
```

---

## `@Union`

```md
@Node01 ∪ @Node02
```

Combines ALL links from both nodes.
- Conflicts (same link, different values): keeps both as array
- Different tokens: returns NodeSet

---

## `@Intersection`
```md
@Node01 ∩ @Node02
```

Only links common to BOTH with SAME value.
- Base for Match Query ({M}): AND implicit
- Different tokens: returns empty array []

---

## `@Difference`
```md
@Node01 - @Node02
```

Links in A but NOT in B (with same value).
- Values differ: link is kept
- Different tokens: returns A unchanged

---

## `@SymetricDifference`
```md
@Node01 △ @Node02
```

Only exclusive links: (A - B) ∪ (B - A)

---

### Axiomatic Mathematical Operations
- COUNT
- UNIQUE-COUNT
- JOIN
- MIN
- MAX
- SUM
- AVG
- FIRST
- LAST

---
