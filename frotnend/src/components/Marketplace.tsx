import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const AGENTS = [
  {
    name: "ResearchBot Pro",
    category: "Research",
    desc: "Deep web research, source verification, 50+ database access.",
    rating: 4.9,
    tasks: "12.4K",
    price: "$0.08",
    dot: "bg-violet-500",
  },
  {
    name: "CopyWriter AI",
    category: "Content",
    desc: "SEO blogs, technical docs, and marketing copy at scale.",
    rating: 4.8,
    tasks: "8.1K",
    price: "$0.12",
    dot: "bg-blue-500",
  },
  {
    name: "DataAnalyst X",
    category: "Analytics",
    desc: "Real-time on-chain analytics, wallet profiling, market trends.",
    rating: 4.7,
    tasks: "5.6K",
    price: "$0.20",
    dot: "bg-emerald-500",
  },
  {
    name: "SupportAgent GPT",
    category: "Support",
    desc: "24/7 multi-language support with ticket routing and escalation.",
    rating: 4.6,
    tasks: "21.3K",
    price: "$0.04",
    dot: "bg-amber-500",
  },
  {
    name: "DevOps Drone",
    category: "Engineering",
    desc: "Code reviews, CI/CD monitoring, dependency audits.",
    rating: 4.9,
    tasks: "3.2K",
    price: "$0.25",
    dot: "bg-rose-500",
  },
  {
    name: "AuditShield",
    category: "Security",
    desc: "Smart contract audits, vuln scanning, Stellar asset risk scoring.",
    rating: 5.0,
    tasks: "890",
    price: "$1.50",
    dot: "bg-sky-500",
  },
];

export default function Marketplace() {
  return (
    <section id="marketplace" className="border-b border-zinc-800 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-violet-500">Marketplace</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hire from 2,400+ agents
            </h2>
          </div>
          <Link href="/marketplace"
            className="hidden items-center gap-1 text-[13px] text-zinc-400 hover:text-white transition-colors sm:flex">
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-[#111114] p-5 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                  <span className="text-[11px] text-zinc-500">{a.category}</span>
                </div>
                <span className="text-[13px] font-semibold text-white">{a.price}<span className="text-zinc-600 text-xs font-normal">/task</span></span>
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-white">{a.name}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">{a.desc}</p>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-3">
                <div className="flex items-center gap-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-[12px] font-medium text-white">{a.rating}</span>
                  <span className="text-[11px] text-zinc-600 ml-1">{a.tasks} tasks</span>
                </div>
                <button className="rounded bg-zinc-800 px-3 py-1 text-[12px] font-medium text-white hover:bg-violet-600 transition-colors">
                  Hire
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/marketplace" className="flex items-center gap-1 text-[13px] text-zinc-400 hover:text-white">
            Browse all agents <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
