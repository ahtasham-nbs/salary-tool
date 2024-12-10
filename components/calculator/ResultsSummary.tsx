import { SalaryCalculation } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface ResultsSummaryProps {
  calculation: SalaryCalculation;
}

export default function ResultsSummary({ calculation }: ResultsSummaryProps) {
  const {
    grossSalary,
    taxFreePortion,
    taxableSalary,
    taxPerMonth,
    salaryAfterTax
  } = calculation;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-gray-600 mb-2">Monthly Take-Home</h5>
        <div className="text-2xl font-semibold text-green-600">
          PKR {formatCurrency(salaryAfterTax)}
        </div>
        <div className="text-sm text-gray-500">After all deductions</div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-gray-600 mb-2">Monthly Tax</h5>
        <div className="text-2xl font-semibold text-red-600">
          PKR {formatCurrency(taxPerMonth)}
        </div>
        <div className="text-sm text-gray-500">Tax deducted per month</div>
      </div>
      
      <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
        <h5 className="text-gray-600 mb-3">Salary Breakdown</h5>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p>Gross Monthly Salary: <span className="font-bold">{formatCurrency(grossSalary)}</span></p>
            <p>Tax-Free Component (10%): <span className="font-bold">{formatCurrency(taxFreePortion)}</span></p>
          </div>
          <div>
            <p>Taxable Monthly Salary: <span className="font-bold">{formatCurrency(taxableSalary)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
} 