---
title: Symmetry, Burnside's Lemma, and the Combinatorics of Tic-Tac-Toe
description: Counting board patterns using the dihedral group D4, understanding Burnside's
  lemma, and reducing equivalent states in game-search algorithms.
pubDate: '2023-01-18'
tags:
- Combinatorics
- Group Theory
- Burnside Lemma
- Symmetry
- Tic Tac Toe
draft: false
---

*By Md Arif Hossain · Symmetry and counting in discrete mathematics*

![A Tic-Tac-Toe board transformed under rotations and reflections](/images/blog/tictactoe-symmetry.svg)

When we rotate a Tic-Tac-Toe board by 90 degrees, the strategic situation does not change. The top-left corner becomes the top-right corner, but a win remains a win, a forced block remains a forced block, and the legal moves retain their essential structure. Reflection across a diagonal produces another equivalent representation. This familiar geometric observation has an exact algebraic formulation: the symmetries of a square form a finite group, and the group acts on the set of board configurations. Once that action is made explicit, we can count distinct patterns and accelerate game-solving algorithms by avoiding redundant evaluations.

The relevant mathematical tools are the **dihedral group** and **Burnside's lemma**. They are useful far beyond recreational games, including graph isomorphism heuristics, chemical configuration counting, coding problems, computer vision, and combinatorial optimization with interchangeable facilities or resources. Tic-Tac-Toe makes the underlying logic visible without obscuring it behind a very large example.

## 1. What does it mean for two boards to be equivalent?

Think of a board as a function $$b:\{1,\ldots,9\}\rightarrow\{X,O,.\}$$ assigning a mark or an empty symbol to each of the nine cells. Two boards $$b_1$$ and $$b_2$$ are **geometrically equivalent** if one can be obtained from the other by rotating or reflecting the entire square while preserving the marks. Geometric equivalence is different from equality: two boards may occupy different cell coordinates but describe exactly the same strategic pattern after changing our point of view.

For example, a single X placed in the upper-left corner, upper-right corner, lower-right corner, or lower-left corner represents one geometric class. A single X in the center represents another class, and a single X on a middle edge represents a third. Consequently, the nine distinct first moves of Tic-Tac-Toe reduce to only **three opening classes** under symmetry. This observation is a statement about the geometry of the empty board, not a claim that these three classes all have the same game value.

The transformation must act on the full board consistently. We cannot move only the X marks and leave O marks fixed. Rotations and reflections relabel squares; they do not swap the identities of the two players. Likewise, geometric equivalence does not automatically identify a board with the board obtained by exchanging all X symbols and O symbols. Player exchange is a different transformation and may not preserve turn order or the relevant utility from X's perspective.

## 2. The symmetry group of a square

A square has eight geometric symmetries:

1. The identity transformation.
2. Rotations through 90, 180, and 270 degrees.
3. Reflection across the vertical axis.
4. Reflection across the horizontal axis.
5. Reflection across the two diagonals.

These eight transformations form the **dihedral group $$D_4$$**, under composition. The notation varies slightly among textbooks, but here $$D_4$$ means the group of order eight associated with a square. Two generators are enough: let $$r$$ denote rotation by 90 degrees and $$f$$ reflection in a chosen axis. They satisfy

$$
r^4=e,\qquad f^2=e,\qquad fr=r^{-1}f.
$$

The first relation says four quarter rotations restore the original orientation. The second says reflecting twice does nothing overall. The third captures the interaction between rotation and reflection. The group is non-abelian: the order in which we reflect and rotate can matter. This is an important conceptual link to the Rubik's Cube, where noncommuting transformations also create rich structures, though the underlying groups are very different.

A **group action** is a rule associating each group element $$g$$ with a transformation of the set of board colorings such that the identity fixes every board and composition of group elements matches composition of board transformations. The orbit of a board $$b$$ is

$$
\operatorname{Orb}(b)=\{g\cdot b:g\in D_4\}.
$$

An orbit collects all pictures that represent the same configuration up to symmetry. Some orbits contain eight boards; others are smaller because the original board is unchanged by certain nontrivial symmetries. A perfectly symmetric empty board has an orbit of size one.

## 3. Burnside's lemma: count orbits without listing them

