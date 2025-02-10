'use client';

interface SalaryInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SalaryInput({ value, onChange }: SalaryInputProps) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-500">PKR</span>
      <input
        type="number"
        className="w-full pl-16 pr-4 py-3 text-lg border border-gray-200 bg-white rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        placeholder="Enter Monthly Salary"
        autoComplete="off"
      />
    </div>
  );
} 