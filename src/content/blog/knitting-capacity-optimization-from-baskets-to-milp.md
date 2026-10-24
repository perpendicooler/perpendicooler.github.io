---
title: 'When the Fastest Machine Is Not the Best Choice: A Knitting Allocation Optimization Problem'
description: 'How development-stage booking SMVs, bulk pre-study measurements, machine capacity, product priorities and delivery dates led me from manual production plans to mathematical optimization.'
pubDate: '2026-10-20'
updatedDate: '2026-10-24'
tags:
  - Operations Research
  - Mathematical Optimization
  - Production Planning
  - Mixed-Integer Programming
  - Manufacturing Analytics
  - Research Notes
draft: false
---

*Md Arif Hossain · Mathematics graduate and Business Intelligence Analyst · October 2026*

![An illustrative machine-capacity allocation system with workload baskets and product transfers](/images/blog/knitting-optimization-animated.svg)

A product can run successfully on the machine selected during development. But that does not automatically make that machine the best choice when thousands of products must share a limited production calendar.

This was the question that made me look differently at knitting plans. At the **development stage**, a product is tested and assigned a **booking SMV** on one or more compatible machine brands. Later, during **bulk pre-study**, the technical team observes a more relevant machine-specific processing time. The planning team then chooses a machine group and a knitting window for that product.

Each decision can be reasonable on its own. The difficulty appears when hundreds of products compete for the same machines, different buyers have different priorities, and the machines that look fastest are already heavily loaded. I wanted to understand whether a mathematical model could challenge an existing allocation without ignoring everything the planning team must respect.

In this article I explain that process with simple mathematics, a **small independently solved example**, and the limitations I have learned from developing the optimizer. All product IDs, quantities, machine-group counts, FOB figures and dates in the worked examples are **invented for teaching**. They are not actual customer orders, machine inventories or measured factory savings. The mathematical structure reflects the kinds of planning decisions I work with, but the numerical case is synthetic.

## 1. Start in product development, not with the solver

Before optimization, we need to understand where the input numbers come from.

During **development**, a product may have several machine-brand alternatives. The technical team records whether each alternative is physically suitable and estimates its **booking SMV**: the standard minutes needed to produce one piece on that machine group.

During **bulk pre-study**, the same product may behave differently. Yarn, construction, gauge, machine settings and the actual operating method can change the expected time. The resulting **bulk/pre-study SMV** is the more relevant estimate for the allocation under consideration.

For a fictional product P1, the information might look like this:

| Eligible machine group | Development booking SMV | Bulk/pre-study SMV | What changed? |
|---|---:|---:|---|
| Group A · 12 GG | 65 | 70 | Bulk is slower than the development estimate |
| Group B · 12 GG | 60 | 45 | Bulk pre-study shows a substantial improvement |

All SMVs are **minutes per product**. P1 requires 24 pieces. At the bulk-stage rates:

$$
\begin{aligned}
\text{P1 on A}&=24\times70=1{,}680\text{ min},\\
\text{P1 on B}&=24\times45=1{,}080\text{ min}.
\end{aligned}
$$

Moving all 24 pieces from A to B would save **600 processing minutes** *if B had enough capacity before the deadline*. That last condition is the important part. We cannot choose a machine using SMV alone.

A blank SMV is not zero. A feeder limitation or incompatible gauge means the option may be **ineligible**, regardless of how appealing its booking estimate looks.

## 2. Turn machine counts into available minutes

I use the same simple capacity calculation for each machine group:

$$
\boxed{C^{\mathrm{nominal}}_j=N_j\times H\times D}
$$

where $N_j$ is the number of available machines in group $j$, $H$ is working minutes per machine per day, and $D$ is the number of working days.

Assume two shifts, each with 8 regular hours and 3 hours of approved overtime:

$$
H=2(8+3)\times60=1{,}320\text{ minutes per day}.
$$

For **9 hypothetical machines** and **26 working days**:

$$
C^{\mathrm{nominal}}=9\times1{,}320\times26
=\boxed{308{,}880\text{ minutes}}.
$$

If I adopt an **85% effective-capacity planning assumption**, I can plan against

$$
C^{\mathrm{effective}}=0.85\times308{,}880
=\boxed{262{,}548\text{ minutes}}.
$$

That assumption must be stated explicitly: the 85% factor here reduces nominal available minutes to an illustrative planning budget. It must **not** be applied again if the capacity figure already incorporates the same losses or if the SMV was constructed in a way that makes this double-counting.

