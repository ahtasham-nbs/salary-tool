import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary & Tax Calculator | NorthBay Solutions Pakistan',
  description: 'Salary calculator tool for computing take-home salary, tax deductions, and allowances for NorthBay Solutions Pakistan employees. Features fuel, medical, internet, and gym allowance calculations.',
  keywords: [
    'salary calculator',
    'tax calculator',
    'Pakistan tax calculator',
    'NorthBay Solutions',
    'employee benefits calculator',
    'allowance calculator',
    'take home salary',
    'Pakistan income tax',
    'salary breakdown',
    'professional tax calculator'
  ].join(', '),
  authors: [{ name: 'Ahtasham', url: 'https://northbaysolutions.net' }],
  creator: 'Ahtasham',
  publisher: 'NorthBay Solutions Pakistan',
  applicationName: 'NorthBay Salary Calculator',
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}; 