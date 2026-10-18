---
title: 'Minimax and Alpha–Beta Pruning: From Mathematical Recursion to a Python Game
  Solver'
description: Deriving adversarial search, implementing a correct Tic-Tac-Toe solver,
  and explaining how alpha–beta pruning avoids unnecessary branches.
pubDate: '2026-10-18'
tags:
- Minimax
- Alpha Beta Pruning
- Python
- Algorithms
- Artificial Intelligence
draft: false
---

*By Md Arif Hossain · Mathematical algorithms and implementation*

![A minimax search tree with an illustrative pruned branch](/images/blog/minimax-alpha-beta.svg)

How should an algorithm make a decision when another intelligent decision-maker is actively trying to defeat it? Traditional optimization often assumes the environment is fixed or stochastic. Adversarial search adds another ingredient: the next action may be selected by an opponent who pursues an opposing objective. The **minimax algorithm** addresses this situation by evaluating each possible decision under the assumption that future opposition will act optimally against us. **Alpha–beta pruning** makes the search more efficient by eliminating branches that cannot alter the eventual decision.

The conceptual foundation is remarkably short, but a robust implementation requires care. We need a precise terminal-state test, a convention for utility, a policy for alternating players, a representation of the state, and a correct interpretation of the values returned by recursive calls. This article derives the recurrence, demonstrates a full Python implementation for Tic-Tac-Toe, and explains why pruning can reduce computation without changing the optimal action.

## 1. The optimization problem hidden in the game

Let $$S$$ be the collection of legal game states and $$A(s)$$ the legal actions from state $$s$$. The transition $$T(s,a)$$ gives the state reached after action $$a$$. Terminal states $$z\in Z\subseteq S$$ receive a utility $$u(z)$$ from the viewpoint of the maximizing player X. In a win/draw/loss formulation, take $$u(z)\in\{-1,0,+1\}$$. An optimal maximizing player searches for an action that performs best given that the opponent O will choose actions that make the outcome as unfavorable as possible for X.

For a terminal state, the state value is already known. For a nonterminal state, its value is recursively determined by whose turn it is:

$$
V(s)=\begin{cases}
 u(s), & s\in Z,\\
 \displaystyle\max_{a\in A(s)} V(T(s,a)), & \text{X to move},\\
 \displaystyle\min_{a\in A(s)} V(T(s,a)), & \text{O to move}.
\end{cases}
$$

This expression is closely related to Bellman recurrences in dynamic programming. The difference is that alternating max and min operators represent conflicting decision-makers, rather than a single controller choosing every action. The mathematical soundness comes from backward induction: when the game is finite and the future value of every child state is correctly computed, choosing max or min at the parent is exactly what rational play requires.

## 2. The game tree as a computational object

Start with an empty 3 × 3 board. X has nine choices. After one move, O has eight. After two moves, X has seven, and so on. We can represent this as a rooted directed tree, where each edge is a legal move and each node is the board state after a move. Terminal nodes are leaves representing completed games. If no games stopped early, the count of move orders through nine moves would be $$9!$$. The real game stops when a line of three is completed, so the exact collection of complete games is smaller.

The usual abstract complexity statement for minimax is $$O(b^d)$$ time for branching factor $$b$$ and remaining depth $$d$$, with $$O(d)$$ recursion-stack space for a depth-first implementation that constructs successors incrementally. The Tic-Tac-Toe branching factor falls after every move; therefore a single constant $$b$$ is only a rough approximation. Also, different move orders can reach the same board. A *transposition table* stores the value of an already evaluated state and avoids redundant work when the same state is encountered through another history.

## 3. A correct, compact Python implementation

We will represent the board as an immutable tuple of nine characters in row-major order, using `'X'`, `'O'`, or `'.'`. This supports caching, simplifies equality checks, and avoids accidental mutation between recursive branches. The following code is designed for valid positions of standard Tic-Tac-Toe with X moving first.