### What if I have ten different machine groups?

Here is an **entirely fictional inventory**. It uses the same 26-day, 1,320-minute, 85%-planning assumptions. A real model would use verified machine availability and separate 5/7/12 GG compatibility.

| Group | Gauge example | Example machines | Nominal monthly minutes | Effective minutes (85%) |
|---|---|---:|---:|---:|
| G01 | 12 GG | 9 | 308,880 | 262,548 |
| G02 | 12 GG | 6 | 205,920 | 175,032 |
| G03 | 12 GG | 8 | 274,560 | 233,376 |
| G04 | 12 GG | 5 | 171,600 | 145,860 |
| G05 | 5 GG | 7 | 240,240 | 204,204 |
| G06 | 5 GG | 4 | 137,280 | 116,688 |
| G07 | 7 GG | 6 | 205,920 | 175,032 |
| G08 | 7 GG | 3 | 102,960 | 87,516 |
| G09 | 5/7 GG | 5 | 171,600 | 145,860 |
| G10 | 12 GG | 4 | 137,280 | 116,688 |

A group having 262,548 minutes available does **not** mean that every product can use them. The product must be compatible with the gauge and technical configuration, and the free minutes must occur during its permitted dates.

I also separate a **planning fence** from a physical limit. For instance, 82% or 88% target occupancy can be a useful early-warning threshold. Exceeding that target is not automatically the same thing as exceeding a machine's true feasible working capacity. Those two quantities should never be given the same meaning in the optimizer.

## 3. A small, realistic flow: four products and two machine groups

To make the calculation easy to follow, consider a **separate miniature example** with two compatible **12 GG machine groups**, which I call **A and B**. Each group has **one hypothetical machine** (these are *not* the G01–G10 inventory counts above). We schedule only **2 November and 3 November 2026**.

The available daily planning minutes for each machine group are

$$
C_{jt}=1\times1{,}320\times0.85
=\boxed{1{,}122\text{ min per day}}.
$$

The four fictional product lots are:

| Product | Required pieces | Fictional FOB | Priority score: pieces × FOB | FRI | Latest knitting day |
|---|---:|---:|---:|---|---|
| P1 | 24 | 9.00 | 216 | 5 Nov | 3 Nov |
| P2 | 18 | 6.00 | 108 | 5 Nov | 3 Nov |
| P3 | 12 | 5.00 | 60 | 5 Nov | 3 Nov |
| P4 | 14 | 12.00 | 168 | 3 Nov | **2 Nov** |

For this example, development and bulk information is:

| Product | Group A: booking → bulk SMV | Group B: booking → bulk SMV |
|---|---|---|
| P1 | 65 → **70** | 60 → **45** |
| P2 | 55 → **50** | 72 → **70** |
| P3 | 60 → **62** | 58 → **55** |
| P4 | **Not compatible** | 88 → **80** |

All values are minutes per product. P4 has an equipment/technical restriction: putting it on A is **forbidden**, not simply less efficient. The example assumes all four products are ready to knit on 2 November, and that one day is reserved after knitting for downstream preparation. This is why P4, whose FRI is 3 November, must finish knitting by 2 November.

Notice the tension already:

- P1 benefits greatly from B's bulk pre-study SMV, but B is needed for P4's urgent delivery.
- P3 also prefers B; however, it can run on A at a small time penalty.
- P2 is better on A.
- **FOB × quantity is a priority indicator**, but a near deadline is a **hard calendar requirement**, not a score that can be traded away casually.

## 4. The planning team's original allocation

Imagine the planner has made the following valid draft after receiving the bulk SMVs:

| Day | Machine group | Product allocation | Bulk minutes used |
|---|---|---|---:|
| 2 Nov | A | P2: 18 products | 18 × 50 = **900** |
| 2 Nov | B | P4: 14 products | 14 × 80 = **1,120** |
| 3 Nov | A | P1: 16 products | 16 × 70 = **1,120** |
| 3 Nov | B | P1: 8; P3: 12 products | 8 × 45 + 12 × 55 = **1,020** |

Every product is accounted for. Every group is below 1,122 minutes each day, and P4 finishes on its required date. This is a **feasible plan**; there is nothing inherently careless about it.

Total modeled processing time is

$$
M_{\mathrm{planner}}=900+1{,}120+1{,}120+1{,}020
=\boxed{4{,}160\text{ minutes}}.
$$

