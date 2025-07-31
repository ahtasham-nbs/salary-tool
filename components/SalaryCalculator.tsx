'use client';

import {useState, useEffect, useMemo} from 'react';
import SalaryInput from './calculator/SalaryInput';
import ResultsSummary from './calculator/ResultsSummary';
import AllowancesSection from './calculator/AllowancesSection';
import GrandTotal from './calculator/GrandTotal';
import Loader from './ui/Loader';
import {calculateSalaryBreakdown} from '@/utils/calculations';
import {Allowances} from '@/types';

const STORAGE_KEYS = {
    SALARY: 'salary_calculator_salary',
    ALLOWANCES: 'salary_calculator_allowances',
    INCLUDE_PF: 'salary_calculator_include_pf',
    YEAR: 'salary_calculator_year'
};


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
    const [isLoading, setIsLoading] = useState(true);
    const [isReimbursementsOpen, setIsReimbursementsOpen] = useState(true);
    const [includePF, setIncludePF] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<'2024-2025' | '2025-2026'>('2025-2026');


    useEffect(() => {
        const loadSavedData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800));


                const savedSalary = localStorage.getItem(STORAGE_KEYS.SALARY);
                if (savedSalary !== null) {
                    const parsedSalary = parseFloat(savedSalary);
                    if (!isNaN(parsedSalary)) {
                        setSalary(parsedSalary);
                    }
                }


                const savedPFPreference = localStorage.getItem(STORAGE_KEYS.INCLUDE_PF);
                if (savedPFPreference !== null) {
                    setIncludePF(savedPFPreference === 'true');
                }


                const savedYear = localStorage.getItem(STORAGE_KEYS.YEAR);
                if (savedYear !== null && (savedYear === '2024-2025' || savedYear === '2025-2026')) {
                    setSelectedYear(savedYear as '2024-2025' | '2025-2026');
                }


                const savedAllowances = localStorage.getItem(STORAGE_KEYS.ALLOWANCES);
                if (savedAllowances !== null) {
                    try {
                        const parsedAllowances = JSON.parse(savedAllowances) as Allowances;
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
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedData();
    }, []);


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

    const handleAllowancesChange = (newAllowances: Allowances) => {
        setAllowances(newAllowances);
        try {
            localStorage.setItem(STORAGE_KEYS.ALLOWANCES, JSON.stringify(newAllowances));
        } catch (error) {
            console.error('Error saving allowances:', error);
        }
    };

    // Save PF preference to localStorage
    const handlePFToggle = (newValue: boolean) => {
        setIncludePF(newValue);
        try {
            localStorage.setItem(STORAGE_KEYS.INCLUDE_PF, newValue.toString());
        } catch (error) {
            console.error('Error saving PF preference:', error);
        }
    };

    // Save year preference to localStorage
    const handleYearChange = (newYear: '2024-2025' | '2025-2026') => {
        setSelectedYear(newYear);
        try {
            localStorage.setItem(STORAGE_KEYS.YEAR, newYear);
        } catch (error) {
            console.error('Error saving year preference:', error);
        }
    };

    const salaryCalculation = useMemo(() => {
        return calculateSalaryBreakdown(salary, includePF, selectedYear);
    }, [salary, includePF, selectedYear]);

    if (isLoading) {
        return <Loader/>;
    }

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
                            localStorage.removeItem(STORAGE_KEYS.INCLUDE_PF);
                            localStorage.removeItem(STORAGE_KEYS.YEAR);
                            setSalary(0);
                            setAllowances(initialAllowances);
                            setIncludePF(false);
                            setSelectedYear('2025-2026');
                        } catch (error) {
                            console.error('Error clearing data:', error);
                        }
                    }}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                    Reset All
                </button>
            </div>

            <div className="space-y-6">
                {/* Salary Input with PF Toggle and Year Selection */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Monthly Salary</h3>
                        <div className="flex items-center gap-4">
                            {/* Year Selection Dropdown */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-600">Tax Year:</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value as '2024-2025' | '2025-2026')}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="2024-2025">2024-2025</option>
                                    <option value="2025-2026">2025-2026</option>
                                </select>
                            </div>
                            
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={includePF}
                                        onChange={(e) => handlePFToggle(e.target.checked)}
                                    />
                                    <div
                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-600">
                      Include Provident Fund
                      <span className="hidden md:inline"> (5% of gross salary)</span>
                    </span>
                                </label>
                                <button
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                    title="Company matches your 5% PF contribution"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <SalaryInput
                        value={salary}
                        onChange={handleSalaryChange}
                    />
                </div>

                <ResultsSummary calculation={salaryCalculation} showPF={includePF} selectedYear={selectedYear}/>

                <div className="mt-8">
                    <button
                        onClick={() => setIsReimbursementsOpen(!isReimbursementsOpen)}
                        className="flex items-center justify-between w-full text-left font-semibold text-xl mb-4"
                    >
                        <span>Reimbursements & Allowances</span>
                        <span
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              {isReimbursementsOpen ? '−' : '+'}
            </span>
                    </button>

                    {isReimbursementsOpen && (
                        <div className="space-y-4">
                            <AllowancesSection
                                allowances={allowances}
                                setAllowances={handleAllowancesChange}
                            />
                        </div>
                    )}
                </div>

                <GrandTotal
                    salaryCalculation={salaryCalculation}
                    allowances={allowances}
                    showPF={includePF}
                />
            </div>
        </div>
    );
}