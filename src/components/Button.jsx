export default function Button({ label, icon: Icon, variant = "primary", className = "", ...props }) {
  const base = "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition";
  const styles =
    variant === "ghost"
      ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
      : "bg-gradient-to-r from-ember-500 to-steel-400 text-ink-950 hover:from-ember-400 hover:to-steel-300";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {Icon ? <Icon size={16} /> : null}
      {label}
    </button>
  );
}
