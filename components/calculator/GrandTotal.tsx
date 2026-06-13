import { SalaryCalculation, Allowances } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface GrandTotalProps {
  salaryCalculation: SalaryCalculation;
  allowances: Allowances;
  showPF: boolean;
}

export default function GrandTotal({ salaryCalculation, allowances, showPF }: GrandTotalProps) {
  const grandTotal = salaryCalculation.salaryAfterTax + allowances.total;

  return (
    <div className="mt-8">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-card">
        {/* Subtle brand accent bar keeps this as the hero result without flooding blue */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700" />

        <div className="flex items-center gap-2.5 mb-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </span>
          <h5 className="text-lg font-semibold tracking-tight text-slate-900">Grand Total Breakdown</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Gross Salary</span>
              <span className="font-semibold text-slate-900 tabular-nums">PKR {formatCurrency(salaryCalculation.grossSalary)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Tax Deduction</span>
              <span className="font-semibold text-rose-600 tabular-nums">−PKR {formatCurrency(salaryCalculation.taxPerMonth)}</span>
            </div>
            {showPF && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">PF Deduction</span>
                <span className="font-semibold text-rose-600 tabular-nums">−PKR {formatCurrency(salaryCalculation.pfDeduction)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">EOBI Deduction</span>
              <span className="font-semibold text-rose-600 tabular-nums">−PKR {formatCurrency(salaryCalculation.eobiDeduction)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Total Allowances</span>
              <span className="font-semibold text-emerald-600 tabular-nums">+PKR {formatCurrency(allowances.total)}</span>
            </div>
            <div className="h-px bg-slate-200 my-3"></div>
            <div className="flex justify-between items-baseline rounded-xl bg-emerald-50 ring-1 ring-emerald-100 px-4 py-3">
              <span className="text-base font-semibold text-emerald-800">Grand Total</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tabular-nums">PKR {formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200/80 p-4">
            <h6 className="text-sm font-semibold text-slate-700 mb-3">Monthly Benefits Breakdown</h6>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Base Salary (After Tax)</span>
                <span className="font-medium text-emerald-600 tabular-nums">{formatCurrency(salaryCalculation.salaryAfterTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fuel Allowance</span>
                <span className="font-medium text-slate-700 tabular-nums">{formatCurrency(allowances.fuel.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Medical Allowance</span>
                <span className="font-medium text-slate-700 tabular-nums">{formatCurrency(allowances.medical)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Internet Allowance</span>
                <span className="font-medium text-slate-700 tabular-nums">{formatCurrency(allowances.internet)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Gym Allowance</span>
                <span className="font-medium text-slate-700 tabular-nums">{formatCurrency(allowances.gym)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 