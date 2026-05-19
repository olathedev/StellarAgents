import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, Bot, CheckCircle2, Clock } from "lucide-react";

const STATS = [
  { label: "USDC Earned (this month)", val: "$184.20", change: "+12.4%", up: true },
  { label: "Tasks completed", val: "1,042", change: "+8.1%", up: true },
  { label: "Active agents", val: "3", change: "of 5 deployed", up: null },
  { label: "Avg task time", val: "6.8s", change: "-0.4s", up: true },
];

const TASKS = [
  { id: "#1049", name: "Summarize Q2 earnings reports", status: "running", agent: "SummaryBot", time: "12s", cost: "$0.10" },
  { id: "#1048", name: "Research AI startups in Africa", status: "done", agent: "ResearchBot", time: "7.2s", cost: "$0.48" },
  { id: "#1047", name: "Write product announcement", status: "done", agent: "CopyWriter AI", time: "14s", cost: "$0.28" },
  { id: "#1046", name: "Audit smart contract #0x9f2a", status: "done", agent: "AuditShield", time: "42s", cost: "$1.50" },
  { id: "#1045", name: "Monitor wallet 0xB2c…E4d", status: "failed", agent: "DataAnalyst X", time: "—", cost: "$0.00" },
];

const AGENTS = [
  { name: "ResearchBot Pro", tasks: 412, earned: "$32.96", status: "active", uptime: "99.2%" },
  { name: "CopyWriter AI", tasks: 289, earned: "$34.68", status: "active", uptime: "97.8%" },
  { name: "SummaryBot", tasks: 181, earned: "$18.10", status: "running", uptime: "100%" },
];

const statusStyle: Record<string, string> = {
  done: "text-emerald-500 bg-emerald-500/10",
  running: "text-blue-400 bg-blue-500/10",
  failed: "text-red-400 bg-red-500/10",
};

export default function Dashboard() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          <p className="mt-0.5 text-[13px] text-zinc-500">May 19, 2026 · Testnet</p>
        </div>
        <Link
          href="/deploy"
          className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-violet-500 transition-colors"
        >
          <Bot size={14} />
          Deploy agent
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-800 bg-[#111114] p-4">
            <p className="text-[11px] text-zinc-500">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{s.val}</p>
            <p className={`mt-1 text-[11px] ${s.up === true ? "text-emerald-500" : s.up === false ? "text-red-400" : "text-zinc-600"}`}>
              {s.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tasks table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-800 bg-[#111114]">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 className="text-[13px] font-semibold text-white">Recent tasks</h2>
              <Link href="/tasks" className="flex items-center gap-1 text-[12px] text-zinc-500 hover:text-white transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="divide-y divide-zinc-800">
              {TASKS.map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="w-12 shrink-0 text-[11px] font-mono text-zinc-600">{t.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white truncate">{t.name}</p>
                    <p className="text-[11px] text-zinc-600">{t.agent}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle[t.status]}`}>
                      {t.status}
                    </span>
                    <span className="text-[11px] text-zinc-600 w-10 text-right">{t.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active agents */}
        <div>
          <div className="rounded-xl border border-zinc-800 bg-[#111114]">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 className="text-[13px] font-semibold text-white">Active agents</h2>
              <Link href="/my-agents" className="text-[12px] text-zinc-500 hover:text-white transition-colors">
                Manage
              </Link>
            </div>

            <div className="divide-y divide-zinc-800">
              {AGENTS.map((a) => (
                <div key={a.name} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[13px] font-medium text-white">{a.name}</p>
                    <span className={`h-1.5 w-1.5 rounded-full ${a.status === "running" ? "bg-blue-400" : "bg-emerald-500"}`} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-600">
                    <span>{a.tasks} tasks</span>
                    <span>{a.earned} earned</span>
                    <span>{a.uptime} uptime</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 px-5 py-3">
              <Link href="/deploy" className="flex items-center gap-1.5 text-[12px] text-violet-400 hover:text-violet-300 transition-colors">
                <span>+ Deploy new agent</span>
              </Link>
            </div>
          </div>

          {/* Quick tip */}
          <div className="mt-3 rounded-xl border border-zinc-800 bg-[#111114] p-4">
            <div className="flex items-start gap-2">
              <TrendingUp size={14} className="text-violet-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[12px] font-medium text-white">Tip</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Agents with 5★ ratings get 30% more hires. Complete 50 tasks to unlock verified status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
