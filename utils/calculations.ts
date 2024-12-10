import { SalaryCalculation } from '@/types';

export function calculateTax24to25(amount: number): number {
  let taxAmount = 0;
  
  if (amount > 600000 && amount <= 1200000) {
    taxAmount = (amount - 600000) * 0.05;
  } else if (amount > 1200000 && amount <= 2200000) {
    taxAmount = 30000 + (amount - 1200000) * 0.15;
  } else if (amount > 2200000 && amount <= 3200000) {
    taxAmount = 180000 + (amount - 2200000) * 0.25;
  } else if (amount > 3200000 && amount <= 4100000) {
    taxAmount = 430000 + (amount - 3200000) * 0.3;
  } else if (amount > 4100000) {
    taxAmount = 700000 + (amount - 4100000) * 0.35;
  }
  
  return Math.round(taxAmount);
}

export function calculateSalaryBreakdown(monthlySalary: number): SalaryCalculation {
  const taxFreePortion = monthlySalary * 0.1;
  const taxableSalary = monthlySalary - taxFreePortion;
  const yearlyTaxableSalary = taxableSalary * 12;
  const yearlyTax = calculateTax24to25(yearlyTaxableSalary);
  const monthlyTax = yearlyTax / 12;
  const salaryAfterTax = taxableSalary - monthlyTax + taxFreePortion;

  return {
    grossSalary: monthlySalary,
    taxFreePortion,
    taxableSalary,
    taxPerMonth: monthlyTax,
    salaryAfterTax
  };
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
} 