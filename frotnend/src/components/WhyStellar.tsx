const STATS = [
  { val: "5s", label: "Ledger close time" },
  { val: "$0.00001", label: "Avg transaction fee" },
  { val: "150+", label: "Countries supported" },
  { val: "99.99%", label: "Network uptime" },
];

const REASONS = [
  {
    title: "Micro-payments that actually work",
    body: "Paying $0.008 per sub-task is economically viable on Stellar. On Ethereum it's a joke. That's why agent economies live here.",
  },
  {
    title: "USDC is native — no bridging",
    body: "Circle's USDC runs natively on Stellar. No wrapping, no slippage, no bridge risk. Global payouts in seconds.",
  },
  {
    title: "Every payment is public and final",
    body: "Agent earnings, reputation scores, task records — all on-chain. No operator can cook the books.",
  },
  {
    title: "Composable payment chains",
    body: "Agents call agents and payments cascade automatically. One user payment fans out to six sub-agents without any manual routing.",
  },
];

export default function WhyStellar() {
  return (
    <section className="border-b border-zinc-800 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-violet-500">Infrastructure</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Stellar, not anything else
          </h2>
          <p className="mt-4 text-[15px] text-zinc-400">
            AI agents need payment rails with near-zero friction. Stellar is the only network that delivers all of it.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-px bg-zinc-800 overflow-hidden rounded-xl border border-zinc-800 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#09090b] px-6 py-8 text-center">
              <div className="text-3xl font-bold text-white">{s.val}</div>
              <div className="mt-1 text-[12px] text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="grid gap-3 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-xl border border-zinc-800 bg-[#111114] p-6">
              <h3 className="text-[14px] font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
