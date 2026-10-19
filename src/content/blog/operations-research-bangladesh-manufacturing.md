---
title: 'From the Factory Floor to Decision Models: Lessons from Bangladesh Knitwear Manufacturing'
description: 'A first-person account of production visibility, bottlenecks, machine allocation, subsidy governance, free-fund management, energy scenarios, and the research questions they raise.'
pubDate: '2026-09-10'
updatedDate: '2026-10-19'
tags:
  - Operations Research
  - Manufacturing Analytics
  - Production Planning
  - Decision Support
  - Bangladesh
draft: false
---

*By Md Arif Hossain · Business Intelligence Analyst, INDESORE Group · Dhaka, Bangladesh*

![Conceptual pathway from manufacturing records to decision support](/images/blog/manufacturing-analytics-flow.svg)

My interest in operations research did not begin with a perfectly defined mathematical optimization problem. It grew from a much less tidy setting: working with production records, machine utilization, people, expenditures, and financial allocations at a knitwear manufacturer in Bangladesh. The more I worked with the data, the more I realized that **measuring what happened is only the beginning**. The difficult questions concern what management should do next—and what to do when the assumptions behind a plan turn out to be wrong.

At INDESORE Group, my business intelligence work has involved production-performance reporting, cross-section bottleneck analysis, machine-level capacity and style allocation, workforce subsidy monitoring, operational expenditure, fund availability and allocation, utility analysis, and later predictive standard-minute modeling. These are not isolated dashboards. Together they describe a system in which production decisions, employee resources, equipment, cash, and uncertainty are connected.

This article is a personal reflection on the analytical problems I have worked on and the research questions they have raised. It describes modeling approaches and dashboard concepts, **not proprietary production results or an official company position**. Any example is conceptual unless explicitly described otherwise. Internal personnel information, customer details, bank balances, and confidential factory screenshots are intentionally excluded.

## 1. The starting point: ISL production performance and operational visibility

One of my first important questions was apparently simple: **How is production performing relative to plan?** At a sweater manufacturing unit, the answer cannot be reduced to one output total. Knitting, linking, trimming, mending, ironing, and packing have different machines, labor requirements, available minutes, and definitions of achievement. A report showing strong knitting output might coexist with accumulating work-in-progress before linking or finishing.

I worked on production-performance views that bring planned quantities, achieved quantities, available capacity, efficiency, and department-level gaps into a more consistent picture. Breaking performance down by process, date, machine group, and style makes it easier to separate an overall shortfall from a local constraint. A comparison is meaningful only when the underlying definitions agree: the reporting period, scheduled minutes, available machines, and target quantities need to be reconciled.

The practical lesson was that a dashboard should lead to an operational question. If a section is below target, is the cause limited minutes, lower-than-assumed efficiency, a style with a higher processing requirement, machine downtime, or a shortage of input from the preceding section? Each answer suggests a different action.

<!-- SCREENSHOT SLOT 1: After obtaining permission, upload a redacted dashboard image to public/images/projects/isl-production-performance.webp, then uncomment the next line. -->
<!-- ![ISL production performance dashboard — redacted overview](/images/projects/isl-production-performance.webp) -->

## 2. Identifying bottlenecks instead of treating every efficiency gap alike

The second challenge was recognizing that **improving the wrong section may not improve completed output**. A knitwear factory is a connected production flow. Faster knitting can create more unfinished panels, but if linking or finishing is the constraint, the overall shipment rate may not change.

A basic starting point is to compare effective capacities across a sequence of production stages:

$$
Q_{\mathrm{finished}}\;\leq\;\min_{k=1,\ldots,K} C_k,
$$

where $C_k$ is the feasible throughput of stage $k$ over a common planning horizon. This is a simplified diagnostic, not a complete representation of rework, intermediate inventory, style mix, or alternative process routes. Yet it changes the conversation: rather than asking, "Which department has the lowest efficiency?" I can ask, **"Which constraint is currently limiting finished production?"**

My capacity and scenario analyses examine machine availability, operating days, shift minutes, attainable efficiency, and style requirements. A change in one input can be evaluated against the bottlenecks elsewhere in the flow. That distinction matters for decisions about overtime, reallocating resources, or revising delivery expectations.

