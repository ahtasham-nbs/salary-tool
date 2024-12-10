export interface SalaryCalculation {
  grossSalary: number;
  taxFreePortion: number;
  taxableSalary: number;
  taxPerMonth: number;
  salaryAfterTax: number;
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