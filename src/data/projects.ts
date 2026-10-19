// Selected academic and industrial decision-support projects.
// Industrial descriptions are deliberately high-level and exclude confidential information.
// To enable an approved dashboard screenshot, set image to a file under /public/images/projects/.
// Do not add photos/screenshots containing staff IDs, salaries, live bank balances, or proprietary order data.
// The Subsidy Insight Flow demonstration link is intentionally hidden until it is cleared for public use.

export const projects = [
  {
    slug: 'isl-production-performance',
    number: '01',
    short: 'Production Analytics · ISL',
    title: 'ISL Production Performance & Process Visibility',
    description: 'Connecting planned and achieved output, efficiency, capacity, and production gaps across knitwear manufacturing processes.',
    detail: 'Developed production-performance reporting and decision-support views covering knitting, linking, trimming, mending, ironing, and packing. The analytical goal is to reconcile output and available minutes across departments and help distinguish an isolated shortfall from a process-flow constraint. This work provided a foundation for capacity analysis, bottleneck investigation, and production-planning discussions.',
    contributions: [
      'Consolidated planned and achieved output into interpretable performance views.',
      'Compared performance by production section and operating period.',
      'Linked efficiency reporting with machine availability and available minutes.',
      'Helped frame actionable questions around shortfall, throughput, and work-in-progress.'
    ],
    math: 'Compare achieved output with plan by section and date; interpret the gap alongside available machine-minutes and efficiency assumptions.',
    tools: ['Business Intelligence', 'Tableau', 'SQL', 'Production Analytics'],
    repo: '', demo: '', image: '',
    note: 'This is a methodology-level description of my work at INDESORE Group. No internal production dashboard or factory-sensitive data is published.'
  },
  {
    slug: 'production-bottlenecks-capacity',
    number: '02',
    short: 'Bottlenecks · Scenario Planning',
    title: 'Bottleneck Identification & Production Capacity Simulation',
    description: 'Examining the bottleneck of interconnected factory sections and exploring changes in capacity under alternate operating assumptions.',
    detail: 'Built capacity-feasibility and what-if analyses using machine counts, effective minutes, operating days, efficiency assumptions, and required output. Comparing the capacity of interdependent sections helps identify where additional machines, overtime, or improved performance may not lead directly to additional finished garments.',
    contributions: [
      'Compared planned output with scenario-dependent section capacity.',
      'Analyzed bottleneck exposure across connected production stages.',
      'Evaluated changes in working days, machine availability, and achievable efficiency.',
      'Distinguished theoretical capacity gains from feasible end-to-end throughput.'
    ],
    math: 'Expected standard-minute capacity = machine count × minutes per machine × days × efficiency. Overall throughput is limited by the relevant constrained stage.',
    tools: ['Python', 'Scenario Analysis', 'Capacity Modeling', 'Tableau'],
    repo: '', demo: '', image: '',
    note: 'Scenario results describe assumptions rather than guaranteed future output; actual production figures and facility-specific constraints are withheld.'
  },
  {
    slug: 'machine-style-allocation',
    number: '03',
    short: 'Machine Allocation · Pre-Study',
    title: 'Machine-Wise Style Allocation & Pre-Production Analysis',
    description: 'Comparing machine groups, compatible styles, speed, efficiency, and expected production minutes to inform style assignments.',
    detail: 'Examined machine-brand and gauge-level capability, observed performance, style complexity, and pre-study minutes to support decisions about where production orders can be placed. The work connects descriptive machine comparisons with a proposed constrained allocation formulation in which style quantities must fit machine-group availability and operational requirements.',
    contributions: [
      'Compared production performance across machine groups without assuming identical style mix.',
      'Organized machine-brand, gauge, and operating-minute capacity views.',
      'Analyzed style pre-study results and potential time differences by machine configuration.',
      'Framed assignment trade-offs in terms of feasibility, throughput, and uncertainty.'
    ],
    math: 'Choose style quantities x_ij for eligible machine groups subject to demand coverage and available effective minutes; incorporate setup and delivery constraints in future extensions.',
    tools: ['Optimization Modeling', 'Python', 'Machine Analytics', 'Pre-Study'],
    repo: '', demo: '', image: '',
    note: 'Style-allocation optimization is presented as a modeling perspective, not as a claim of a deployed factory-wide automatic scheduling system.'
  },
  {
    slug: 'subsidy-governance',
    number: '04',
    short: 'Subsidy Governance · Decision Support',
    title: 'Subsidy Insight Flow: Workforce Subsidy Governance',
    description: 'An analytical interface to monitor subsidy allocations, reconcile department totals, and make workforce-support reporting more transparent.',
    detail: 'Designed a subsidy-governance dashboard for authorized reporting and analysis across time periods and organizational sections. Source dimensions include section, grade, designation, subsidy amount, and attendance-related fields. The focus is on transparent allocation totals, category comparison, reconciliation, and explainable exception review—not automated employment decisions.',
    contributions: [
      'Structured monthly and section-level subsidy reporting.',
      'Designed filters for organizational and eligibility-relevant categories.',
      'Supported reconciliation of subsidy totals and investigation of reporting anomalies.',
      'Prioritized responsible handling of confidential employee-related records.'
    ],
    math: 'Group total subsidy by month, section, and category; reconcile allocations to authorized source records and track changes over time.',
    tools: ['Base44', 'Dashboard Design', 'Data Governance', 'Reporting'],
    repo: '',
    // To show a live link only after you confirm the app contains no sensitive employee records:
    // demo: 'https://subsidy-insight-flow.base44.app',
    demo: '', image: '',
    note: 'Developed a workforce subsidy governance and analytics framework to examine allocation patterns, attendance, employee grades, and departmental distributions. The project emphasizes transparency, data consistency, and evidence-based resource allocation while respecting employee data confidentiality.',
  },
  {
    slug: 'free-fund-financial-allocation',
    number: '05',
    short: 'Finance · Fund Allocation',
    title: 'Free Fund, Departmental Allocation & Profitability Analysis',
    description: 'Relating available cash, operational expenditure, costing-versus-actual variances, and departmental use of funds.',
    detail: 'Developed and designed financial decision-support analyses for free-fund visibility, expense allocation, departmental cost comparisons, and buyer/style-level costing-versus-actual evaluation. A normalized per-Tk-100 free-fund perspective helps explain where limited available funds go, alongside actual BDT totals. The analysis explicitly separates cash availability from accounting profitability.',
    contributions: [
      'Explored a transparent flow from receipts and deductions to funds available for allocation.',
      'Compared allocations and operational spending across organizational departments.',
      'Analyzed overhead per piece, costing-versus-actual variances, and contribution views.',
      'Raised questions about allocating scarce funds when operational needs and receipts are uncertain.'
    ],
    math: 'Free fund = eligible available proceeds minus the applicable deductions and commitments. Allocation ratios are expressed as shares of the same reconciled denominator.',
    tools: ['Financial Analytics', 'Tableau', 'Scenario Analysis', 'Cost Variance'],
    repo: '', demo: '', image: '',
    note: 'This project combines analysis and dashboard design. No specific financing balances, customer terms, or confidential monetary figures are published.'
  },
  {
    slug: 'banking-fund-exposure',
    number: '06',
    short: 'Banking · Financial Reconciliation',
    title: 'FC/SND Fund Consolidation & Banking Deductions',
    description: 'Bringing fund positions, exchange-rate conventions, banking adjustments, and restricted balances into a comparable view.',
    detail: 'Worked on consolidated financial reporting across organizational units and banking categories, including foreign-currency balances, special-notice deposits, relevant financing adjustments, and other export-related deductions. Emphasis was placed on source reconciliation, currency treatment, cutoff dates, and the distinction between reported balances and funds available for discretionary allocation.',
    contributions: [
      'Consolidated category-based balance and fund-availability views.',
      'Examined how banking and financing deductions affect allocable resources.',
      'Separated exchange-rate assumptions and dates from underlying currency amounts.',
      'Structured summaries so managers can trace aggregates to their categories.'
    ],
    math: 'Reconcile each balance at a documented date and currency basis; distinguish gross reported balances, restricted amounts, applicable deductions, and usable funds.',
    tools: ['Financial Reporting', 'Excel', 'Tableau', 'Reconciliation'],
    repo: '', demo: '', image: '',
    note: 'Bank balances, customer terms, identifiers, and institution-specific exposures are intentionally omitted.'
  },
  {
    slug: 'utilities-continuity-planning',
    number: '07',
    short: 'Utilities · Continuity',
    title: 'Electricity, Gas & Diesel Cost and Continuity Scenarios',
    description: 'Connecting energy consumption, generator operating time, load shedding, and hypothetical supply disruptions to daily cost.',
    detail: 'Structured utility analysis spanning electricity, gas, diesel, meter readings, load-shedding hours, generator operation, and cost. Scenario views compare alternative operating conditions, such as different levels of grid interruption or generator usage, while emphasizing engineering feasibility and the production load behind each estimate.',
    contributions: [
      'Brought different utility measurements into a unified daily reporting framework.',
      'Examined generator-hour, fuel-use, and cost relationships.',
      'Designed comparative scenarios around interruptions and alternative energy sources.',
      'Linked the reliability of energy assumptions to production planning.'
    ],
    math: 'Estimated operating cost is a function of electricity, gas, diesel consumption, generator time, and operating load under stated tariff and equipment assumptions.',
    tools: ['Utility Analytics', 'Scenario Modeling', 'Dashboards'],
    repo: '', demo: '', image: '',
    note: 'Contingency scenarios are hypothetical and should not be treated as measured counterfactual outcomes.'
  },
  {
    slug: 'smv-machine-learning',
    number: '08',
    short: 'Predictive Analytics · Later-Stage Work',
    title: 'Predictive SMV & Costing-versus-Actual Analysis',
    description: 'Using machine learning to estimate processing-minute requirements and examine how uncertainty affects planning decisions.',
    detail: 'Built data preparation and Random Forest/XGBoost predictive workflows for Standard Minute Value estimation using manufacturing characteristics. Related analysis explored differences between costing SMV and actual observed SMV to inform pre-study, capacity planning, and model validation. The predictive work followed earlier production visibility and allocation analytics in the portfolio narrative.',
    contributions: [
      'Developed model training and validation workflows for estimating SMV.',
      'Investigated construction, gauge, machine speed, operation, and material features.',
      'Compared estimated and observed minutes with interpretable error metrics.',
      'Connected uncertainty in predictions to potential production and allocation risks.'
    ],
    math: 'Predict SMV as a function of style and machine characteristics; test how changes in estimated minutes affect feasibility and capacity decisions.',
    tools: ['Python', 'Random Forest', 'XGBoost', 'scikit-learn'],
    repo: '', demo: '', image: '',
    note: 'Model descriptions exclude proprietary records, individual customer information, and non-public operating details.'
  },
  {
    slug: 'facility-location-routing',
    number: '09',
    short: 'Operations Research · Academic',
    title: 'Geographic Facility Location and Metric Routing in Poland',
    description: 'Connecting geographic coverage, mixed-integer set covering, exact traveling-salesperson models, and approximation algorithms.',
    detail: 'A research-oriented computational project combining a minimum set-covering model, exact traveling-salesperson formulations, and a Christofides approximation benchmark. The facility-location stage identifies candidate sites that cover locations within a specified geographic radius; the routing stage studies subtour-elimination methods and graph-based approximation.',
    contributions: [
      'Formulated geographic coverage as a minimum set-covering problem.',
      'Implemented metric TSP models using degree constraints and subtour elimination.',
      'Studied iterative constraint generation.',
      'Compared exact formulations with the Christofides approximation approach.'
    ],
    math: 'Minimize selected facilities subject to coverage requirements; compare exact metric routing with a polynomial-time approximation.',
    tools: ['Python', 'Gurobi', 'PuLP', 'SciPy/HiGHS', 'NetworkX'],
    repo: 'https://github.com/perpendicooler/Elementary-Research-for-Steamboat-Willie-s-Store-in-Poland',
    demo: '', image: '',
    note: 'An academic/portfolio project. Computational benchmark details are not asserted without their corresponding result files.'
  },
  {
    slug: 'posets-lattices',
    number: '10',
    short: 'Combinatorics · Academic Research',
    title: 'Matrix Methods for Posets and Lattices',
    description: 'Exploring matrix-based representations of partially ordered sets and combinatorial lattice structures.',
    detail: 'As a SUST Research Center research student, worked on matrix methods for combinatorial aspects of partially ordered sets and lattices. The project included MATLAB-supported computational investigation and mathematical analysis under project investigator Dr. Mohammad Salah Uddin.',
    contributions: [
      'Investigated matrix representations of partially ordered sets.',
      'Used MATLAB for related mathematical computation.',
      'Examined properties of finite combinatorial structures.',
      'Completed research work through the SUST Research Center project.'
    ],
    math: 'A relation matrix can encode the partial order: A_ij = 1 when element i is less than or equal to element j, and 0 otherwise.',
    tools: ['MATLAB', 'Combinatorics', 'Partial Orders', 'Lattice Theory'],
    repo: '', demo: '', image: '',
    note: 'SUST Research Center project PS/2023/1/19, September 2023–May 2024.'
  }
];