### The uncertainty behind a daily plan

Factory capacity is rarely fixed. Machines can be unavailable, operators may be absent, material arrivals may be delayed, and performance changes with the construction and complexity of the style. A planning number based on average efficiency can hide a large range of feasible outcomes.

For a simplified machine group $j$, potential production depends on scheduled minutes $T_j$, usable machine count $M_j$, efficiency $e_j$, and the required minutes per piece $s_{ij}$ for style $i$:

$$
\widehat Q_{ij}\approx\frac{M_jT_je_j}{s_{ij}}.
$$

The formula is useful for **scenario analysis**, not a guaranteed production promise. The more interesting question is how to make a plan that remains workable when efficiency, downtime, and material availability deviate from their expected values.

<!-- SCREENSHOT SLOT 2: Upload a redacted bottleneck or capacity-simulator view as public/images/projects/capacity-bottlenecks.webp and uncomment. -->
<!-- ![Capacity and bottleneck scenario analysis](/images/projects/capacity-bottlenecks.webp) -->

## 3. Machine-wise style allocation: which order belongs on which machine?

Capacity planning naturally led to a more specific allocation problem. A knitwear factory may operate several machine brands and configurations, with different gauges, capabilities, speeds, and actual efficiencies. A style feasible on more than one machine group may require very different production minutes on each. Allocating work purely in proportion to machine count can therefore overlook the true cost of time and the potential bottlenecks created downstream.

I have analyzed machine-brand efficiency, available production minutes, style characteristics, and pre-study comparisons to inform **machine-wise style allocation**. A pre-production study can compare possible configurations before a style enters regular production. The aim is not simply to select the nominally fastest machine; it is to evaluate which assignment is feasible given gauge compatibility, the actual available capacity of each group, the order quantity, changeovers, and delivery commitments.

One way to express the decision is through an allocation variable $x_{ij}$, representing pieces of style $i$ assigned to machine group $j$. A conceptual optimization model can seek to reduce processing cost or lateness while respecting machine-minute limits:

$$
\begin{aligned}
\min\quad & \sum_{i,j} c_{ij}x_{ij} \\
\text{subject to}\quad
& \sum_j x_{ij}\geq D_i &&\forall i,\\
& \sum_i s_{ij}x_{ij}\leq A_j &&\forall j,\\
& x_{ij}=0 &&\text{for incompatible assignments},\\
& x_{ij}\in\mathbb{Z}_{\geq 0}.
\end{aligned}
$$

Here $D_i$ is required output and $A_j$ represents effective available minutes. Real-world allocation may also require operator skills, setups, maintenance windows, precedence relationships, shared resources, and delivery dates. **This formulation illustrates a research direction; it is not a claim that a complete factory-wide optimization engine has been deployed.**

The experience raised a question I now find central to operations research: **How should a plan balance production efficiency today against the risk of disruption tomorrow?**

<!-- SCREENSHOT SLOT 3: Upload a redacted machine-brand or style-allocation view as public/images/projects/machine-style-allocation.webp and uncomment. -->
<!-- ![Machine-wise style allocation and efficiency comparison](/images/projects/machine-style-allocation.webp) -->

## 4. Subsidy governance: analytics, fairness, and accountability

Not every consequential factory decision is made on a production line. Another area of my work has been **employee subsidy governance**, where the questions concern allocation, transparency, and reconciliation rather than machine minutes alone.

A subsidy dashboard can organize records across months and production sections while accounting for attributes such as grade, designation, eligibility-relevant information, attendance, and subsidy amount. The objective of the analytical interface is to help authorized users understand where allocations are going, investigate exceptions, compare periods, and reconcile totals. Clean definitions matter: an employee's designation, section, or attendance status can change, and those changes should not silently produce inconsistent reporting.

I developed a **Subsidy Insight Flow** application as part of this decision-support work. The application should only be linked publicly after its access settings and employee-data protections have been reviewed.

