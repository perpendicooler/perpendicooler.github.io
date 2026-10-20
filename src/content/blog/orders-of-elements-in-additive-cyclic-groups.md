---
title: 'When Modular Arithmetic Became a Wheel: My First Journey from Group Theory to the LCM'
description: 'A personal mathematical journey from noticing patterns in additive cyclic groups to drawing residue wheels, discovering an LCM-based formula for element order, and writing my first academic manuscript.'
pubDate: '2022-10-21'
tags:
  - Group Theory
  - Abstract Algebra
  - Number Theory
  - Mathematical Visualization
  - Cyclic Groups
  - Undergraduate Research
  - Mathematical Writing
draft: false
---

*By Md Arif Hossain*

![Two residue-wheel representations of addition modulo 10, comparing one complete ten-step orbit with repeated addition by four.](/images/blog/modular-wheels-z10-steps.svg)

*Figure 1. The same group, $\mathbb Z_{10}$, can behave very differently depending on the step size. Adding $[1]$ visits all ten residues; adding $[4]$ returns to zero after five additions.*

I did not begin this work with a theorem in mind. I began with a pattern I kept noticing while studying group theory.

An element of a finite group can be combined with itself until it returns to the identity. In the additive group of integers modulo $n$, that idea looks especially simple: start at zero, keep adding the same number, and eventually come back to zero. But **why do some numbers return in two or three steps while others need to travel through the entire group?**

That question stayed with me. I first made sense of it by drawing the residue classes in a circle. Later, after several rounds of examples, discussions, and revisions, I realized that the **least common multiple** gave exactly the number I was looking for. The wheel helped me *see* the journey; the LCM helped me *calculate* when the journey would end.

This post is the story of how I arrived at that connection, how I learned to express it mathematically, and why these notes became my first serious attempt at academic research writing.

> **The question that started it all:** If I repeatedly add $[a]$ in $\mathbb Z_n$, how many additions will it take to reach $[0]$ again?

## 1. Learning group theory, and noticing a recurring pattern

When I started reading about groups, I was fascinated by the idea that a relatively small set of axioms—closure, associativity, identity, and inverses—could describe so many different mathematical structures. In additive cyclic groups, I could follow those abstract ideas through simple computations. (For the conventional definitions and results, see Gallian [1], Finston and Morandi [2], and Clapham and Nicholson [3].)

Take the group

$$
\mathbb Z_{10}=\{[0],[1],[2],\ldots,[9]\},
$$

where the operation is addition modulo $10$. The identity is $[0]$. If I repeatedly add $[1]$, I move through every residue before coming back to where I started:

$$
[0]\to[1]\to[2]\to\cdots\to[9]\to[0].
$$

That takes ten steps. But with $[2]$, the path is shorter:

$$
[0]\to[2]\to[4]\to[6]\to[8]\to[0].
$$

And with $[5]$, it is shorter still:

$$
[0]\to[5]\to[0].
$$

These were not isolated calculations. They seemed to be different versions of the same phenomenon: each chosen step size produced a regular orbit, and the orbit had a definite length.

The algebraic name for this length is the **order of the element**. For $[a]\in\mathbb Z_n$,

$$
\operatorname{ord}_n([a])
=\min\{k\geq1: k[a]=[0]\}.
$$

But at that stage I was more interested in what the repeated additions *looked like* than in memorizing a formula for the answer.

## 2. My first idea: put the residue classes on a wheel

I started arranging the residues around a circle, like positions on a clock. One full circle represented the modulus, and an arrow represented adding a fixed element. For each step size $a$, I started at $[0]$ and followed the arrows until I returned to it.

Instead of writing ten separate calculations, I could draw a single **residue wheel**. What initially felt like a long chain of additions became a repeating geometric pattern.

As illustrated in Figure 1 above, the same group can produce very different cycles depending on the step size.

Another pair of wheels showed an even more striking difference: adding $[2]$ produced two five-step cycles, while adding $[5]$ produced five two-step cycles.

![Residue wheels for modulo ten showing two cycles with step two and five cycles with step five.](/images/blog/modular-wheels-z10-partitions.svg)

