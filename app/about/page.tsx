import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | NorthBay Salary Calculator',
  description: 'Learn about the NorthBay Solutions Pakistan salary calculator tool, its developer Ahtasham, and how it helps employees calculate their compensation.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About NorthBay Salary Calculator',
  description: 'Information about the NorthBay Solutions salary calculator tool and its developer',
  author: {
    '@type': 'Person',
    name: 'Ahtasham'
  },
  publisher: {
    '@type': 'Organization',
    name: 'NorthBay Solutions Pakistan'
  }
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card ring-1 ring-slate-200/70 p-8 animate-fade-up">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              About the Salary Calculator
            </h1>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Purpose
              </h2>
              <p className="text-slate-600 leading-relaxed">
                This salary calculator was developed specifically for NorthBay Solutions Pakistan employees
                to help them understand their compensation package, including base salary, tax deductions,
                and various allowances offered by the company.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Developer
              </h2>
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-900 mb-1">
                  Ahtasham Abbas
                </h3>
                <p className="text-brand-800">
                  Principal Software Engineer at NorthBay Solutions Pakistan
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Features
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Accurate tax calculations based on latest tax slabs</li>
                <li>Comprehensive allowance management</li>
                <li>Fuel allowance calculator</li>
                <li>Medical, internet, and gym allowance tracking</li>
                <li>Detailed salary breakdown</li>
                <li>Local storage for saving calculations</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
} 