There is a separate and important comparison: if we value these **same machine assignments** using the older **booking** SMVs, the prediction would be **4,438 minutes**. Updating the SMV estimates therefore changes the forecast by 278 minutes. **That is an estimate revision, not an optimization saving.**

Now I can ask my actual question: *Keeping the products, bulk SMVs, machine restrictions, daily minutes and dates exactly the same, could a different allocation use fewer processing minutes?*

## 5. What the mathematical optimization changes

I solved this little example as an **integer allocation problem with daily capacity and date constraints**. The resulting plan is:

| Day | Machine group | Optimized product allocation | Bulk minutes used |
|---|---|---|---:|
| 2 Nov | A | P2: 7; P3: 12 | 7 × 50 + 12 × 62 = **1,094** |
| 2 Nov | B | P4: 14 | 14 × 80 = **1,120** |
| 3 Nov | A | P2: 11 | 11 × 50 = **550** |
| 3 Nov | B | P1: 24 | 24 × 45 = **1,080** |

Here the algorithm reserves Group B on 2 November for the urgent, restricted P4 lot. It then uses Group B on 3 November for P1, where the bulk pre-study shows a very large advantage. P3 moves to A so B has room, and P2 is simply split across the two days on A.

The new total is

$$
M_{\mathrm{MILP}}=1{,}094+1{,}120+550+1{,}080
=\boxed{3{,}844\text{ minutes}}.
$$

| Measure | Planner's feasible draft | Optimized allocation |
|---|---:|---:|
| Products completed | 68 | 68 |
| Total bulk processing minutes | 4,160 | **3,844** |
| Products placed outside eligible dates | 0 | 0 |
| Daily machine-group capacity violations | 0 | 0 |
| Products moved to a different machine group | — | **28** |

The savings are

$$
\boxed{4{,}160-3{,}844=316\text{ machine-minutes}}
$$

or

$$
\boxed{\frac{316}{4{,}160}\times100\approx7.60\%}.
$$

The reason is simple when we follow the pieces. **Sixteen P1 products** move from A to B, saving $16(70-45)=400$ minutes. To make room, **twelve P3 products** move from B to A, adding $12(62-55)=84$ minutes. Therefore:

$$
\underbrace{400}_{\text{P1 improvement}}
-\underbrace{84}_{\text{P3 trade-off}}
=\boxed{316\text{ net minutes saved}}.
$$

This is the result I find interesting: **the optimal factory-wide decision includes deliberately placing one product on a slower eligible machine** to free the faster machine for a product that benefits much more.

These figures were independently reproduced with a SciPy/HiGHS MILP and checked against each product's quantity, eligible groups, individual day capacities and due dates. For this *small illustrative instance*, the solver reported an optimal solution with zero MIP gap. This is **not a claim of an equivalent saving in actual production**.

## 6. The mathematical model underneath the simple example

Here is how I translate the planning problem into mathematics. The symbols look formal, but each one comes from a very ordinary planning column.

| Symbol | Meaning in the planning sheet |
|---|---|
| $i\in I$ | A distinct product lot (not merely the style name) |
| $j\in J$ | Machine group or compatible brand/gauge configuration |
| $t\in T$ | A working day |
| $q_i$ | The product lot's **planned knitting quantity**, including any approved allowance |
| $b_{ij}$ | Booking SMV from development, in minutes per product |
| $s_{ij}$ | Verified bulk/pre-study SMV on group $j$ |
| $x_{ijt}$ | **Integer number of products** placed on machine group $j$ on day $t$ |
| $e_{ijt}$ | 1 if the group and date are eligible, otherwise 0 |
| $C_{jt}$ | Available production minutes of group $j$ on day $t$ |
| $a_{ij}$ | Planner's original quantity of product $i$ on group $j$ |

**Decision variable:**

$$
\boxed{x_{ijt}\in\mathbb Z_{\ge0}.}
$$

It is integer because we do not plan 7.4 finished products. A continuous LP can be a useful first approximation, but a whole-piece plan needs integer allocations.

### Constraint 1: Never lose or duplicate a product

$$
\boxed{\sum_{j\in J}\sum_{t\in T}x_{ijt}=q_i
\quad\forall i.}
$$

For P1, this means exactly 24 products must be allocated—whether all 24 go to B or the lot is split across eligible groups/days. The **PO quantity** and the **planned knitting quantity** may differ because of allowances; the model must use a deliberately reconciled lot quantity, not mix both columns.

### Constraint 2: A machine may run only compatible products

$$
\boxed{x_{ijt}\le q_i e_{ijt}.}
$$

