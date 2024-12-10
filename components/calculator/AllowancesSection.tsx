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

  const inputClassName = "w-full pl-16 py-2 border border-gray-200 rounded outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all";
  
  return (
    <div className="mt-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-gray-600 mb-4">Reimbursements & Allowances</h5>
        
        {/* Fuel Allowance Section */}
        <div className="mb-6">
          <h6 className="text-blue-600 mb-3">Fuel Allowance</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="flex items-center">
                <span className="absolute left-3 text-gray-500">PKR</span>
                <input
                  type="number"
                  className={`${inputClassName} pr-16`}
                  placeholder="Price per Liter"
                  value={allowances.fuel.pricePerLiter || ''}
                  onChange={(e) => updateFuelAllowance(
                    parseFloat(e.target.value) || 0,
                    allowances.fuel.quantity
                  )}
                />
                <span className="absolute right-3 text-gray-500">/Liter</span>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="number"
                  className={`${inputClassName} pr-16`}
                  placeholder="Allowed Quantity"
                  value={allowances.fuel.quantity || ''}
                  onChange={(e) => updateFuelAllowance(
                    allowances.fuel.pricePerLiter,
                    parseFloat(e.target.value) || 0
                  )}
                />
                <span className="absolute right-3 text-gray-500">Liters</span>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-700">
              Total Fuel Allowance: PKR <span className="font-bold">
                {formatCurrency(allowances.fuel.total)}
              </span>
            </p>
          </div>
        </div>

        {/* Other Allowances Section */}
        <div>
          <h6 className="text-blue-600 mb-3">Other Allowances</h6>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Medical Allowance */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Medical Allowance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">PKR</span>
                <input
                  type="number"
                  className={inputClassName}
                  placeholder="Amount"
                  value={allowances.medical || ''}
                  onChange={(e) => updateAllowance('medical', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Internet Allowance */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Internet Allowance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">PKR</span>
                <input
                  type="number"
                  className={inputClassName}
                  placeholder="Amount"
                  value={allowances.internet || ''}
                  onChange={(e) => updateAllowance('internet', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Gym Allowance */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Gym Allowance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">PKR</span>
                <input
                  type="number"
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
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-gray-700 mb-2">Total Monthly Reimbursements</h6>
              <div className="text-2xl text-green-600 font-semibold">
                PKR {formatCurrency(allowances.total)}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div>Fuel: PKR {formatCurrency(allowances.fuel.total)}</div>
              <div>Medical: PKR {formatCurrency(allowances.medical)}</div>
              <div>Internet: PKR {formatCurrency(allowances.internet)}</div>
              <div>Gym: PKR {formatCurrency(allowances.gym)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 