<!-- APPROVED DEMO LINK: Uncomment only after verifying that the application is safe for public visitors. -->
<!-- [Explore Subsidy Insight Flow ↗](https://subsidy-insight-flow.base44.app) -->

<!-- SCREENSHOT SLOT 4: Upload an APPROVED, fully de-identified screenshot as public/images/projects/subsidy-governance.webp and uncomment. Do not publish employee names, IDs, salaries, attendance records, or other personal information. -->
<!-- ![Subsidy Insight Flow — de-identified overview](/images/projects/subsidy-governance.webp) -->

This project reinforced a broader point: **resource allocation has a governance dimension**. Good analytics should make exceptions explainable and totals auditable. A visually persuasive chart cannot substitute for a consistent eligibility definition, appropriate access controls, or human review of consequential employee decisions.

## 5. Financial allocation and free-fund management

Production planning is also constrained by money—when it is available, what obligations it must cover, and how it is allocated across functions. My work expanded from operational output toward **operational expenditure, funding availability, banking adjustments, departmental allocations, and profitability analysis**.

One recurring analytical distinction is between the value of an export transaction and the cash genuinely available for discretionary use. Proceeds may be subject to banking charges, financing adjustments, commitments, or other deductions. A management dashboard needs to reveal this path clearly rather than treat gross receipts as immediately available funds.

I have worked on views that organize available funds, committed amounts, financing or bank deductions, and departmental expenditures. In profitability analysis, a useful communication technique is to express allocations **per Tk 100 of available free fund**, alongside the actual currency totals. For example, a comparison may ask how much of each Tk 100 is allocated to production support, operations, administration, banking costs, and what remains unallocated. Such a normalized view helps managers compare periods with different overall funding volumes.

But three ideas must not be confused:

- **Cash availability:** money accessible at a point in time after relevant constraints and deductions.
- **Costing versus actual expenditure:** a comparison between a planning baseline and recorded spending, using consistent scopes and time periods.
- **Profitability:** the economic result after correctly recognizing costs and revenues; it cannot be inferred from a free-cash balance alone.

I have also explored buyer-level contribution, style-level cost variance, per-piece overhead, and departmental accountability. The analytical task is to connect production choices to their financial implications without pretending that every variance has the same cause. Lower achieved volume, for instance, can raise overhead per piece even if fixed spending barely changes.

The research question is compelling: **How should scarce operating funds be allocated when future output, energy costs, material needs, and payment timing are uncertain?** This is an allocation problem with timing, risk, and practical governance constraints—not merely a finance chart.

<!-- SCREENSHOT SLOT 5: Upload an approved synthetic/redacted fund-allocation view as public/images/projects/free-fund-allocation.webp and uncomment. Never display actual bank balances, transaction references, or confidential client details. -->
<!-- ![Free-fund allocation and costing-versus-actual analysis](/images/projects/free-fund-allocation.webp) -->

## 6. Banking exposure, operating costs, and continuity

Related work includes consolidated views of **foreign-currency exposure, special-notice deposits, bank-related deductions, and spending trends**. An effective reconciliation should let the user move from an aggregate figure to the deductions and classifications that produced it. Finance analytics often fail when comparable-looking totals come from different reporting cutoffs or exchange-rate conventions.

I have also worked on **utility and continuity scenarios** linking electricity, gas, diesel, load-shedding duration, generator run-hours, consumption, and daily costs. Here again the central question is practical: if grid supply is interrupted, what is the feasible alternative operating arrangement, and how will it affect cost and production? An energy scenario cannot be assessed independently of production load and equipment capabilities.

This helped me see uncertainty as a shared feature of manufacturing operations. Downtime, utility supply, labor availability, and cash timing can affect one another. A useful planning model should expose these dependencies instead of making optimistic assumptions in separate spreadsheets.

<!-- SCREENSHOT SLOT 6: Upload a sanitized utilities and contingency view as public/images/projects/utilities-continuity.webp and uncomment. -->
<!-- ![Utilities and production-continuity scenarios](/images/projects/utilities-continuity.webp) -->

## 7. SMV modeling came later: from describing work to predicting its requirements

After working with production visibility, machine allocation, and scenario-based decisions, **Standard Minute Value (SMV) prediction** became a natural next layer. If planners must assign a new style to available resources, they need an estimate of how many minutes that style will require. The estimate may depend on gauge, construction, machine configuration, operation, yarn characteristics, and speed.

I developed analytical workflows using **Random Forest and XGBoost** to estimate processing requirements and examine the relationship between costing and observed minutes. An estimated SMV can support pre-study comparisons and early capacity planning. It also introduces a new challenge: a prediction is not a guaranteed production standard.

A practical assessment needs to ask how model errors affect decisions. A seemingly small average prediction error may be unacceptable for an urgent, high-volume style. A predictive model is therefore most valuable when paired with sensitivity analysis: how would the proposed machine allocation or delivery plan change if the actual minutes were higher than expected?

<!-- SCREENSHOT SLOT 7: Upload an approved non-sensitive SMV model/validation visualization as public/images/projects/smv-prediction.webp and uncomment. -->
<!-- ![SMV predictive modeling and planning sensitivity](/images/projects/smv-prediction.webp) -->

## 8. The question behind all these projects: how should we plan under uncertainty?

The projects above began as separate operational requests, but they point toward a shared problem. A production plan depends on **machine capacity, processing times, labor availability, material arrival, energy supply, budget constraints, and delivery commitments**. All of these can change after the plan has been approved.

This motivates three connected layers of decision support:

1. **Descriptive:** What happened? Where were the losses, delays, bottlenecks, and unexpected expenses?
2. **Predictive:** What may happen? What SMV, effective capacity, utility cost, or likely shortfall should be anticipated?
3. **Prescriptive:** What should we do? How should styles, machines, time, overtime, and funds be assigned under the constraints and risks that matter?

Several research directions emerge naturally from this sequence. **Robust optimization** can ask which allocations stay feasible when productivity is worse than expected. **Stochastic scheduling** can incorporate uncertainty in machine downtime and delivery of inputs. **Predict-then-optimize** connects learned processing-time estimates to assignment decisions. **Multiobjective models** can balance throughput, cost, employee-related constraints, and delivery reliability. **Rolling-horizon planning** can revise schedules as new information becomes available rather than assuming an entire month will unfold as planned.

For example, an abstract planning problem might select an assignment $x$ while treating disruption as a random variable $\xi$:

$$
\min_x\;\mathbb{E}[C(x,\xi)] + \lambda\,\operatorname{Risk}(L(x,\xi))
\quad\text{subject to feasible resource allocation}.
$$

Here $C$ represents cost and $L$ a measure of lateness or shortfall. This is a proposed research framing, not an existing production deployment. Its attraction is that it can link decisions that otherwise appear disconnected across several reporting systems.

## 9. Lessons from working in a Bangladesh manufacturing unit

The factory environment has taught me lessons that are not obvious in a textbook formulation. Data arrive from different departments with different definitions. A machine count on one report may not match the count of actively available machines on another. Work-in-progress makes the timing of output important. A manager may have to choose an imperfect but explainable action before all information is complete. A plan must account for the skills of operators and the realities of equipment, maintenance, and changing product requirements.

I have learned to ask not only whether a model computes the right answer, but also whether **its assumptions are traceable, its recommendation can be explained, and its inputs can be maintained**. This is why I value dashboards and simple interactive applications alongside formal optimization. A model that an operational team can challenge and update is more useful than an opaque result that cannot survive real conditions.

The experience has also reshaped my academic interests. My mathematical background exposed me to combinatorial structures, matrix methods, and rigorous reasoning. My professional work revealed resource constraints, uncertain processing times, network bottlenecks, and competing financial priorities. I now want to study how these perspectives can be combined to design better optimization and decision-support methods.

## Conclusion

My journey in manufacturing analytics has moved from **seeing production performance**, to **diagnosing bottlenecks**, **comparing machine-wise allocations**, **strengthening subsidy governance**, **tracing funds and costs**, **modeling energy scenarios**, and eventually **predicting processing time**. The central question is no longer how to build one more dashboard. It is how to turn incomplete and changing information into decisions that remain feasible, responsible, and understandable.

Working in a Bangladesh manufacturing unit has made this question tangible for me. I hope to explore it more rigorously through doctoral research in operations research, mathematical optimization, and data-driven decision systems.

---

*Disclosure: This article reflects my own professional learning and research interests. It is not an official statement of INDESORE Group. The article intentionally omits personnel records, exact banking balances, order-level commercial terms, and proprietary production information. Any future dashboard screenshots should be used only with appropriate authorization and thorough de-identification.*