Suppose a finite group $$G$$ acts on a finite set $$X$$. For $$g\in G$$, define the fixed-point set

$$
\operatorname{Fix}(g)=\{x\in X:g\cdot x=x\}.
$$

**Burnside's lemma**, sometimes called the Cauchy–Frobenius orbit-counting formula, states that the number of distinct orbits is

$$
|X/G|=\frac{1}{|G|}\sum_{g\in G}|\operatorname{Fix}(g)|.
$$

In words, the number of essentially different configurations equals the *average number of configurations left unchanged by a symmetry*. At first this may seem surprising: to count classes of objects, we count objects fixed by transformations. The advantage is that fixed-point counts can often be obtained from the cycle structure of each transformation, avoiding direct enumeration of every orbit.

We will first count all possible three-symbol 3 × 3 board colorings using X, O, and an empty symbol. This count deliberately includes **illegal game boards**, such as boards with nine X marks. It is a clean combinatorial problem; the legal-Tic-Tac-Toe count will be handled separately.

## 4. Counting all three-symbol patterns on a square grid

There are three choices for each of nine cells, so there are $$3^9=19,683$$ raw colorings without any restriction. To apply Burnside's lemma, we examine the eight symmetries one by one. A coloring is fixed under a transformation precisely when all cells in each cycle of that transformation share a common symbol. If a transformation partitions the nine cells into $$c(g)$$ cycles, it therefore fixes $$3^{c(g)}$$ colorings.

For the **identity**, all nine cells are independent. The fixed-coloring count is $$3^9=19,683$$.

A **90-degree rotation** groups the four corners into one four-cycle, groups the four edge-middle cells into another four-cycle, and leaves the center fixed. That is three cycles, giving $$3^3=27$$ invariant colorings. The 270-degree rotation has the same count.

A **180-degree rotation** pairs the four corners into two pairs, pairs the four edge-middle cells into two more pairs, and fixes the center. This yields five cycles and $$3^5=243$$ fixed colorings.

Each **reflection** fixes the three cells on its axis and interchanges the remaining six cells in three pairs. There are therefore six cycles, giving $$3^6=729$$ invariant colorings for each reflection. All four reflections have the same cycle count.

| Symmetry type | Number of group elements | Cycles per transformation | Fixed colorings per transformation |
|:--|--:|--:|--:|
| Identity | 1 | 9 | $$3^9=19,683$$ |
| 90° and 270° rotations | 2 | 3 | $$3^3=27$$ |
| 180° rotation | 1 | 5 | $$3^5=243$$ |
| Reflections | 4 | 6 | $$3^6=729$$ |

Applying Burnside's lemma gives

$$
\begin{aligned}
|X/D_4|
&=\frac{3^9+2\cdot3^3+3^5+4\cdot3^6}{8}\\
&=\frac{19,683+54+243+2,916}{8}\\
&=\boxed{2,862}.
\end{aligned}
$$

Thus the **19,683 arbitrary board colorings collapse to 2,862 geometric equivalence classes** under rotations and reflections. The result is exact, but it is not the number of legal Tic-Tac-Toe states. The distinction matters.

## 5. Why the legal-state answer is 765, not 2,862

Legal Tic-Tac-Toe positions obey additional restrictions. X moves first, so the counts of X and O differ by at most one, and X has either the same number of moves as O or exactly one more. A position containing a completed winning line must be reachable through a game that ended immediately when that line was formed. Two incompatible winning conditions cannot both arise in a legal game. Filtering arbitrary colorings by naive X/O counts is insufficient because it does not necessarily enforce the requirement that play stopped at the first win.

An exact reachability-based enumeration from the empty board gives **5,478 distinct legal board states**. Grouping those states under $$D_4$$ yields **765 symmetry classes**. These counts follow from the legal game rules, not from applying the unrestricted 2,862 formula and subtracting an obvious constant. We could apply Burnside's lemma again to the *restricted set* of reachable states, but its fixed-point counts would need to be recomputed within that restricted set.

There is also a distinction between positions and full games. A move sequence that reaches a board through one order of moves is a different history from another sequence that reaches the same board. Rotationally equivalent histories introduce yet another equivalence relation. Careless mixing of state counts, histories, and geometric orbits produces misleading statistics. Good combinatorics begins by stating exactly what objects are being counted.

