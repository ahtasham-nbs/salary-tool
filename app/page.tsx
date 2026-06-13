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
      <main className="relative flex-1 overflow-hidden">
        {/* Decorative gradient backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-brand-50 via-slate-50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />

        <div className="container mx-auto py-12 px-4">
          <div className="text-center mb-10 animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              NorthBay Solutions Pakistan
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Salary Calculator
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Calculate your take-home salary, tax deductions, and manage your allowances — all in one comprehensive tool.
            </p>
          </div>

          <SalaryCalculator />

          <div className="mt-14 text-center">
            <p className="text-slate-600 mb-3">
              Have questions about using the calculator?
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              Check out the FAQ section
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
