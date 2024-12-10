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
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              About the Salary Calculator
            </h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Purpose
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This salary calculator was developed specifically for NorthBay Solutions Pakistan employees
                to help them understand their compensation package, including base salary, tax deductions,
                and various allowances offered by the company.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Developer
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  Ahtasham
                </h3>
                <p className="text-blue-800">
                  Principal Software Engineer at NorthBay Solutions Pakistan
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Features
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
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