import { SalaryCalculation } from '@/types';

export const EOBI_DEDUCTION = 320;

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

export function calculateTax25to26(amount: number): number {
  let originalAmount = amount;
  let taxAmount = 0;
  
  if (amount > 600000 && amount <= 1200000) {
    amount -= 600000;
    taxAmount = amount * 0.01;
  } else if (amount > 1200000 && amount <= 2200000) {
    amount -= 1200000;
    taxAmount = 6000 + amount * 0.11;
  } else if (amount > 2200000 && amount <= 3200000) {
    amount -= 2200000;
    taxAmount = 116000 + amount * 0.23;
  } else if (amount > 3200000 && amount <= 4100000) {
    amount -= 3200000;
    taxAmount = 346000 + amount * 0.30;
  } else if (amount > 4100000) {
    amount -= 4100000;
    taxAmount = 616000 + amount * 0.35;
  }

  if (originalAmount > 10000000) {
    taxAmount = taxAmount * 1.09;
  }

  return Math.round(taxAmount);
}

export function calculateTax(amount: number, year: '2024-2025' | '2025-2026'): number {
  if (year === '2025-2026') {
    return calculateTax25to26(amount);
  } else {
    return calculateTax24to25(amount);
  }
}

export function calculateSalaryBreakdown(monthlySalary: number, includePF: boolean = true, year: '2024-2025' | '2025-2026' = '2024-2025'): SalaryCalculation {
  if (!monthlySalary || isNaN(monthlySalary)) {
    return {
      grossSalary: 0,
      taxFreePortion: 0,
      taxableSalary: 0,
      taxPerMonth: 0,
      salaryAfterTax: 0,
      pfDeduction: 0,
      eobiDeduction: 0
    };
  }

  const taxFreePortion = monthlySalary * 0.1;
  const taxableSalary = monthlySalary - taxFreePortion;
  const yearlyTaxableSalary = taxableSalary * 12;
  const yearlyTax = calculateTax(yearlyTaxableSalary, year);
  const monthlyTax = yearlyTax / 12;
  const pfDeduction = includePF ? monthlySalary * 0.05 : 0;
  const eobiDeduction = EOBI_DEDUCTION;
  const salaryAfterTax = taxableSalary - monthlyTax + taxFreePortion - pfDeduction - eobiDeduction;

  return {
    grossSalary: monthlySalary,
    taxFreePortion,
    taxableSalary,
    taxPerMonth: monthlyTax,
    salaryAfterTax,
    pfDeduction,
    eobiDeduction
  };
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
} 