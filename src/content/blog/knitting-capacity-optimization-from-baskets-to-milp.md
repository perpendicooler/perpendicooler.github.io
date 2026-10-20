---
title: 'When the Fastest Machine Is Not the Best Choice: A Knitting Allocation Optimization Problem'
description: 'From machine-capacity baskets and pre-study SMVs to capacitated allocation, integer programming, scheduling, and planning under uncertainty.'
pubDate: '2026-10-20'
tags:
  - Operations Research
  - Mathematical Optimization
  - Production Planning
  - Mixed-Integer Programming
  - Manufacturing Analytics
  - Research Notes
draft: false
---

*Md Arif Hossain · Mathematics graduate, Business Intelligence Analyst · October 2026*

![An illustrative machine-capacity allocation system with workload baskets and style transfers](/images/blog/knitting-optimization-animated.svg)

In a knitwear factory, knowing that a machine is available is not the same as knowing that a particular order belongs on it. Different machine brands and configurations can produce the same style with different processing times. A decision that saves minutes for one order may overload another machine, displace an urgent style, or leave too little room before a committed production date.

This is the problem that led me from business intelligence reporting toward mathematical programming. My initial question was simple: **if an eligible machine can knit a style faster, why not move the style there?** The difficulty appears when several styles compete for the same capacity. Moving one style changes the capacity left for every other style, and a seemingly attractive local improvement may make the overall plan worse.

I have been developing a knitting-planning decision-support workflow at INDESORE Group, moving from style-level pre-study comparisons and machine-capacity dashboards toward formal machine allocation. This article explains the model behind that effort, the limitations of its current monthly formulation, and the extensions I want to investigate next. It is an independent methodological account, not an official company report. All numerical examples below are illustrative, and confidential orders, buyers, financial terms, and raw factory records are omitted.

## 1. The data: a style is not a single processing time

For every production lot, planners need more than a style number. They need its required quantity, compatible machine groups, production window, and machine-dependent processing requirement. The working data structure includes:

| Information | Why it matters |
|---|---|
| Style lot and planned pieces | Prevents duplicate or missing allocations, including repeated styles across orders |
| Machine brand, configuration and gauge | Determines physical eligibility |
| Booking SMV | The development-stage reference minute value |
| Bulk / pre-study SMV | The stronger production-planning estimate after technical study |
| Knitting start and end dates (KSD / KED) | Define the available knitting production window |
| FRI and downstream lead time | Connect knitting completion to downstream commitments |
| Available machine minutes | Define the capacity budget that assignments consume |

The distinction between **booking SMV** and **bulk/pre-study SMV** is central. I preserve the booking value as a developmental reference, while using verified pre-study values for a proposed production allocation. A missing pre-study value does not mean the machine can complete that style in zero minutes. Similarly, a technical note such as a feeder limitation may invalidate an apparently promising alternative.

Another subtlety is the planning lot. Two entries for the same style may have different quantities, dates or allocations. Merging them merely because their style codes match can destroy scheduling information or double-count a purchase order. The mathematical model therefore works with **distinct production lots**, not just distinct style names.

## 2. Machine capacity as a basket of minutes

I think of each machine group as a basket containing usable production minutes. For machine group $j$ and date $t$, its nominal capacity can be written as

$$
C_{jt}=N_{jt}H_{jt}a_{jt},
$$

where $N_{jt}$ is the usable machine count, $H_{jt}$ is the planned working minutes per machine, and $a_{jt}$ is an availability factor **only if availability has not already been incorporated in the supplied capacity**.

If lot $i$ uses $s_{ij}$ minutes per piece on group $j$, assigning $x_{ijt}$ pieces consumes

$$
m_{ijt}=s_{ij}x_{ijt}.
$$

The basket's remaining capacity is then

$$
R_{jt}=C_{jt}-\sum_i s_{ij}x_{ijt}.
$$

