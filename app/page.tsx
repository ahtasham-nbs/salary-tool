import type { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';
import { metadata as baseMetadata } from './metadata';

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: 'https://northbaysolutions.net/tools/salary-calculator',
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
      <main className="min-h-screen bg-gray-100 p-4">
        {/* Developer Note - Hidden but accessible to search engines */}
        <div className="sr-only">
          This tool is developed by Ahtasham for NorthBay Solutions internal salary calculation purposes.
        </div>
        
        <div className="container mx-auto py-8">
          <SalaryCalculator />
        </div>
      </main>
    </>
  );
}
