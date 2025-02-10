'use client';

import {useState} from 'react';

const faqData = [
    {
        question: 'How is the tax calculated in this tool?',
        answer: 'The tax is calculated based on the latest FBR tax slabs for salaried individuals (2024-25). The tool first determines your annual taxable income by multiplying your monthly salary by 12, then applies the appropriate tax rates based on your income bracket.'
    },
    {
        question: 'What is the tax-free component in the salary breakdown?',
        answer: 'The tax-free component is 10% of your gross salary that is exempt from tax calculations. This portion is automatically calculated and deducted from your taxable income before computing the tax.'
    },
    {
        question: 'How are the fuel allowance calculations done?',
        answer: 'Fuel allowance is calculated by multiplying the current fuel price per liter with your allowed monthly fuel quantity. The tool automatically updates the total as you input these values.'
    },
    {
        question: 'Is my data saved securely?',
        answer: 'Your salary and allowance data is stored locally in your browser using localStorage. The data never leaves your device and is automatically loaded when you revisit the calculator.'
    },
    {
        question: 'How can I reset all my calculations?',
        answer: 'You can click the "Reset All" button at the top of the calculator to clear all saved data and start fresh. This will reset both your salary and allowance calculations.'
    },
    {
        question: 'Are the allowances included in the tax calculations?',
        answer: 'No, the allowances (fuel, medical, internet, and gym) are not included in the tax calculations. They are tracked separately as reimbursements and are added to your final take-home amount.'
    },
    {
        question: 'How often are the tax slabs updated?',
        answer: 'The tax slabs are updated according to the FBR guidelines for each fiscal year. The current calculations are based on the 2024-25 tax year slabs.'
    },
    {
        question: 'Can I use this calculator for non-NorthBay salary calculations?',
        answer: 'While the tax calculations are based on standard FBR rates, the allowance structure is specifically designed for NorthBay Solutions Pakistan employees. Other organizations may have different allowance policies.'
    },
    {
        question: 'Why do I need to re-enter the fuel price?',
        answer: 'Fuel prices can change frequently. The tool allows you to update the current fuel price to ensure accurate calculation of your fuel allowance based on the latest rates.'
    },
    {
        question: 'How is the grand total calculated?',
        answer: 'The grand total combines your take-home salary (after tax deductions) with all your allowances (fuel, medical, internet, and gym). This gives you the complete picture of your monthly compensation.'
    },
    {
        question: 'How is the Provident Fund (PF) calculated?',
        answer: 'The Provident Fund is calculated as 5% of your gross monthly salary. This amount is deducted from your salary each month and is matched by an equal contribution from the company. The PF deduction is made before calculating your take-home salary.'
    }
];

function AccordionItem({
                           question,
                           answer,
                           isOpen,
                           onClick
                       }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="w-full py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors px-4 rounded-lg"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <h2 className="text-lg font-semibold text-gray-800 pr-8">
                    {question}
                </h2>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="p-4 text-gray-600 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Frequently Asked Questions
                    </h1>

                    <div className="divide-y divide-gray-200">
                        {faqData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openItems.includes(index)}
                                onClick={() => toggleItem(index)}
                            />
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Still have questions?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                We're here to help! Feel free to reach out to support team.
                            </p>
                            <a 
                                href="mailto:ahtasham.abbas@northbaysolutions.net?subject=Support Inquiry&body=Hello Ahtasham,"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Contact Support Team</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 