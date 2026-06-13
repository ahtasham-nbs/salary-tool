'use client';

import { Allowances } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface AllowancesSectionProps {
  allowances: Allowances;
  setAllowances: (allowances: Allowances) => void;
}

export default function AllowancesSection({ allowances, setAllowances }: AllowancesSectionProps) {
  const updateFuelAllowance = (price: number, quantity: number) => {
    const fuelTotal = price * quantity;
    const newAllowances = {
      ...allowances,
      fuel: {
        pricePerLiter: price,
        quantity,
        total: fuelTotal
      },
      total: fuelTotal + allowances.medical + allowances.internet + allowances.gym
    };
    setAllowances(newAllowances);
  };

  const updateAllowance = (type: 'medical' | 'internet' | 'gym', value: number) => {
    const newAllowances = {
      ...allowances,
      [type]: value
    };
    // Recalculate total
    newAllowances.total = newAllowances.fuel.total + 
                         newAllowances.medical + 
                         newAllowances.internet + 
                         newAllowances.gym;
    setAllowances(newAllowances);
  };

  const inputClassName = "w-full pl-14 py-2.5 text-slate-900 tabular-nums bg-white border border-slate-300 rounded-lg shadow-sm outline-none placeholder:text-slate-400 hover:border-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all";

  return (
    <div className="mt-2">
      <div className="bg-slate-50 ring-1 ring-slate-200/80 rounded-xl p-5 sm:p-6">
        {/* Fuel Allowance Section */}
        <div className="mb-6">
          <h6 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5V18a1.5 1.5 0 001.5 1.5h7A1.5 1.5 0 0013 18v-9A1.5 1.5 0 0011.5 7.5h-7A1.5 1.5 0 003 9v4.5zm0 0H1.5m1.5-3h10M16 9l2.5-1.5M16 9v6.75a2.25 2.25 0 004.5 0V6.31a1.5 1.5 0 00-.44-1.06l-1.81-1.81" />
            </svg>
            Fuel Allowance
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-400">PKR</span>
                <input
                  type="number"
                  inputMode="decimal"
                  className={`${inputClassName} pr-16`}
                  placeholder="Price per liter"
                  value={allowances.fuel.pricePerLiter || ''}
                  onChange={(e) => updateFuelAllowance(
                    parseFloat(e.target.value) || 0,
                    allowances.fuel.quantity
                  )}
                />
                <span className="absolute right-3 text-xs font-medium text-slate-400">/Liter</span>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-full pl-4 pr-16 py-2.5 text-slate-900 tabular-nums bg-white border border-slate-300 rounded-lg shadow-sm outline-none placeholder:text-slate-400 hover:border-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                  placeholder="Allowed quantity"
                  value={allowances.fuel.quantity || ''}
                  onChange={(e) => updateFuelAllowance(
                    allowances.fuel.pricePerLiter,
                    parseFloat(e.target.value) || 0
                  )}
                />
                <span className="absolute right-3 text-xs font-medium text-slate-400">Liters</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-brand-100 bg-brand-50 px-4 py-2.5">
            <span className="text-sm font-medium text-brand-700">Total Fuel Allowance</span>
            <span className="text-sm font-bold text-brand-700 tabular-nums">
              PKR {formatCurrency(allowances.fuel.total)}
            </span>
          </div>
        </div>

        {/* Other Allowances Section */}
        <div>
          <h6 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            Other Allowances
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Medical Allowance */}
            <div>
              <label htmlFor="allowance-medical" className="block text-sm font-medium text-slate-600 mb-1.5">
                Medical Allowance
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-400">PKR</span>
                <input
                  id="allowance-medical"
                  type="number"
                  inputMode="decimal"
                  className={inputClassName}
                  placeholder="Amount"
                  value={allowances.medical || ''}
                  onChange={(e) => updateAllowance('medical', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Internet Allowance */}
            <div>
              <label htmlFor="allowance-internet" className="block text-sm font-medium text-slate-600 mb-1.5">
                Internet Allowance
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-400">PKR</span>
                <input
                  id="allowance-internet"
                  type="number"
                  inputMode="decimal"
                  className={inputClassName}
                  placeholder="Amount"
                  value={allowances.internet || ''}
                  onChange={(e) => updateAllowance('internet', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Gym Allowance */}
            <div>
              <label htmlFor="allowance-gym" className="block text-sm font-medium text-slate-600 mb-1.5">
                Gym Allowance
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-400">PKR</span>
                <input
                  id="allowance-gym"
                  type="number"
                  inputMode="decimal"
                  className={inputClassName}
                  placeholder="Amount"
                  value={allowances.gym || ''}
                  onChange={(e) => updateAllowance('gym', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Reimbursements Summary */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h6 className="text-sm font-medium text-slate-600 mb-1">Total Monthly Reimbursements</h6>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 tabular-nums">
                <span className="text-base font-semibold text-emerald-500/80 align-top mr-1">PKR</span>
                {formatCurrency(allowances.total)}
              </div>
            </div>
            <dl className="space-y-1.5 text-sm sm:border-l sm:border-slate-100 sm:pl-6">
              <div className="flex justify-between">
                <dt className="text-slate-500">Fuel</dt>
                <dd className="font-medium text-slate-700 tabular-nums">PKR {formatCurrency(allowances.fuel.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Medical</dt>
                <dd className="font-medium text-slate-700 tabular-nums">PKR {formatCurrency(allowances.medical)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Internet</dt>
                <dd className="font-medium text-slate-700 tabular-nums">PKR {formatCurrency(allowances.internet)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Gym</dt>
                <dd className="font-medium text-slate-700 tabular-nums">PKR {formatCurrency(allowances.gym)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 