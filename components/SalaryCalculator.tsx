'use client';

import {useState, useEffect, useMemo} from 'react';
import SalaryInput from './calculator/SalaryInput';
import ResultsSummary from './calculator/ResultsSummary';
import AllowancesSection from './calculator/AllowancesSection';
import GrandTotal from './calculator/GrandTotal';
import Loader from './ui/Loader';
import {calculateSalaryBreakdown} from '@/utils/calculations';
import {Allowances, TaxYear} from '@/types';

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
    const [selectedYear, setSelectedYear] = useState<TaxYear>('2026-2027');


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
                if (savedYear !== null && (savedYear === '2024-2025' || savedYear === '2025-2026' || savedYear === '2026-2027')) {
                    setSelectedYear(savedYear as TaxYear);
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
    const handleYearChange = (newYear: TaxYear) => {
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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-card ring-1 ring-slate-200/70 p-5 sm:p-7 animate-fade-up">
            <div className="flex justify-between items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-6 4h3M5 4.5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1v-13a1 1 0 011-1z" />
                        </svg>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                        Salary &amp; Tax Calculator
                    </h2>
                </div>
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
                            setSelectedYear('2026-2027');
                        } catch (error) {
                            console.error('Error clearing data:', error);
                        }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Reset All
                </button>
            </div>

            <div className="space-y-6">
                {/* Salary Input with PF Toggle and Year Selection */}
                <div className="bg-slate-50 ring-1 ring-slate-200/80 rounded-xl p-5 sm:p-6 sticky top-[4.5rem] z-20 shadow-soft backdrop-blur-sm" id={'amount-container'}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h3 className="text-base font-semibold text-slate-700">Monthly Salary</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            {/* Year Selection Dropdown */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="tax-year" className="text-sm font-medium text-slate-600">Tax Year:</label>
                                <select
                                    id="tax-year"
                                    value={selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value as TaxYear)}
                                    className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                                >
                                    <option value="2026-2027">2026-2027</option>
                                    <option value="2025-2026">2025-2026</option>
                                    <option value="2024-2025">2024-2025</option>
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
                                        className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                                    <span className="ml-3 text-sm font-medium text-slate-600">
                      Include Provident Fund
                      <span className="hidden md:inline"> (5% of gross salary)</span>
                    </span>
                                </label>
                                <button
                                    className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
                                    aria-label="Company matches your 5% PF contribution"
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
                        aria-expanded={isReimbursementsOpen}
                        className="group flex items-center justify-between w-full text-left font-semibold text-lg sm:text-xl text-slate-800 mb-4"
                    >
                        <span>Reimbursements &amp; Allowances</span>
                        <span
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transition-transform duration-300 ${isReimbursementsOpen ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>

                    {isReimbursementsOpen && (
                        <div className="space-y-4 animate-fade-up">
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