```python
from functools import lru_cache

LINES = (
    (0, 1, 2), (3, 4, 5), (6, 7, 8),
    (0, 3, 6), (1, 4, 7), (2, 5, 8),
    (0, 4, 8), (2, 4, 6),
)


def outcome(board):
    """Return +1 for X win, -1 for O win, 0 for draw, None otherwise."""
    for a, b, c in LINES:
        if board[a] != "." and board[a] == board[b] == board[c]:
            return 1 if board[a] == "X" else -1
    return 0 if "." not in board else None


def play(board, index, symbol):
    assert board[index] == "."
    new_board = list(board)
    new_board[index] = symbol
    return tuple(new_board)


@lru_cache(maxsize=None)
def minimax(board, player):
    result = outcome(board)
    if result is not None:
        return result

    next_player = "O" if player == "X" else "X"
    values = [
        minimax(play(board, i, player), next_player)
        for i in range(9)
        if board[i] == "."
    ]
    return max(values) if player == "X" else min(values)


def best_move(board, player):
    if outcome(board) is not None:
        return None
    next_player = "O" if player == "X" else "X"
    options = [
        (i, minimax(play(board, i, player), next_player))
        for i in range(9)
        if board[i] == "."
    ]
    target = max(score for _, score in options) if player == "X" else min(
        score for _, score in options
    )
    return next(i for i, score in options if score == target)


empty = (".",) * 9
print("Game value:", minimax(empty, "X"))  # 0: a draw under perfect play
print("One optimal first move:", best_move(empty, "X"))
```

The code returns the value **0** for the initial board. `best_move` returns the first equally optimal move encountered under its row-major tie-breaker; that choice should not be interpreted as the only optimal opening. The outcome evaluator deliberately checks terminal conditions before trying successors. That detail is essential: once a player has won, no further move is legal, even if empty squares remain.

## 4. Why the implementation uses memoization

The decorator `@lru_cache(maxsize=None)` memoizes the result of `minimax(board, player)`. Because `board` is a tuple and `player` is a string, both arguments are hashable and can serve as cache keys. Suppose X reaches a particular nonterminal board after one ordering of moves; the same marked arrangement may be reached through another move order. Without caching, the recursion recomputes the same continuation game. With caching, it immediately returns the previously obtained value.

This is dynamic programming on a directed acyclic state graph rather than naive enumeration of every history. The number of unique legal boards in ordinary Tic-Tac-Toe is **5,478**, far fewer than the number of full move sequences. A legitimate state representation must still include all information needed for future legal decisions. Here the board and current player suffice under the standard rules. In a game with repetition penalties, move clocks, or hidden history-dependent rules, using only a board image as a cache key might be incorrect.

## 5. Alpha and beta: bounds that make search faster

Minimax examines every relevant continuation before determining the optimal value. But sometimes we can prove that a continuation cannot matter, even without evaluating all its descendants. That is the key idea behind alpha–beta pruning. Maintain two bounds during the depth-first traversal:

- $$\alpha$$ is a lower bound on the value that MAX can already guarantee along the current search path.
- $$\beta$$ is an upper bound on the value that MIN can already enforce along the current search path.

At a MAX node, update $$\alpha$$ when a better child has been found. At a MIN node, update $$\beta$$ when a worse child for MAX has been found. If at any point $$\alpha\geq\beta$$, remaining children at that node need not be explored for the purpose of selecting the root's optimal action. The ancestor has a competing choice at least as good as the current branch can offer.

Here is an alpha–beta version of the same recurrence. It uses the same `outcome`, `play`, and `LINES` functions as the preceding listing:

```python
def alphabeta(board, player, alpha=float("-inf"), beta=float("inf")):
    result = outcome(board)
    if result is not None:
        return result

    next_player = "O" if player == "X" else "X"
    if player == "X":
        value = float("-inf")
        for i in range(9):
            if board[i] != ".":
                continue
            value = max(value, alphabeta(play(board, i, "X"), next_player,
                                         alpha, beta))
            alpha = max(alpha, value)
            if alpha >= beta:
                break
        return value

    value = float("inf")
    for i in range(9):
        if board[i] != ".":
            continue
        value = min(value, alphabeta(play(board, i, "O"), next_player,
                                     alpha, beta))
        beta = min(beta, value)
        if alpha >= beta:
            break
    return value


assert alphabeta((".",) * 9, "X") == 0
```

An important subtlety is that a value returned from a subtree that was cut off is useful in the context of the inherited bounds; it should not automatically be stored as an *exact* game value in a transposition table. More advanced engines distinguish exact values from lower and upper bounds. The earlier memoized version has no such issue because it fully evaluates every encountered state before caching the resulting minimax score.

## 6. A hand-worked pruning example

Imagine a MAX node with two possible actions, A and B. Evaluating A completely gives a value of 3, so the root's current best guarantee becomes $$\alpha=3$$. We then examine B, whose next node belongs to MIN. Suppose the first child of B has value 2. MIN can select that child, so the value of B can be at most 2: $$\beta\leq2$$. Because $$\beta\leq2<3\leq\alpha$$, B cannot improve MAX's already available option A. The remaining descendants of B may be skipped.

