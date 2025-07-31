export interface SalaryCalculation {
  grossSalary: number;
  taxFreePortion: number;
  taxableSalary: number;
  taxPerMonth: number;
  salaryAfterTax: number;
  pfDeduction: number;
  eobiDeduction: number;
  year?: '2024-2025' | '2025-2026';
}

export interface Allowances {
  fuel: {
    pricePerLiter: number;
    quantity: number;
    total: number;
  };
  medical: number;
  internet: number;
  gym: number;
  total: number;
} 