A machine transfer has two effects: it releases minutes from the original machine group and consumes a potentially *different* number of minutes on the destination. If the SMVs differ, the change in total required production minutes is not zero.

Consider an **illustrative** lot of 100 pieces. Machine A requires 50 minutes per piece; machine B needs 40. A complete transfer would reduce nominal processing demand from 5,000 to 4,000 minutes, saving 1,000 minutes. But if B has only 800 minutes available during the permitted dates, that transfer is **not feasible**. A viable plan might move part of the lot, rearrange another style, or keep the original assignment. That is why finding the fastest machine and finding the best factory-wide allocation are different problems.

## 3. The monthly linear program: a useful starting point

The current optimization baseline is a monthly, capacity-constrained allocation linear program. Let $I$ be the set of production lots and $J$ the set of eligible machine groups. Define

$$
\begin{aligned}
x_{ij}&\ge 0 &&\text{pieces of lot }i\text{ assigned to group }j,\\
u_i&\ge 0 &&\text{unallocated pieces of lot }i,\\
z&\ge 0 &&\text{maximum modeled utilization.}
\end{aligned}
$$

For planned quantity $q_i$, every lot is accounted for by

$$
\sum_{j\in J}x_{ij}+u_i=q_i \qquad \forall i\in I.
$$

Each group has a monthly capacity limit:

$$
\sum_{i\in I}s_{ij}x_{ij}\le C_j \qquad \forall j\in J.
$$

To control peak machine loading, add

$$
\sum_i s_{ij}x_{ij}\le zC_j \qquad \forall j\in J.
$$

One possible weighted objective is

$$
\min\;\sum_{i,j}s_{ij}x_{ij}
+\lambda_m\sum_{i,j\ne o_i}x_{ij}
+\lambda_b\left(\sum_jC_j\right)z
+M\sum_i u_i,
$$

where $o_i$ denotes a lot's original machine group when there is a single original group. For a lot originally split across multiple groups, movement should instead be measured against its complete baseline allocation vector.

The terms have different jobs: processing minutes measure modeled workload, the movement penalty discourages unnecessary changes, the $z$ term discourages extreme concentration, and the large shortfall penalty discourages unallocated pieces.

This LP is valuable because it exposes the trade-offs clearly and can often be solved efficiently. But it is **not a complete production schedule**. Continuous $x_{ij}$ values can yield fractional pieces. Rounding afterward can break capacity or quantity conservation. A large shortfall penalty discourages unmet pieces but does not prohibit them. Most importantly, a monthly capacity constraint can appear feasible even if the required capacity is unavailable during a lot's actual KSD–KED window.

The LP therefore answers a narrower question: *Under these SMVs and monthly capacity assumptions, how should the quantity be divided among eligible groups?*

## 4. A stronger formulation: daily mixed-integer production planning

The natural next step is a **time-indexed mixed-integer linear program (MILP)**. Let $T$ denote working dates and define

$$
x_{ijt}\in\mathbb Z_{\ge0},
$$

where $x_{ijt}$ is the whole-piece quantity of lot $i$ assigned to machine group $j$ on date $t$.

With strict fulfillment, every planned piece must be assigned exactly once:

$$
\boxed{\sum_j\sum_t x_{ijt}=q_i\quad\forall i.}
$$

Daily capacity becomes

$$
\boxed{\sum_i s_{ij}x_{ijt}\le C_{jt}\quad\forall j,t.}
$$

Let $e_{ijt}\in\{0,1\}$ indicate technical and calendar eligibility. Then

$$
x_{ijt}\le q_i e_{ijt}.
$$

This prevents assignments to an incompatible gauge, a technically unsuitable machine, or a date when an operation cannot run. A lot can only be produced within its permitted knitting window. If $\ell_i$ represents downstream lead time that is **not already included in KED**, define

$$
D_i=\min\{\mathrm{KED}_i,\mathrm{FRI}_i-\ell_i\},
$$

