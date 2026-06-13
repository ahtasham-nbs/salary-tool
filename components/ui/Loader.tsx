export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"></div>
        <p className="mt-4 text-sm font-medium text-slate-500">Loading your data…</p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
} 