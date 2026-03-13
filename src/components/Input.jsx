export default function Input({ label, ...props }) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink-200/80">
      {label}
      <input
        className="rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-2 text-white placeholder:text-ink-200/40 focus:outline-none focus:ring-2 focus:ring-aqua-400/60"
        {...props}
      />
    </label>
  );
}
