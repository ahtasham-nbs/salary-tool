import SalaryCalculator from '@/components/SalaryCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto py-8">
        <SalaryCalculator />
      </div>
    </main>
  );
}