*Figure 2. Changing only the step size rearranges the cycle structure. In each diagram, the colored paths partition all residues; the cycle containing zero determines the order of the chosen element.*

This was the part I enjoyed most. The wheel was not just a way to draw modular arithmetic; it gave me a way to think about **why** the same modulus could contain elements of different orders.

## 3. The odd-number examples felt natural—until I tried more cases

Some of my earliest diagrams involved odd moduli. I found it easy to follow the cycle, especially when the chosen step moved through every residue before returning to zero.

For instance, in $\mathbb Z_7$, repeatedly adding $[2]$ gives

$$
[0]\to[2]\to[4]\to[6]\to[1]\to[3]\to[5]\to[0].
$$

Seven steps, seven residues, one complete cycle.

But not every odd modulus behaves that way. With $[6]$ in $\mathbb Z_9$,

$$
[0]\to[6]\to[3]\to[0],
$$

so the first return takes only three steps. The remaining residues form two other three-step cycles.

![Wheel diagrams for the odd moduli seven and nine showing that one prime modulus can produce a full cycle while a composite odd modulus splits into several cycles.](/images/blog/modular-wheels-odd-moduli.svg)

*Figure 3. An odd modulus does not by itself determine the length of a cycle. The selected step matters.*

When I began exploring even moduli, I could see another feature of the diagrams: some step sizes kept landing on alternating positions, producing smaller cycles, while other step sizes visited the whole wheel. In $\mathbb Z_8$,

$$
[0]\xrightarrow{+2}[2]\xrightarrow{+2}[4]
\xrightarrow{+2}[6]\xrightarrow{+2}[0],
$$

but

$$
[0]\xrightarrow{+3}[3]\xrightarrow{+3}[6]
\xrightarrow{+3}[1]\to[4]\to[7]\to[2]\to[5]\to[0].
$$

![Two modulo eight residue-wheel diagrams: adding two produces two four-cycles while adding three produces one eight-cycle.](/images/blog/modular-wheels-even-moduli.svg)

*Figure 4. Two step sizes in the same even modulus produce different orbit lengths.*

At first, I was looking for a rule that would explain the odd cases and the even cases separately. But the more examples I drew, the clearer it became that the distinction was not simply **odd versus even**. The real issue was how the step size and the modulus fit together.

## 4. Thinking through the problem with Dr. Chandrani Nag

During this period, I had opportunities to discuss my developing ideas with **Dr. Chandrani Nag**. Those discussions were part of the process of turning an observation into a mathematical question that I could formulate and defend.

I kept returning to the diagrams between discussions. I tried different moduli and different step sizes, drew more arrows, counted how many positions were visited, and compared the results. I could see a pattern, but I wanted something better than a table of examples: I wanted a single explanation that worked for every modulus.

The wheel made the behavior visible. What I still needed was a way to calculate the first return *without following every arrow*.

## 5. The breakthrough for me: the first common multiple

One day, I looked again at a wheel in $\mathbb Z_{10}$, this time with step size $4$.

The residues were

$$
[0]\to[4]\to[8]\to[2]\to[6]\to[0].
$$

But instead of looking only at their remainders, I wrote down the ordinary integer totals behind the steps:

$$
4,\quad 8,\quad 12,\quad 16,\quad 20.
$$

At the fifth step, the accumulated total is $20$, and $20$ is divisible by $10$. More importantly, it is the **first positive number that is both a multiple of $4$ and a multiple of $10$**.

That number is the least common multiple:

$$
\operatorname{lcm}(4,10)=20.
$$

Since each jump contributes $4$, the number of jumps required to reach $20$ is

$$
\frac{20}{4}=5.
$$

That matched exactly what I had counted on the wheel.

![Diagram linking the modulo ten step-four residue wheel to the accumulated integer totals and their least common multiple twenty.](/images/blog/modular-wheel-lcm-breakthrough.svg)

*Figure 5. Two descriptions of the same return: five jumps on the residue wheel and the first common multiple $20=5\cdot4=2\cdot10$.*

