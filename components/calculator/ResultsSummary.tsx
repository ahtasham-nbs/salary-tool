import { SalaryCalculation } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface ResultsSummaryProps {
  calculation: SalaryCalculation;
  showPF: boolean;
}

export default function ResultsSummary({ calculation, showPF }: ResultsSummaryProps) {
  const {
    grossSalary,
    taxFreePortion,
    taxableSalary,
    taxPerMonth,
    salaryAfterTax,
    pfDeduction
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
        <h5 className="text-gray-600 mb-2">Monthly Deductions</h5>
        <div className="text-2xl font-semibold text-red-600">
          PKR {formatCurrency(taxPerMonth + (showPF ? pfDeduction : 0))}
        </div>
        <div className="text-sm text-gray-500">
          Tax: PKR {formatCurrency(taxPerMonth)}
          {showPF && ` | PF: PKR ${formatCurrency(pfDeduction)}`}
        </div>
      </div>
      
      <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
        <h5 className="text-gray-600 mb-3">Salary Breakdown</h5>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p>Gross Monthly Salary: <span className="font-bold">{formatCurrency(grossSalary)}</span></p>
            <p>Tax-Free Component (10%): <span className="font-bold">{formatCurrency(taxFreePortion)}</span></p>
            {showPF && <p>PF Deduction (5%): <span className="font-bold text-red-600">{formatCurrency(pfDeduction)}</span></p>}
          </div>
          <div>
            <p>Taxable Monthly Salary: <span className="font-bold">{formatCurrency(taxableSalary)}</span></p>
            <p>Monthly Tax: <span className="font-bold text-red-600">{formatCurrency(taxPerMonth)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
} 