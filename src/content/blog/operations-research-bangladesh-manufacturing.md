---
title: 'From Factory Data to Decisions: Operations Research in Bangladesh''s Knitwear
  Manufacturing'
description: A practitioner perspective on SMV prediction, capacity allocation, overtime
  scenarios, machine efficiency, cost variance, utilities, and decision-support systems.
pubDate: '2026-09-10'
tags:
- Operations Research
- Manufacturing Analytics
- Optimization
- Machine Learning
- Bangladesh
draft: false
---

*By Md Arif Hossain · Business Intelligence Analyst, INDESORE Group · Dhaka, Bangladesh*

![A conceptual manufacturing analytics workflow from data sources to optimization decisions](/images/blog/manufacturing-analytics-flow.svg)

Manufacturing analytics is often described as the construction of dashboards. In practice, the more difficult task is to convert fragmented operational observations into decisions that managers can explain, revise, and implement. A dashboard may reveal that a production section is below plan, but that observation does not automatically tell us whether to authorize overtime, redistribute work to a different machine brand, revise a standard minute value, or renegotiate a delivery plan. Each decision involves constraints, uncertainty, trade-offs, and sometimes competing departmental incentives.

Working as a Business Intelligence Analyst in Bangladesh's knitwear and manufacturing environment has made these issues concrete for me. My work has covered production-performance reporting, standard-minute analysis, predictive modeling, machine-capacity planning, scenario comparisons, operational expenditure, utility consumption, and decision-support interfaces. These activities have strengthened my interest in **operations research**, which provides mathematical tools for deciding what to do—not merely describing what happened.

This article is a methodological reflection on that work. It discusses the kinds of models and scenarios that arise in knitwear manufacturing, but it **does not disclose confidential production orders, customer terms, proprietary costing records, personnel records, or internal commercial balances**. Every small numerical example explicitly marked *illustrative* is synthetic rather than a statement of my employer's actual operations. All general conclusions are my own, and any organization-specific publication should be reviewed for authorization before release.

## 1. The factory as a linked decision system

A knitwear order moves through several interconnected operations. Depending on the product and plant configuration, the workflow can include knitting, linking, trimming, mending, washing or finishing, ironing, inspection, and packing. Different operations have different resource requirements and bottlenecks. A gain at one workstation does not necessarily create a gain in completed shipments. If knitting produces work faster than linking can process it, work in progress may accumulate without increasing final throughput.

This suggests modeling the factory as a **network of capacities** rather than as a list of independent department totals. For process $$k$$, let $$C_k$$ denote feasible output over a planning period. In a highly simplified serial process with a common unit of measurement and no alternative routings, throughput is bounded by

$$
Q\leq\min\{C_1,C_2,\ldots,C_K\}.
$$

Actual factories require more detail: products differ, styles consume different amounts of time, tasks may be reworked, resources may be shared, and inventory can shift production between periods. Nevertheless, the minimum-capacity expression is a useful first diagnostic. It prevents us from assuming that adding capacity in any arbitrary department will increase overall shipments.

My analytical approach therefore begins by identifying the operational question, the relevant flow of materials, and the binding constraints. Only then does the dashboard design become meaningful. An attractive chart is not a substitute for correct system boundaries.

## 2. Standard minute values and predictive modeling

A **standard minute value (SMV)** summarizes the standard time associated with an operation or garment under a stated method and productivity convention. In production planning, it links a piece-based objective to a minute-based resource requirement. When a style is new or the production process changes, a good early SMV estimate helps planners evaluate load, delivery feasibility, and machine requirements.

One of my analytical projects has examined the relationship between style characteristics and observed unitization or operation time. Relevant predictors may include gauge, construction, operation, yarn composition, machine speed, and physical dimensions. These variables are not interchangeable. A higher speed setting may improve potential output, but its observed effect can depend on construction complexity, machine condition, material characteristics, and quality requirements.

A predictive model can be written abstractly as

$$
\widehat{\mathrm{SMV}}_i=f(x_{i1},x_{i2},\ldots,x_{ip}),
$$

where the feature vector contains available pre-production information for style $$i$$. Regression methods such as random forests or gradient-boosted trees can accommodate nonlinear effects and interactions. But model selection should not depend only on headline accuracy. Leakage, repeated styles across training and test sets, implausible feature values, missing data, and changes in manufacturing conditions can all undermine actual deployment performance.

For evaluation I find the **mean absolute error** particularly interpretable, because its unit remains minutes:

$$
\operatorname{MAE}=\frac{1}{n}\sum_{i=1}^{n}|y_i-\hat y_i|.
$$

The coefficient of determination $$R^2$$ can complement MAE, but it does not tell a manager whether a two-minute error is commercially material for a particular style. The more useful next question is whether the model improves a planning decision when compared with a sensible baseline. That is the distinction between predictive accuracy and decision value.

## 3. Capacity planning is arithmetic plus constraints

A commonly useful approximation converts machine time into expected pieces. Let $$M$$ be the number of available machines, $$T$$ scheduled minutes per machine, $$e$$ expected effective utilization, and $$s$$ SMV per piece. Then illustrative potential output is

$$
\widehat Q=\frac{MTe}{s}.
$$

For example, suppose a hypothetical section has four equally capable machines, ten scheduled hours per machine per day, expected efficiency of 80%, and a style requiring 20 standard minutes per piece. Scheduled minutes total $$4\times600=2,400$$. Productive standard minutes are $$2,400\times0.80=1,920$$, producing an expectation of $$1,920/20=96$$ pieces per day.

This numerical result is **illustrative**, not a measurement from a particular plant. It is also not a guarantee. Breakdowns, crew availability, setup, quality defects, rework, and material delays may reduce realized output. If the units are indivisible, the planner must respect integer feasibility at the level of jobs or quantities, rather than assuming fractional pieces can be physically shipped.

Capacity is therefore best treated as a scenario-dependent quantity. We can calculate a normal-shift case, an overtime case, a lower-efficiency case, and a constrained-material case. The goal is not to produce a single deceptively precise number, but to expose the assumptions that make each plan plausible.

## 4. Machine allocation as an optimization problem

Machine allocation becomes more complicated when an order can be produced using several machine brands or models with different gauges, speeds, efficiencies, and capabilities. Some styles are restricted to particular equipment. Others can be processed on multiple machine groups but with different expected minutes per piece. In such situations, proportional allocation based only on machine counts may be inefficient.

Let $$x_{ij}$$ be the number of pieces of style $$i$$ assigned to machine group $$j$$, and let $$s_{ij}$$ be the expected standard minutes per piece for that pairing. Denote available effective minutes in group $$j$$ by $$A_j$$ and order demand for style $$i$$ by $$D_i$$. A simplified allocation model is

$$
\begin{aligned}
\min_{x}\quad &\sum_{i,j}c_{ij}x_{ij}\\
\text{subject to}\quad
&\sum_jx_{ij}\geq D_i &&\forall i,\\
&\sum_i s_{ij}x_{ij}\leq A_j &&\forall j,\\
&x_{ij}=0 &&\text{if group }j\text{ cannot make style }i,\\
&x_{ij}\in\mathbb Z_{\geq0} &&\forall i,j.
\end{aligned}
$$

Here $$c_{ij}$$ represents a cost or another chosen penalty for assigning one piece of style $$i$$ to group $$j$$. This is a stylized integer linear program, not a complete factory execution model. A practical formulation may require binary setup variables, sequence-dependent changeovers, machine-level scheduling, work-in-progress restrictions, labor skills, finishing capacity, and delivery-date constraints. A cost-minimizing assignment can also be inadequate if it misses a shipment deadline; objectives may need priority weights or explicit service-level constraints.

The key benefit of mathematical optimization is transparency: it forces us to express what is feasible and what counts as better. The model can be debated and audited. That is preferable to presenting an unexplained machine-allocation recommendation as if it were a fact.

## 5. Overtime feasibility and scenario comparison

Overtime is a clear example of a decision with both economic upside and operational risk. Extra shift minutes may increase available capacity, but their value depends on demand, bottleneck location, labor costs, quality, and the timing of revenue realization. Adding two hours to knitting does little for final output if linking and packing have no slack. Similarly, theoretical incremental production has limited commercial value if the order cannot be shipped within the relevant window.

In the preceding *illustrative* four-machine example, two extra scheduled hours per machine add $$4\times120=480$$ raw machine-minutes. At the assumed 80% efficiency, they add $$384$$ effective minutes. For a 20-minute SMV, this is a theoretical increase of $$19.2$$ pieces in expected capacity before integer and downstream constraints. The expression is useful as a capacity estimate, but it should not be interpreted as permission to promise 19.2 actual garments.

A managerial overtime model can compare incremental contribution with incremental costs:

$$
\Delta\Pi = \Delta R-\Delta C_{\mathrm{labor}}-\Delta C_{\mathrm{utilities}}-\Delta C_{\mathrm{other}}.
$$

Here $$\Delta R$$ must reflect realizable additional sales or avoided penalties rather than merely multiplying every additional machine-minute by a sales price. In my scenario-analysis work, I have found that explicitly separating revenue assumptions, overtime rates, throughput constraints, and efficiency assumptions makes discussions more productive. Decision-makers can see which inputs drive the outcome and which are merely optimistic defaults.

## 6. Evaluating machine-brand performance fairly

Machine-brand comparisons often appear straightforward: rank machine groups by observed efficiency and invest in the best. That conclusion can be misleading. A group may run easier styles, benefit from better maintenance, or receive more experienced operators. An efficiency gap might be caused partly by product mix rather than machine capability. Comparing raw averages across groups may therefore confound genuine technical differences with allocation decisions.

A stronger analysis stratifies or adjusts by gauge, construction, style complexity, order size, operator conditions, and observed downtime. At minimum, I would ask whether the compared machine groups faced similar tasks during the same planning horizon. A model can then estimate an adjusted effect or investigate matched-style comparisons. Even if causal inference is not feasible, this is more credible than turning descriptive correlations into claims about which brand is inherently superior.

A related project is the comparison of *costing SMV* with *actual SMV*. Their difference can be studied with scatterplots, error distributions, regression, and style-level flags. A persistent positive difference may signal an underestimation issue, but interpretation depends on the definitions of costing standards, actual observation methods, and the production stage at which each value was recorded. I treat deviations as investigation triggers, not immediate evidence of poor performance or individual fault.

## 7. From department dashboards to financial accountability

Operational output is only part of the enterprise picture. A manufacturing analytics function also needs to relate production to cost, cash availability, and commercial decisions. An operational expenditure dashboard may analyze total spending and overhead per achieved piece, but such a metric should be interpreted with caution. When production volumes fall, overhead per piece can rise even if underlying fixed expenses remain stable. Consequently, overhead per piece is a useful signal but not a standalone efficiency verdict.

A more complete comparison decomposes variance into quantity, rate, mix, and timing effects when the data support them. If $$C_a$$ is actual cost and $$C_b$$ is a comparable budget or costing baseline, then the simple variance $$C_a-C_b$$ is a starting point rather than a full explanation. Different accounting bases, allocations, currencies, or production cutoffs can create apparent gaps that are not operationally comparable.

In my broader analytical work, I have also addressed questions about available funds, export-related deductions, department allocations, and profitability views. These analyses require a sharp distinction between *cash movement*, *revenue recognition*, *costing estimates*, and *earned contribution*. A dashboard should not implicitly equate available cash with profit. One design principle is to show every deduction and assumption clearly, then allow users to trace aggregate metrics back to their component definitions.

## 8. Utilities and contingency planning

Energy availability is central to production continuity. Electricity, gas, and diesel may play different roles across machines, generators, boilers, and other equipment. A utility dashboard can connect meter readings, load-shedding durations, generator operating hours, fuel opening and closing balances, consumption, and total daily costs. The challenge is to reconcile measurements collected on different schedules and through different systems.

Scenario analysis is useful here, but it must respect physical feasibility. Examples include a reference operating day, a low-load-shedding day, a higher-diesel-dependence day, or a gas-supply constraint. A simple prediction could take the general form

$$
\widehat C_{\mathrm{daily}}=f(H_{\mathrm{grid}},H_{\mathrm{generator}},G,D,L),
$$

where $$G$$ and $$D$$ denote gas and diesel consumption under explicitly defined units and $$L$$ captures production load. A more elaborate model would separate tariff structures, fixed charges, machine demand, generator fuel curves, and uncertainty. A counterfactual such as “no load shedding” should not be presented as historical fact; it is a hypothetical scenario whose assumptions must be visible.

This area highlights an important analytics principle: a prediction may be statistically accurate and still be unsafe to apply outside its training regime. For example, an observed correlation between generator hours and diesel use may not extrapolate cleanly to a different load profile or generator condition. Scenarios need both empirical grounding and engineering plausibility.

## 9. Building decision-support interfaces people actually use

A good analytical model must eventually reach a decision-maker. My work with dashboards and lightweight applications has reinforced the importance of clear input controls, sensible defaults, transparent definitions, and exportable results. An interactive capacity simulator can let a planner modify efficiency, available machines, shift length, or planned production days and observe the calculated impact instantly. The value of the interface lies in making assumptions discussable—not in adding animation for its own sake.