This connection changed how I approached the problem. The wheel told me *where* each addition went; the LCM told me *when* it must return. I no longer needed to draw every possible wheel to calculate an order.

For example, in $\mathbb Z_{10}$:

| Chosen element | First common multiple | Number of jumps | Order |
|---|---:|---:|---:|
| $[2]$ | $\operatorname{lcm}(2,10)=10$ | $10/2$ | $5$ |
| $[3]$ | $\operatorname{lcm}(3,10)=30$ | $30/3$ | $10$ |
| $[4]$ | $\operatorname{lcm}(4,10)=20$ | $20/4$ | $5$ |
| $[5]$ | $\operatorname{lcm}(5,10)=10$ | $10/5$ | $2$ |
| $[7]$ | $\operatorname{lcm}(7,10)=70$ | $70/7$ | $10$ |

The expressions in the middle column were exactly what I had been seeking: a way to replace a long sequence of arrows with a direct calculation.

## 6. From an observation to a general mathematical statement

The formula that emerged from this reasoning is

$$
\boxed{\operatorname{ord}_n([a])
=\frac{\operatorname{lcm}(a,n)}{a}},
\qquad 1\leq a<n.
$$

Here is the argument that made the observation into a proof.

The element $[a]$ returns to $[0]$ after $k$ additions exactly when

$$
k[a]=[0],
$$

or equivalently

$$
ka\equiv0\pmod n.
$$

In ordinary integer arithmetic, that means

$$
n\mid ka.
$$

Now $ka$ is necessarily a positive multiple of $a$. For it also to be divisible by $n$, it must be a **positive common multiple of $a$ and $n$**. The smallest such value is $\operatorname{lcm}(a,n)$. Therefore the smallest possible number of additions is precisely

$$
\boxed{k=\frac{\operatorname{lcm}(a,n)}{a}}.
$$

The classical identity

$$
\operatorname{lcm}(a,n)\gcd(a,n)=an
$$

then gives the more familiar expression

$$
\boxed{\operatorname{ord}_n([a])=
\frac{n}{\gcd(a,n)}}.
$$

The gcd expression also covers $[0]$, whose order is $1$, since $\gcd(0,n)=n$. The LCM quotient above is used for nonzero representatives because division by $a=0$ would be undefined.

The formula is standard in cyclic group theory and elementary number theory (see [1] and [4]). What made the argument memorable for me was the route from the **first common multiple**, through **the number of jumps**, to **the orbit on the wheel**.

## 7. What the wheels were really showing: cycles and generators

After I understood the formula, the diagrams became even more interesting.

For a fixed $a$, consider the map

$$
T_a([r])=[r+a]
\qquad\text{on }\mathbb Z_n.
$$

Every residue has one successor, and the operation can be undone by subtracting $[a]$. So the arrows divide the residues into disjoint directed cycles.

The length of a cycle is the first positive $k$ such that

$$
[r+ka]=[r]
\quad\Longleftrightarrow\quad
ka\equiv0\pmod n.
$$

That is the same condition used in the order formula. Consequently,

$$
\boxed{\text{length of each cycle}=\frac{n}{\gcd(a,n)}}
$$

and, because there are $n$ residue classes altogether,

$$
\boxed{\text{number of cycles}=\gcd(a,n)}.
$$

For example, in $\mathbb Z_{12}$:

- Adding $[3]$ produces $\gcd(3,12)=3$ cycles of length $12/3=4$.
- Adding $[4]$ produces $\gcd(4,12)=4$ cycles of length $12/4=3$.

![Side-by-side modular twelve residue wheels, one for adding three and another for adding four, with their distinct cycle decompositions.](/images/blog/modular-wheels-z12-steps.svg)

*Figure 6. The greatest common divisor counts the cycles; the order gives the number of steps around each cycle.*

The pictures also explain **generators**. A residue $[a]$ generates the entire group if its orbit contains all $n$ residues, which happens exactly when

$$
\gcd(a,n)=1.
$$

