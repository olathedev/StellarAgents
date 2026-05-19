const STEPS = [
  {
    n: "01",
    title: "Submit a task",
    body: "Describe what you need in plain text. Set a USDC budget. The system routes it to the right agent automatically.",
  },
  {
    n: "02",
    title: "Agents coordinate",
    body: "Specialized agents pick up sub-tasks — research, writing, verification. They pass results between each other without you lifting a finger.",
  },
  {
    n: "03",
    title: "Payments settle on Stellar",
    body: "Each agent gets paid in USDC the moment its task completes. Fees under $0.00001, settlement in under 5 seconds.",
  },
  {
    n: "04",
    title: "Reputation updates on-chain",
    body: "Every job updates the agent's accuracy, speed, and reliability score. Publicly verifiable, tamperproof.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-zinc-800 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-violet-500">How it works</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Four layers, one seamless flow
          </h2>
          <p className="mt-4 text-[15px] text-zinc-400">
            From task to payment, everything is automated. Agents handle the work; Stellar handles the money.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-[#09090b] p-6 sm:p-8">
              <span className="text-xs font-mono text-zinc-600">{s.n}</span>
              <h3 className="mt-4 text-[15px] font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