The numeric values 3 and 2 here are **illustrative utility values** from a generic game tree rather than the $$-1,0,+1$$ scale of ordinary Tic-Tac-Toe. The logic of pruning is unchanged under either scale. What matters is the ordering of alternatives and the guarantee already established for an ancestor. Pruning is not a guess that the discarded branches are uninteresting; it is a mathematical certificate that those branches cannot affect the best choice under the current bounds.

## 7. Move ordering and computational savings

Alpha–beta pruning's performance depends strongly on which moves are visited first. If excellent moves are evaluated early at MAX nodes and poor-for-MAX moves are evaluated early at MIN nodes, the bounds tighten quickly. In an idealized uniform game tree with perfect move ordering, the number of leaf evaluations can approach the order of $$b^{d/2}$$ rather than $$b^d$$, a dramatic improvement. In the worst ordering, little pruning may occur, leaving performance close to ordinary minimax.

This observation creates an interesting secondary optimization problem: how should the algorithm order actions before searching them? A cheap heuristic may examine immediate wins, immediate blocks, center-control patterns, or previously successful moves first. Such ordering does not compromise the correctness of full-depth minimax with alpha–beta pruning; it changes the work required to obtain the same answer. In large games, well-designed heuristics and data structures can be as important as the theoretical recurrence.

## 8. Evaluation functions when a full search is impossible

A complete search is feasible for Tic-Tac-Toe, but not for most serious board games at practical time limits. A depth-limited search stops after a chosen number of plies and estimates the value of the current position. Let $$\phi_j(s)$$ denote a feature of state $$s$$, such as the number of unblocked winning lines or strategically important squares controlled by X. A simple evaluation function might take the form

$$
\widehat V(s)=\sum_{j=1}^{p}w_j\phi_j(s).
$$

The weights $$w_j$$ express how strongly each feature predicts a favorable outcome. Unlike a complete terminal search, the heuristic estimate may be wrong. It is therefore essential to distinguish **exact algorithmic optimality** from **approximate evaluation**. Alpha–beta pruning preserves exact minimax results *relative to the searched tree and leaf evaluation scheme*; it does not magically make an inaccurate depth-limited evaluator exact for the original full game.

This is a useful lesson for machine learning and operations research. The quality of an optimization procedure is not the same as the quality of the objective or predictive model supplied to it. A solver can optimize a flawed proxy objective perfectly and still produce a poor real-world decision. Modeling assumptions deserve at least as much attention as algorithmic sophistication.

## 9. Practical testing and mathematical guarantees

Before using a search implementation, test invariants and boundary conditions. The empty board should return 0 under optimal play. A completed X line should return +1, and an O line should return −1. A full drawn board should return 0. The algorithm should never place a symbol on an occupied square and should not continue searching after a terminal outcome. For a sample of legal states, results from full minimax and full-window alpha–beta search should agree.

A further experiment is to instrument each algorithm with a counter of evaluated nodes and compare the totals under different action orderings. Students often find that the most insightful part of the experiment is not the final score but *why* a bound becomes strong enough to prune a branch. The resulting trace teaches the proof of the algorithm more effectively than memorizing pseudocode alone.

Minimax is a small but foundational example of rigorous decision-making under strategic opposition. It converts a verbal notion—“think ahead and assume your opponent responds intelligently”—into a recurrence with a precisely defined value function. Alpha–beta pruning then shows how logical bounds can turn that recurrence into a more computationally efficient process without sacrificing the result. Together, they form a bridge between abstract game theory, recursive programming, dynamic programming, and practical artificial intelligence.

## References

1. [Stanford CS221, Games and alpha–beta pruning](https://stanford-cs221.github.io/spring2026/modules/).
2. [CS221 state-based models notes](https://stanford.edu/~shervine/teaching/cs-221/cheatsheet-states-models/), including minimax and pruning summaries.
3. Russell, Stuart, and Peter Norvig. *Artificial Intelligence: A Modern Approach*, chapter on adversarial search.
4. Knuth, Donald E., and Ronald W. Moore (1975), “An Analysis of Alpha-Beta Pruning,” *Artificial Intelligence* 6(4): 293–326.

*Reproducibility note: The Python listings are independent examples for educational use. Their state model assumes legal Tic-Tac-Toe positions with X moving first.*
