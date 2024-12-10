import { SalaryCalculation, Allowances } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface GrandTotalProps {
  salaryCalculation: SalaryCalculation;
  allowances: Allowances;
}

export default function GrandTotal({ salaryCalculation, allowances }: GrandTotalProps) {
  const grandTotal = salaryCalculation.salaryAfterTax + allowances.total;

  return (
    <div className="mt-6">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
        <h5 className="text-lg font-semibold text-gray-700 mb-4">Grand Total Breakdown</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-gray-600">
              <span>Take-Home Salary:</span>
              <span className="font-medium">PKR {formatCurrency(salaryCalculation.salaryAfterTax)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Total Allowances:</span>
              <span className="font-medium">PKR {formatCurrency(allowances.total)}</span>
            </div>
            <div className="h-px bg-gray-200 my-3"></div>
            <div className="flex justify-between items-center text-lg font-bold text-green-700">
              <span>Grand Total:</span>
              <span>PKR {formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <div className="bg-white bg-opacity-60 rounded-lg p-4">
            <h6 className="text-sm font-medium text-gray-600 mb-3">Monthly Benefits Breakdown</h6>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Base Salary (After Tax):</span>
                <span>{formatCurrency(salaryCalculation.salaryAfterTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Allowance:</span>
                <span>{formatCurrency(allowances.fuel.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Medical Allowance:</span>
                <span>{formatCurrency(allowances.medical)}</span>
              </div>
              <div className="flex justify-between">
                <span>Internet Allowance:</span>
                <span>{formatCurrency(allowances.internet)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gym Allowance:</span>
                <span>{formatCurrency(allowances.gym)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 