If P4 cannot run on A because of a technical limitation, $e_{\mathrm{P4},A,t}=0$, so $x_{\mathrm{P4},A,t}=0$ no matter how many free minutes A has.

### Constraint 3: Each group's daily minutes are limited

$$
\boxed{\sum_i s_{ij}x_{ijt}\le C_{jt}\quad\forall j,t.}
$$

For Group B on 2 November in the optimized example:

$$
14\times80=1{,}120\le1{,}122.
$$

The constraint is satisfied. It is not enough to check **monthly capacity only**: a machine can have free minutes at the end of the month and still be overloaded on a product's deadline.

### Constraint 4: Respect KSD, KED and FRI

I treat **KSD** as the earliest approved knitting-start date, **KED** as the latest approved knitting-end date, and **FRI** as the downstream commitment that knitting must support.

If $\ell_i$ is a downstream lead time **not already included in KED**, the latest knitting date is

$$
\boxed{D_i=\min\bigl(\mathrm{KED}_i,\;\mathrm{FRI}_i-\ell_i\bigr).}
$$

Then assignments are allowed only when

$$
\mathrm{KSD}_i\le t\le D_i.
$$

For the example, P4's FRI is **3 November**, and the assumed one-day downstream lead means it must finish on **2 November**. When KED already reflects downstream requirements, I do **not** subtract the buffer a second time. Actual calendars must count approved working days and holidays correctly.

### Constraint 5: Prioritize important products without sacrificing delivery

The priority ladder in my JavaScript prototype begins with a simple product-level weight:

$$
\pi_i=q_i\times\mathrm{FOB}_i.
$$

A larger planned quantity or higher FOB increases this score. But **buyer importance, contractual urgency and FRI are not equivalent to FOB**; they must also be modeled as explicit rules or a defined hierarchy.

In a fully feasible daily plan, **all products meet their required dates**. Therefore the score does not need to override any deadline. If the combined orders cannot physically fit, a diagnostic model may introduce a reported shortage/late-piece variable $u_i$:

$$
\sum_{j,t}x_{ijt}+u_i=q_i,\qquad u_i\ge0,
$$

and first minimize, for example,

$$
\boxed{\min\sum_i\pi_i u_i.}
$$

**Important:** $u_i>0$ means the required on-time plan was **not fully feasible**. The application must show the unmet or late quantity instead of pretending every product can be produced on time.

### Objective: use fewer minutes while keeping the plan practical

For the simple solved case, the objective was

$$
\boxed{\min \sum_{i,j,t}s_{ij}x_{ijt}.}
$$

Subject to the five hard rules above, the solver finds the lowest modeled total bulk processing minutes.

In a larger planning system I can choose to minimize more than one quantity, usually in a stated order:

1. **Fulfillment and due dates** — satisfy the non-negotiable rules or honestly report infeasibility.
2. **Priority** — protect important products if not all commitments are feasible.
3. **Processing minutes / approved overtime** — reduce workload and the need for extra capacity.
4. **Disruptive transfers** — preserve the planner's decisions unless a move helps enough.
5. **Maximum utilization** — avoid concentrating too much load on one machine group.

One way to measure moved pieces is to define $X_{ij}=\sum_t x_{ijt}$ and compare it with the original allocation $a_{ij}$:

$$
\boxed{\mathrm{MovedPieces}=\frac12\sum_{i,j}|X_{ij}-a_{ij}|.}
$$

That is **28 products moved** in the solved example. Daily rescheduling within the same group is not counted as a machine transfer.

For balancing, let $z$ be the maximum group utilization:

$$
\sum_i s_{ij}x_{ijt}\le zC_{jt}\quad \forall j,t,
$$

and minimize $z$ as a secondary goal. The lowest-minute plan and the lowest-peak-utilization plan need not be the same.

## 7. A capacity fence is not permission to exceed physical capacity

In my current JavaScript experiments I have used **best-fit floors**, **machine-group fences**, **quantity × FOB priority bands**, and a penalty on minutes assigned above a group's fence. This is useful for exploring how a planner might allocate scarce preferred-machine capacity.

However, two different constraints must be distinguished:

$$
\begin{aligned}
L_{jt}&=\sum_i s_{ij}x_{ijt},\\
L_{jt}&\le F_{jt}+v_{jt}\quad &&\text{soft occupancy target},\\
L_{jt}&\le C^{\mathrm{hard}}_{jt}\quad &&\text{hard feasible capacity}.
\end{aligned}
$$

