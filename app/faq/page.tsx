import type { Metadata } from 'next';
import FAQ from './FAQ';

export const metadata: Metadata = {
  title: 'FAQ | NorthBay Salary Calculator',
  description: 'Frequently asked questions about using the NorthBay Solutions Pakistan salary calculator, including tax calculations, allowances, and data storage.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is the tax calculated in this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tax is calculated based on the latest FBR tax slabs for salaried individuals (2024-25). The tool first determines your annual taxable income by multiplying your monthly salary by 12, then applies the appropriate tax rates based on your income bracket.'
      }
    },
    // ... rest of the FAQ data
  ]
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQ />
    </>
  );
} 