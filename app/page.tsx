import type { Metadata } from 'next';
import Link from 'next/link';
import SalaryCalculator from '@/components/SalaryCalculator';
import { metadata as baseMetadata } from './metadata';

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: 'https://nbs-salary-tool.vercel.app',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NorthBay Salary Calculator',
  description: 'Professional salary calculator tool for NorthBay Solutions Pakistan employees',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  author: {
    '@type': 'Person',
    name: 'Ahtasham',
    affiliation: {
      '@type': 'Organization',
      name: 'NorthBay Solutions Pakistan'
    }
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PKR'
  },
  featureList: [
    'Monthly salary calculation',
    'Tax deduction computation',
    'Allowances management',
    'Fuel allowance calculator',
    'Benefits breakdown'
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NorthBay Solutions Salary Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate your take-home salary, tax deductions, and manage your allowances with comprehensive calculator tool.
            </p>
          </div>
          
          <SalaryCalculator />
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Have questions about using the calculator?
            </p>
            <Link
              href="/faq"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Check out FAQ section →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