Thus the wheel for $[3]$ in $\mathbb Z_8$ forms one full cycle, but the wheel for $[2]$ in the same group splits into two cycles. The number of generators of $\mathbb Z_n$ is $\varphi(n)$, where $\varphi$ is Euler's totient function [4].

I had begun by counting arrows. By this point, I could connect those arrows to group order, cyclic subgroups, greatest common divisors, least common multiples, and the structure of permutations.

## 8. Discovering the result was already known

When I looked further into the literature, I learned that the LCM and gcd formulas were already established results. My calculation was not a new theorem.

I remember that the important part for me was how I had arrived at it: I had not started from the closed formula and worked backward. I started with examples, drew wheels, kept testing the cases that puzzled me, and eventually found the LCM explanation for myself.

Discovering that a result already exists changes what can be claimed about it, but it does not erase the learning involved in reaching it independently. I continued to work on the diagrams, the proof, and the writing. I wanted to turn the experience into something coherent enough that another student could follow the same path from a picture to a mathematical statement.

**This became one of my first attempts at writing mathematics in the form of an academic manuscript.** It taught me that finding a pattern is only the beginning: the real work is explaining why the pattern holds, testing its limits, reading what others have already established, and communicating the argument clearly.

## 9. Checking the calculation computationally

I also wanted a way to check that the formula agreed with direct repeated addition. In Python, the two calculations are simple:

```python
from math import gcd, lcm

def order_by_lcm(a, n):
    if a == 0:
        return 1
    return lcm(a, n) // a

def order_by_wheel(a, n):
    residue = 0
    for steps in range(1, n + 1):
        residue = (residue + a) % n
        if residue == 0:
            return steps
    raise RuntimeError("Unexpected non-return in a finite group")

for n in range(2, 501):
    for a in range(n):
        assert order_by_lcm(a, n) == order_by_wheel(a, n)
```

The complete verification accompanying the revised mathematical paper checks **125,249 residue–modulus pairs** with $2\le n\le500$ and $0\le a<n$. All comparisons pass. Computational checks are useful for finding implementation mistakes, while the divisibility argument above explains why the formula is valid for all positive moduli.

## 10. Why I still remember this as the beginning

Looking back, what stays with me is not just the formula. It is the sequence of questions that led to it.

I started reading group theory. I noticed that repeated addition produced a pattern. I arranged the residues on wheels. Some cases were immediately clear; others made me redraw the paths and reconsider what I was counting. I discussed the developing idea with Dr. Chandrani Nag and kept thinking about it between those conversations. Finally, I recognized that the first return was the first common multiple—and dividing that number by the step size gave the order.

The result was classical, but the experience was personal. It was one of the first times I tried to turn curiosity into a mathematical argument and then into a piece of academic writing.

That is why I wanted to preserve the wheels. They represent the way I first understood the problem, and they remind me that mathematics often begins with something modest: **draw a picture, ask what repeats, and keep asking why.**

---

**[Read the independent mathematical manuscript (PDF)](/Orders_of_Elements_Additive_Cyclic_Groups_Manuscript.pdf)**

**Related presentation:** In August 2023 I gave a presentation titled *The Generalization form of the order of an element in a group under addition modulo* at ICSTEME. [View the presentation certificate (PDF)](/Additive_Group_Order_Presentation_Certificate_2023.pdf). The linked mathematical manuscript above is a separate, later technical study; it is not a peer-reviewed conference publication.

### References

1. Gallian, J. A. (2021). *Contemporary Abstract Algebra*, 10th ed. Chapman and Hall/CRC.
2. Finston, D. R., and Morandi, P. J. (2014). *Abstract Algebra: Structure and Application*. Birkhäuser/Springer. [DOI: 10.1007/978-3-319-04498-9](https://doi.org/10.1007/978-3-319-04498-9).
3. Clapham, C., and Nicholson, J. (2014). *The Concise Oxford Dictionary of Mathematics*, 5th ed. Oxford University Press.
4. Hardy, G. H., and Wright, E. M. (1979). *An Introduction to the Theory of Numbers*, 5th ed. Oxford University Press.
