'use client';

import { useState, useEffect } from 'react';
import SalaryInput from './calculator/SalaryInput';
import ResultsSummary from './calculator/ResultsSummary';
import AllowancesSection from './calculator/AllowancesSection';
import GrandTotal from './calculator/GrandTotal';
import { calculateSalaryBreakdown } from '@/utils/calculations';
import { Allowances } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  SALARY: 'salary_calculator_salary',
  ALLOWANCES: 'salary_calculator_allowances'
};

// Initial allowances state
const initialAllowances: Allowances = {
  fuel: {
    pricePerLiter: 0,
    quantity: 0,
    total: 0
  },
  medical: 0,
  internet: 0,
  gym: 0,
  total: 0
};

export default function SalaryCalculator() {
  const [salary, setSalary] = useState<number>(0);
  const [allowances, setAllowances] = useState<Allowances>(initialAllowances);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // Load salary
        const savedSalary = localStorage.getItem(STORAGE_KEYS.SALARY);
        if (savedSalary !== null) {
          const parsedSalary = parseFloat(savedSalary);
          if (!isNaN(parsedSalary)) {
            setSalary(parsedSalary);
          }
        }

        // Load allowances
        const savedAllowances = localStorage.getItem(STORAGE_KEYS.ALLOWANCES);
        if (savedAllowances !== null) {
          try {
            const parsedAllowances = JSON.parse(savedAllowances) as Allowances;
            // Validate the parsed data has the expected structure
            if (parsedAllowances && 
                typeof parsedAllowances === 'object' && 
                'fuel' in parsedAllowances &&
                'medical' in parsedAllowances &&
                'internet' in parsedAllowances &&
                'gym' in parsedAllowances) {
              setAllowances(parsedAllowances);
            }
          } catch (parseError) {
            console.error('Error parsing allowances:', parseError);
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  // Save salary to localStorage whenever it changes
  const handleSalaryChange = (newSalary: number) => {
    setSalary(newSalary);
    try {
      if (!isNaN(newSalary)) {
        localStorage.setItem(STORAGE_KEYS.SALARY, newSalary.toString());
      }
    } catch (error) {
      console.error('Error saving salary:', error);
    }
  };

  // Save allowances to localStorage whenever they change
  const handleAllowancesChange = (newAllowances: Allowances) => {
    setAllowances(newAllowances);
    try {
      localStorage.setItem(STORAGE_KEYS.ALLOWANCES, JSON.stringify(newAllowances));
    } catch (error) {
      console.error('Error saving allowances:', error);
    }
  };

  const calculation = calculateSalaryBreakdown(salary);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Salary & Tax Calculator
        </h2>
        <button
          onClick={() => {
            try {
              localStorage.removeItem(STORAGE_KEYS.SALARY);
              localStorage.removeItem(STORAGE_KEYS.ALLOWANCES);
              setSalary(0);
              setAllowances(initialAllowances);
            } catch (error) {
              console.error('Error clearing data:', error);
            }
          }}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          Reset All
        </button>
      </div>
      
      <SalaryInput 
        value={salary} 
        onChange={handleSalaryChange} 
      />
      
      <ResultsSummary calculation={calculation} />
      
      <AllowancesSection 
        allowances={allowances}
        setAllowances={handleAllowancesChange}
      />

      <GrandTotal 
        salaryCalculation={calculation}
        allowances={allowances}
      />
    </div>
  );
} 