Here $v_{jt}\ge0$ is **overflow above the preferred occupancy fence**, not free production time. If the model permits overtime, that must be represented as separately approved extra capacity with an appropriate limit and cost. An overflow variable must never silently turn an impossible physical schedule into a supposedly feasible one.

A guardrail on **total monthly minutes** also cannot replace daily capacity or product-by-product delivery constraints. The full month might have enough minutes even when the product's KED has already passed.

## 8. What my existing code solves—and what it does not yet solve

The two JavaScript solvers I have been working with represent **monthly machine-group allocation** in different ways:

| Existing approach | What it provides | What it does not prove |
|---|---|---|
| Priority-band allocation MILP | Integer quantities, best-fit preferences, quantity × FOB tiers, movement penalties, soft fences and a total-minute guardrail | That the selected quantities fit actual daily KSD/KED/FRI windows |
| Configurable LP/MILP | Continuous versus integer pieces, technical eligibility from options, hard monthly group capacities, optional group-split limits, movement and peak-load penalties | That each lot has an implementable machine-by-day schedule |

The **daily, date-constrained example in this article was solved separately with SciPy/HiGHS**, not by claiming that the pasted JavaScript functions already implement a daily schedule.

The first JavaScript solver has an additional caution: its `placeEverything()` fallback deliberately places all pieces without enforcing the group fences and returns `feasible: true`. That is a **complete placement suggestion**, not a certified capacity-feasible production plan. I would label it accordingly, independently validate the returned assignments, and report any violated limits. Similarly, a timed-out solver needs a clear incumbent-solution and optimality-gap status rather than an unsupported optimality claim.

These distinctions have changed how I think about decision-support tools: a visually complete allocation is not necessarily feasible, and a feasible allocation is not necessarily optimal.

## 9. What I learned, and what I want to study next

This project started with a practical observation: **the machine used during development and the best machine for bulk allocation may not be the same**. Pre-study changed my estimate of how long a product would take, but that was only half the problem. The machine that looked best for one product also had to serve other products with different priorities, machine restrictions and deadlines.

Writing the equations forced me to confront questions that an attractive dashboard alone could hide. Am I saving minutes because the **estimate changed**, or because the **allocation improved**? Did I include the correct planned quantity? Am I comparing the same bulk SMVs in both plans? Is a reported occupancy violation only above a target fence, or actually beyond feasible capacity? Does the model preserve the deadline that matters to the buyer?

The next research questions I want to test involve **uncertain bulk SMV, machine downtime, daily rescheduling, setup effects and rolling-horizon reoptimization**. A time-indexed MILP is a natural starting point for group-level capacity. Detailed machine sequencing may eventually require a scheduling model such as CP-SAT. Robust or stochastic formulations could help when processing times and machine availability are uncertain, provided those assumptions are supported by evidence.

This direction also connects to production-planning work by Charles R. Sox and collaborators on [multi-item planning with uncertain demand](https://doi.org/10.1080/15458830.1996.11770742), [stochastic lot scheduling](https://doi.org/10.1080/07408179708966340), and [capacitated lot sizing with setup carry-over](https://doi.org/10.1080/07408179908969816). These are related research ideas, not methods I claim to have reproduced in the fictional demonstration.

My long-term question is no longer simply, *Which machine is the fastest?* It is:

**Given what development predicted, what bulk pre-study revealed, and what the factory must deliver, how can we construct a better plan that is mathematically defensible and operationally possible?**

That is where I see the connection between my work in manufacturing analytics and my interest in Operations Research.

---

**Related project:** [Machine-Wise Style Allocation and Knitting Capacity Optimization](/projects/machine-style-allocation/)

**Reproducibility note:** [Download the synthetic SciPy/HiGHS example](/knitting_milp_example.py) and its [daily allocation CSV](/knitting_milp_daily_allocation.csv) and [machine utilization CSV](/knitting_milp_daily_utilization.csv). Only synthetic inputs are used. The optimizer independently verifies whole-piece allocations, eligibility, day-specific capacity, and quantity conservation. The result is an optimal solution for this **fictional two-day instance**, not evidence of a measured factory-wide gain.

*Disclosure: This article is a personal mathematical account. It is not an official INDESORE Group report. Product IDs, buyer priorities, FOBs, equipment counts, calendars and SMVs in the numerical illustrations are fictional. Actual order data, production plans, financial terms and sensitive operating details are deliberately omitted.*