I increasingly think about decision support in three connected layers. The **descriptive layer** asks what happened: output, minutes, costs, delays, and observed efficiency. The **predictive layer** asks what may happen: SMV, capacity, expected cost, or utility demand under a given scenario. The **prescriptive layer** asks what to do: which allocation, schedule, overtime decision, or cost intervention best satisfies operational objectives subject to constraints.

These layers should share definitions and reconciliation rules. If the descriptive and prescriptive views use different conventions for available minutes, machine counts, or production cutoffs, the interface can appear inconsistent even when each individual formula is internally correct. Data governance, therefore, is a prerequisite for sophisticated optimization—not a clerical afterthought.

## 10. Data quality, people, and implementation constraints

Factory data contains unavoidable complexity. Machines may be counted differently across departments; style names can change; updates arrive late; a shift crosses reporting dates; and one exception may propagate through several reports. Missing values should not automatically be interpreted as zeros. Outliers should not automatically be removed: some represent errors, while others reveal genuine operational disruptions. I prefer data dictionaries, source-to-dashboard reconciliation checks, and explicit issue logs over silent cleaning rules that obscure the provenance of a metric.

People also matter. A mathematically optimal schedule may be impossible if operators lack training, maintenance is overdue, or an order's material is not available. The right approach combines mathematical rigor with operational judgment. I view an optimization model as a structured proposal that should be validated against shop-floor knowledge before implementation. The goal is not to replace experienced planners with a black box; it is to help them make better-documented decisions under time pressure.

## 11. Research directions arising from practice

These experiences suggest several research questions that I find compelling. **Predict-then-optimize** methods could connect uncertain SMV estimates with allocation decisions, rather than optimizing as if every input were known exactly. **Robust optimization** could examine allocations that remain feasible under plausible efficiency or downtime deviations. **Stochastic scheduling** could incorporate breakdown risk and material arrival uncertainty. **Multiobjective optimization** could balance cost, throughput, quality, workload stability, and delivery reliability. **Explainable decision support** could help managers understand why a recommendation changes when an assumption changes.

A possible integrated formulation would choose an allocation $$x$$ to minimize expected cost while controlling the risk of lateness:

$$
\min_x\;\mathbb E[C(x,\xi)]+\lambda\,\operatorname{Risk}(L(x,\xi))
\quad\text{subject to operational feasibility},
$$

where $$\xi$$ represents uncertain processing times, downtime, or demand. This expression is a research direction, not a claim that a single formula already captures every shop-floor constraint. Its value is to show where data science and operations research meet: one discipline estimates uncertain quantities, and the other decides how to act using those estimates.

## Conclusion

Manufacturing analytics becomes consequential when it makes the trade-offs of a real decision explicit. Standard minutes affect capacity; capacity is linked to machine assignment; machine assignment changes energy use and cost; process bottlenecks limit shipments; and commercial constraints determine whether additional output is valuable. Improving one dashboard in isolation is less important than building a consistent analytical model of these connections.

My experience in Bangladesh's manufacturing environment has motivated me to study mathematical optimization, algorithmic decision-making, and data-driven operations more deeply. It has also taught me an important professional lesson: the purpose of an analytical model is not to demonstrate technical sophistication. Its purpose is to produce a decision that is **feasible, understandable, measurable, and responsibly implemented**.

## Selected reading

1. Hopp, Wallace J., and Mark L. Spearman. *Factory Physics*. McGraw-Hill: manufacturing flow, variability, and capacity principles.
2. Pinedo, Michael L. *Scheduling: Theory, Algorithms, and Systems*. Springer: scheduling and production decisions.
3. Hillier, Frederick S., and Gerald J. Lieberman. *Introduction to Operations Research*. McGraw-Hill: linear, integer, and stochastic optimization.
4. Montgomery, Douglas C., Elizabeth A. Peck, and G. Geoffrey Vining. *Introduction to Linear Regression Analysis*. Wiley: regression modeling and interpretation.
5. Bertsimas, Dimitris, and John N. Tsitsiklis. *Introduction to Linear Optimization*. Athena Scientific: mathematical optimization foundations.

*Disclosure: This is an independent educational reflection on professional experience. Numerical illustrations are synthetic. No internal dashboards, customer data, or proprietary measurements are reproduced, and the statements should not be read as official positions of any employer.*
