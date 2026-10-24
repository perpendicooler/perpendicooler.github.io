"""A fully synthetic two-day knitting *product* allocation example.

Reproduces the comparison in the portfolio article. No confidential factory data.
Requires scipy, numpy (tested with SciPy 1.17). Product quantities and all
assignments are whole pieces. Capacities apply separately to each day.
"""
import csv
from pathlib import Path
import numpy as np
from scipy.optimize import Bounds, LinearConstraint, milp

DAYS = ("2026-11-02", "2026-11-03")
POOLS = ("A", "B")
DAILY_CAP = 1320 * .85  # one machine per illustrative group
# Product: (quantity, fictional FOB, allowed days, machine: (booking SMV, bulk SMV))
PRODUCTS = {
    "P1": (24, 9.0, DAYS, {"A": (65, 70), "B": (60, 45)}),
    "P2": (18, 6.0, DAYS, {"A": (55, 50), "B": (72, 70)}),
    "P3": (12, 5.0, DAYS, {"A": (60, 62), "B": (58, 55)}),
    "P4": (14, 12.0, (DAYS[0],), {"B": (88, 80)}),
}
BASELINE = {  # product, pool, date : integer pieces
    ("P1", "A", DAYS[1]): 16,
    ("P1", "B", DAYS[1]): 8,
    ("P2", "A", DAYS[0]): 18,
    ("P3", "B", DAYS[1]): 12,
    ("P4", "B", DAYS[0]): 14,
}

keys = [(p, g, d) for p, (_, _, dates, smvs) in PRODUCTS.items() for g in smvs for d in dates]
obj = np.asarray([PRODUCTS[p][3][g][1] for p, g, d in keys], dtype=float)
A = []
lo = []
hi = []
for p, (qty, _, _, _) in PRODUCTS.items():
    A.append([1 if item[0] == p else 0 for item in keys]); lo.append(qty); hi.append(qty)
for g in POOLS:
    for d in DAYS:
        A.append([PRODUCTS[p][3][machine][1] if machine == g and date == d else 0 for p, machine, date in keys]); lo.append(-np.inf); hi.append(DAILY_CAP)
result = milp(c=obj, integrality=np.ones(len(keys)), bounds=Bounds(np.zeros(len(keys)), np.full(len(keys), np.inf)), constraints=LinearConstraint(np.asarray(A, dtype=float), np.asarray(lo), np.asarray(hi)), options={'mip_rel_gap': 0.0})
if result.x is None or result.status != 0:
    raise RuntimeError(f"No proven optimal plan: {result.message} (status={result.status})")
optimized = {k: int(round(v)) for k, v in zip(keys, result.x) if v > .5}

def evaluate(plan):
    per_product = {p: 0 for p in PRODUCTS}
    loads = {(g, d): 0.0 for g in POOLS for d in DAYS}
    bulk_total = booking_total = 0.0
    for (p, g, d), qty in plan.items():
        assert isinstance(qty, int) and qty >= 0 and g in PRODUCTS[p][3] and d in PRODUCTS[p][2]
        per_product[p] += qty
        booking, bulk = PRODUCTS[p][3][g]
        bulk_total += qty * bulk
        booking_total += qty * booking
        loads[g, d] += qty * bulk
    for p, (qty, _, _, _) in PRODUCTS.items(): assert per_product[p] == qty, (p, per_product[p], qty)
    for key, val in loads.items(): assert val <= DAILY_CAP + 1e-6, (key, val)
    return int(booking_total), int(bulk_total), loads

bb, bm, bl = evaluate(BASELINE)
ob, om, ol = evaluate(optimized)
print('Status:', result.message)
print('Daily capacity per machine group:', DAILY_CAP)
print('Baseline booking estimates:', bb, 'baseline bulk minutes:', bm)
print('Optimized bulk minutes:', om, 'saving vs the SAME bulk-rate baseline:', bm - om, f'({(bm - om) / bm:.2%})')
print('Baseline:', BASELINE)
print('Optimized:', optimized)
print('Baseline load:', bl)
print('Optimized load:', ol)
print('Solver MIP gap:', result.mip_gap)
assert bm == 4160 and om == 3844 and (bm - om) == 316, (bm, om)
assert bb == 4438, bb

out_dir = Path(__file__).parent
with (out_dir / 'daily_allocation.csv').open('w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(['scenario', 'product', 'machine_group', 'date', 'pieces', 'booking_smv', 'bulk_smv', 'bulk_minutes'])
    for scenario, plan in [('planner_draft', BASELINE), ('milp_optimum', optimized)]:
        for (p,g,d),q in sorted(plan.items()):
            booking, bulk = PRODUCTS[p][3][g]
            w.writerow([scenario,p,g,d,q,booking,bulk,q*bulk])
with (out_dir / 'daily_utilization.csv').open('w',newline='',encoding='utf-8') as f:
    w = csv.writer(f);w.writerow(['scenario','machine_group','date','bulk_minutes','effective_capacity','utilization_pct'])
    for scenario, load in [('planner_draft', bl), ('milp_optimum', ol)]:
        for (g,d),mins in sorted(load.items()): w.writerow([scenario,g,d,int(mins),int(DAILY_CAP),round(100*mins/DAILY_CAP,2)])