and enforce $x_{ijt}=0$ outside $[\mathrm{KSD}_i,D_i]$. When KED already accounts for downstream work, that lead time must not be subtracted again.

The distinction is practical: an unused minute next week is not necessarily useful for a style due tomorrow.

### Measuring the disruption caused by a reallocation

A mathematical optimum may propose many small transfers with only modest benefit. To quantify operational disruption, let $b_{ij}$ denote the number of pieces originally allocated from lot $i$ to group $j$, and let $X_{ij}=\sum_t x_{ijt}$. Introduce deviation variables:

$$
\begin{aligned}
d_{ij}&\ge X_{ij}-b_{ij},\\
d_{ij}&\ge b_{ij}-X_{ij}.
\end{aligned}
$$

For a fully conserved allocation, the total number of pieces whose machine group changes is

$$
\frac12\sum_{i,j}d_{ij}
$$

when the deviations are minimized to their absolute values. This allows the model to preserve the current plan unless a proposed change offers enough benefit.

I prefer **lexicographic objectives** in this setting. First secure feasible on-time production, then minimize required processing and setup minutes, then minimize avoidable reassignment, and finally examine workload balance. Otherwise an arbitrary weighted formula might trade away a delivery commitment merely to save a small amount of time.

## 5. Why 100% utilization is not necessarily the optimum

It is tempting to judge every machine basket against a 100% loading target. In a perfectly predictable environment, high utilization may look attractive. In actual production, however, the final remaining minutes can provide resilience against urgent orders, machine downtime, slow-running styles, and engineering uncertainty.

Moreover, utilization and performance are different concepts. Here **planned capacity utilization** means

$$
U_j=\frac{\text{allocated workload minutes}_j}{\text{available capacity minutes}_j}.
$$

It is not automatically equivalent to realized production efficiency. Reducing SMV can lower the numerator and thus *lower utilization* even when the same order quantity requires less work. A model should therefore report feasible on-time pieces, production-minute requirements, remaining capacity and overload risk together—not optimize the utilization percentage in isolation.

## 6. Beyond MILP: scheduling, robustness, and replanning

The choice of solver depends on the decision being made.

| Model | The question it answers | Key limitation or extension |
|---|---|---|
| Monthly LP | Which groups should receive how many pieces? | Fractional allocations, no daily calendar |
| Monthly MILP | Which integer quantities should be assigned? | Still not a daily schedule |
| Daily MILP | Can required quantities fit machine/date capacity before their deadlines? | Aggregate groups may hide machine sequencing |
| CP-SAT | Which specific machine processes which job, and when? | Requires finer machine/setup information |
| Robust MILP | Will the plan remain feasible for a defined adverse uncertainty set? | Depends on how that uncertainty set is calibrated |
| Two-stage stochastic model | What initial plan works well across possible disruptions and recourse actions? | Requires scenarios and defensible probabilities |
| Rolling horizon | What should we change after observing today's actual production? | Must preserve completed and locked commitments |

A detailed **CP-SAT** formulation could represent individual machine assignments, non-overlapping production intervals, and sequence-dependent setups. By contrast, machine-group MILP is more appropriate when the available data describe aggregate daily minutes rather than individual machine timetables.

In a **robust** formulation, the bulk/pre-study SMV can be uncertain:

$$
\widetilde{s}_{ij}=\bar{s}_{ij}+\Delta s_{ij}\xi_{ij},\qquad 0\le\xi_{ij}\le1.
$$

A robust allocation then respects capacity for deviations within a deliberately specified uncertainty set. That is a limited, testable guarantee—not a promise that no disruption will ever occur.

A **two-stage stochastic** model instead selects initial allocations before uncertainty is revealed and permits bounded corrective decisions afterward. Its usefulness depends on plausible scenarios, probabilities and recourse options. If those are unavailable, a robust or scenario-based sensitivity analysis may be more defensible than a highly parameterized stochastic model.