## 6. Orbit–stabilizer: why some positions have fewer images

For an element $$x$$, the **stabilizer** is the subgroup of symmetries leaving it fixed:

$$
\operatorname{Stab}(x)=\{g\in G:g\cdot x=x\}.
$$

The orbit–stabilizer theorem gives

$$
|\operatorname{Orb}(x)|=\frac{|G|}{|\operatorname{Stab}(x)|}.
$$

For the square, $$|G|=8$$. A board without any nontrivial symmetry has a stabilizer of size one and an orbit of size eight. A board invariant under a particular reflection but no other nonidentity transformation may have a stabilizer of size two and an orbit of size four. The empty board is fixed by all eight symmetries, so it has a stabilizer of size eight and an orbit of size one. Orbit sizes therefore vary; simply dividing the number of boards by eight would be incorrect.

This is the geometric reason Burnside's lemma averages fixed points rather than assuming that every equivalence class has the same size. The same issue arises when counting colored necklaces, unlabeled graphs, or arrangements of identical components: symmetric arrangements have fewer distinct orientations than asymmetric ones.

## 7. Canonical states in an actual search algorithm

A direct computational use of symmetry is **canonicalization**. For each board, generate its eight transformed versions and choose a deterministic representative, such as the lexicographically smallest nine-character encoding. Instead of storing all equivalent board positions in a transposition table, store only the canonical representative and the current player. This reduces redundant memoized states when solving Tic-Tac-Toe.

A basic implementation can represent each symmetry as an index permutation. The principle is:

```python
def canonical(board, transformations):
    # Each permutation lists input indices in output-cell order.
    candidates = [
        tuple(board[i] for i in permutation)
        for permutation in transformations
    ]
    return min(candidates)
```

Here `transformations` must contain the eight valid index permutations of the square, including the identity. This is an algorithmic sketch, not a standalone generator of those permutations. A complete implementation should additionally verify that transformations preserve winning lines and legal moves. If an algorithm stores the preferred action along with a canonical state, it must transform that action back into the coordinates of the original board when returning a recommendation.

Symmetry reduction is especially useful when the same structural choice appears under many orientations. Yet canonicalization is not free: generating transformed states and finding their minimum consumes time. On a tiny board the overhead is negligible; on larger structured state spaces, one should benchmark whether the savings in repeated search outweigh the cost of computing canonical representations.

## 8. Connections to combinatorial optimization

The same modeling issue appears whenever an optimization problem contains interchangeable objects. Suppose several identical machines or facilities are assigned numbered labels in an integer-programming model. Relabeling identical machines may create a mathematically distinct variable assignment even though the physical allocation is unchanged. A solver may waste time exploring many symmetric versions of the same fundamental plan. **Symmetry-breaking constraints** can remove redundant representations, sometimes making exact optimization much faster.

But symmetry breaking must preserve at least one optimal representative from every meaningful equivalence class. Introducing a constraint that wrongly treats dissimilar machines as interchangeable can eliminate the actual optimum. This is analogous to mistakenly treating two Tic-Tac-Toe boards as equivalent when their player-to-move information or rules differ. Recognizing valid symmetries is therefore not just a computational trick; it is a modeling responsibility.

For students of group theory, Tic-Tac-Toe provides an accessible example of group actions and orbit counting. For programmers, it explains why canonical state representations improve search. For applied mathematicians, it provides a small laboratory for thinking about redundant solutions in larger discrete models. Burnside's lemma is memorable not because 2,862 is a remarkable number by itself, but because a sophisticated counting question becomes manageable once we study the symmetries that organize the objects.

## Further reading

1. Peter J. Cameron, *Combinatorics: Topics, Techniques, Algorithms*: group actions and enumeration.
2. Richard P. Stanley, *Enumerative Combinatorics, Volume 1*: fundamental counting principles and group actions.
3. [Tic-Tac-Toe state-space statistics](https://en.wikipedia.org/wiki/Game_complexity): legal positions, game trees, and symmetry reduction.
4. [The Rubik's Cube as a Finite Group](/blog/rubiks-cube-group-theory-combinatorics/): a companion article on permutation groups and invariants.

*Scope note: Burnside's formula above counts all 3-symbol square-grid colorings; the distinct legal-game count of 765 is stated separately.*
