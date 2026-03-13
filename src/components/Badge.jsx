export default function Badge({ text, tone = "neutral" }) {
  const tones = {
    neutral: "bg-white/10 text-ink-100",
    success: "bg-aqua-500/20 text-aqua-400",
    warn: "bg-ember-500/20 text-ember-400"
  };

  return <span className={`rounded-full px-3 py-1 text-xs ${tones[tone]}`}>{text}</span>;
}
