export const projects = [
  {
    slug: 'facility-location-routing', number: '01', short: 'Network & Location Optimization',
    title: 'Geographic Facility Location and Metric Routing in Poland',
    description: 'From geographic coverage to vehicle routing: mathematical programming and approximation algorithms for location–routing decisions.',
    detail: 'A research-oriented computational project that connects a minimum set-covering model, exact Traveling Salesperson Problem (TSP) formulations, and the Christofides approximation algorithm. The facility-location stage identifies candidate store sites capable of covering populated locations within a 50 km radius. The routing stage contrasts exact mixed-integer optimization and graph-based approximation methods.',
    contributions: ['Formulated a set-covering optimization model for a 50-km geographic coverage requirement.', 'Implemented exact metric TSP models with degree and subtour-elimination constraints.', 'Compared explicit subtour formulations with iterative constraint generation.', 'Implemented Christofides’ approach using spanning trees, minimum-weight matching, Eulerian traversal, and shortcutting.'],
    math: 'Minimize selected facilities subject to a geographic coverage constraint. Compare exact routing solutions with a polynomial-time approximation.',
    tools: ['Python', 'Gurobi', 'PuLP', 'SciPy/HiGHS', 'NetworkX'],
    repo: 'https://github.com/perpendicooler/Elementary-Research-for-Steamboat-Willie-s-Store-in-Poland',
    note: 'Project details reflect the work described in the uploaded CV. Specific computational benchmarks are not asserted here.'
  },
  {
    slug: 'manufacturing-capacity', number: '02', short: 'Scenario Analysis · Manufacturing',
    title: 'Manufacturing Capacity and Resource Allocation',
    description: 'What-if models to evaluate production capacity, machine utilization, efficiency assumptions, and resource allocation trade-offs.',
    detail: 'Built quantitative planning models linking available production minutes to projected output and operational constraints. The models examine changes in operating days, machine availability, standard minute values, efficiency, and planned production volume. Alternative scenarios help planners identify capacity gaps and translate planning assumptions into feasible operating targets.',
    contributions: ['Compared required and available production minutes under alternative assumptions.', 'Evaluated capacity and performance under different working-day, machine, and efficiency scenarios.', 'Identified potential bottlenecks and trade-offs across manufacturing stages.', 'Built analytics to support operational decision-making and production-planning discussions.'],
    math: 'Available minutes = machines × operating minutes per machine × days × efficiency. Production feasibility compares available minutes against planned quantity × SMV.',
    tools: ['Python', 'SQL', 'Tableau', 'Scenario analysis'],
    repo: '', note: 'Operational examples are described at a methodological level to protect employer-sensitive data.'
  },
  {
    slug: 'smv-machine-learning', number: '03', short: 'Predictive Analytics · Machine Learning',
    title: 'Predictive SMV and Manufacturing Decision Support',
    description: 'Random Forest and XGBoost workflows for estimating Standard Minute Values and supporting data-driven planning.',
    detail: 'Developed machine-learning workflows to estimate the Standard Minute Value (SMV) of manufacturing operations and connected the predictions to planning and operational analytics. Complementary analyses investigated machine transitions, downtime, bottlenecks, and production-loss implications.',
    contributions: ['Constructed predictive SMV modeling workflows using Random Forest and XGBoost.', 'Analyzed machine transitions, downtime patterns, and production bottlenecks.', 'Interpreted manufacturing cost and production implications of process differences.', 'Supported reporting through analytics and visualization tools.'],
    math: 'Estimate SMV with a fitted prediction function, then assess generalization using held-out data and appropriate error metrics.',
    tools: ['Python', 'scikit-learn', 'XGBoost', 'SQL', 'Tableau'],
    repo: '', note: 'The underlying plant datasets and confidential operational records are not included.'
  },
  {
    slug: 'posets-lattices', number: '04', short: 'Computational Mathematics · Research',
    title: 'Matrix Methods for Posets and Lattices',
    description: 'Studying finite partially ordered sets and lattice structures through matrix-based computational representations.',
    detail: 'Under a SUST Research Center project, investigated matrix representations of partially ordered sets and lattice-theoretic structures. Used MATLAB to support combinatorial analysis, identify structural relationships, and study algebraic properties.',
    contributions: ['Investigated incidence-like and matrix representations of combinatorial structures.', 'Implemented mathematical computations in MATLAB.', 'Studied lattice-theoretic properties through a computational mathematics perspective.', 'Completed the research project under Dr. Mohammad Salah Uddin.'],
    math: 'A partially ordered set (P, ≤) can be encoded by a relation matrix A with Aᵢⱼ = 1 if element i ≤ element j, and 0 otherwise.',
    tools: ['MATLAB', 'Combinatorics', 'Partial orders', 'Lattice theory'],
    repo: '', note: 'Research Student, SUST Research Center, September 2023 – May 2024.'
  }
];
