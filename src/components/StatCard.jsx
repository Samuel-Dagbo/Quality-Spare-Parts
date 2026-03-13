export default function StatCard({ label, value, delta }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-card">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-200/60">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <span className="rounded-full bg-sun-500/20 px-3 py-1 text-xs text-sun-400">
          {delta}
        </span>
      </div>
    </div>
  );
}
