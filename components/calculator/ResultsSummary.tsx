import { SalaryCalculation, TaxYear } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface ResultsSummaryProps {
  calculation: SalaryCalculation;
  showPF: boolean;
  selectedYear?: TaxYear;
}

export default function ResultsSummary({ calculation, showPF, selectedYear = '2026-2027' }: ResultsSummaryProps) {
  const {
    grossSalary,
    taxFreePortion,
    taxableSalary,
    taxPerMonth,
    salaryAfterTax,
    pfDeduction,
    eobiDeduction
  } = calculation;

  const totalDeductions = taxPerMonth + (showPF ? pfDeduction : 0) + eobiDeduction;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Take-Home card */}
      <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-slate-600">Monthly Take-Home</h5>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </span>
        </div>
        <div className="mt-2 text-2xl sm:text-3xl font-bold text-emerald-600 tabular-nums">
          <span className="text-base font-semibold text-emerald-500/80 align-top mr-1">PKR</span>
          {formatCurrency(salaryAfterTax)}
        </div>
        <div className="mt-1 text-sm text-slate-500">After all deductions</div>
      </div>

      {/* Deductions card */}
      <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-slate-600">Monthly Deductions</h5>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
        <div className="mt-2 text-2xl sm:text-3xl font-bold text-rose-600 tabular-nums">
          <span className="text-base font-semibold text-rose-500/80 align-top mr-1">PKR</span>
          {formatCurrency(totalDeductions)}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="inline-flex rounded-md bg-white/70 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-rose-100">
            Tax ({selectedYear}): {formatCurrency(taxPerMonth)}
          </span>
          {showPF && (
            <span className="inline-flex rounded-md bg-white/70 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-rose-100">
              PF: {formatCurrency(pfDeduction)}
            </span>
          )}
          <span className="inline-flex rounded-md bg-white/70 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-rose-100">
            EOBI: {formatCurrency(eobiDeduction)}
          </span>
        </div>
      </div>

      {/* Breakdown card */}
      <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <h5 className="text-sm font-semibold text-slate-700 mb-3">Salary Breakdown</h5>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-2.5">
            <dt className="text-slate-600">Gross Monthly Salary</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{formatCurrency(grossSalary)}</dd>
          </div>
          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-2.5">
            <dt className="text-slate-600">Taxable Monthly Salary</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{formatCurrency(taxableSalary)}</dd>
          </div>
          <div className="flex justify-between items-center sm:border-b sm:border-dashed sm:border-slate-100 sm:pb-2.5">
            <dt className="text-slate-600">Tax-Free Component (10%)</dt>
            <dd className="font-semibold text-emerald-600 tabular-nums">{formatCurrency(taxFreePortion)}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-slate-600">Monthly Tax ({selectedYear})</dt>
            <dd className="font-semibold text-rose-600 tabular-nums">{formatCurrency(taxPerMonth)}</dd>
          </div>
          {showPF && (
            <div className="flex justify-between items-center">
              <dt className="text-slate-600">PF Deduction (5%)</dt>
              <dd className="font-semibold text-rose-600 tabular-nums">{formatCurrency(pfDeduction)}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
} 