Finally, **rolling-horizon optimization** addresses the fact that manufacturing information changes daily. At date $\tau$, I can compute the remaining requirement

$$
q_i^{\mathrm{rem}}(\tau)=q_i-\mathrm{CompletedPieces}_i(\tau),
$$

lock completed work, update machine availability and revised pre-study estimates, and optimize the remaining horizon. A rolling-horizon method is a decision process; it can use a daily MILP or a robust MILP as its underlying solver.

## 7. Connecting this project to the production-planning literature

My interest in these extensions also connects to the work of **Charles R. Sox** and collaborators. I found three methodological connections particularly relevant:

1. **Sox and Muckstadt (1996), [“Multi-Item, Multi-Period Production Planning with Uncertain Demand”](https://doi.org/10.1080/15458830.1996.11770742)**, studies finite-horizon capacity-constrained production planning under random demand, including a Lagrangian-relaxation approach and rolling-horizon evaluation.
2. **Sox and Muckstadt (1997), [“Optimization-Based Planning for the Stochastic Lot-Scheduling Problem”](https://doi.org/10.1080/07408179708966340)**, provides a connection to stochastic production-run decisions and setup-aware planning.
3. **Sox and Gao (1999), [“The Capacitated Lot Sizing Problem with Setup Carry-Over”](https://doi.org/10.1080/07408179908969816)**, develops mixed-integer formulations in which a production run may continue across periods without a needless additional setup.

These papers investigate related production-planning questions; **the ISL-specific equations in this article are my own proposed modeling framework, not a reproduction of their algorithms**. Importantly, uncertain demand in the 1996 work is not identical to the uncertainty I want to study here: our immediate sources of uncertainty include machine-dependent processing times, downtime and the timing of production commitments.

That difference suggests a more precise question: **Does a rolling-horizon, uncertainty-aware allocation model produce more dependable on-time knitting schedules than a monthly minute-minimization model?**

## 8. What I would measure before claiming an improvement

A smaller optimized-minute total is not proof of lower realized costs or better shipment performance. The machine SMVs could be inaccurate, a proposed machine could be unavailable during the required dates, or changeovers could consume the predicted gain.

To test whether the method actually helps, I would compare a fixed set of historical production lots under the same information available at each planning decision. The experiment would evaluate:

- Quantity conservation and technical compatibility.
- Daily capacity and KSD/KED/FRI feasibility.
- Expected and actual completion performance.
- Required processing minutes, setups and approved overtime.
- Number of styles moved and magnitude of reassignment.
- Solver time, best bound and optimality gap where supported.
- Performance after downtime or slower-than-expected styles are observed.

This would separate three distinct claims: an allocation can be **mathematically feasible**, **optimal under its stated model**, or **better in realized operation**. One claim does not automatically establish the others.

## 9. Current status and next steps

The existing decision-support prototype includes machine-capacity baskets, style-level machine comparisons, booking and bulk/pre-study SMV records, and a monthly linear-programming allocation formulation. The LP's monthly and fractional nature is a known limitation. My next implementation priorities are verified whole-piece allocation, daily capacity and date constraints, scenario comparison, and explicit feasibility reporting. CP-SAT, robust optimization, stochastic programming and rolling-horizon tests are prospective research extensions rather than claims of fully deployed functionality.

What interests me most is not the formula for choosing a faster machine. It is the interaction between many reasonable decisions made under limited time, shared resources and imperfect information. A good optimization model should help a planner understand **why** a transfer is recommended, **what** constraints it respects, and **which assumptions** could cause that recommendation to fail.

That, to me, is where industrial analytics begins to become operations research.

---

**Related project:** [Machine-Wise Style Allocation and Knitting Capacity Optimization](/projects/machine-style-allocation/)

*Disclosure: This article describes my personal technical learning and generalized modeling work. No proprietary planning tables, buyer-specific terms, identifiable orders, or confidential factory screenshots are published. Numerical illustrations are synthetic.*
