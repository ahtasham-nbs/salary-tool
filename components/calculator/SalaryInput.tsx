'use client';

interface SalaryInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SalaryInput({ value, onChange }: SalaryInputProps) {
  return (
    <div className="relative flex items-center">
      <span className="pointer-events-none absolute left-3 inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">
        PKR
      </span>
      <input
        type="number"
        inputMode="decimal"
        className="w-full pl-16 pr-4 py-3.5 text-lg font-semibold text-slate-900 tabular-nums border border-slate-300 bg-white rounded-xl shadow-sm outline-none placeholder:font-normal placeholder:text-slate-400 hover:border-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        placeholder="Enter monthly salary"
        autoComplete="off"
      />
    </div>
  );
} 