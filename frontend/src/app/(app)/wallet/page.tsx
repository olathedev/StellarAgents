"use client";

import { Copy, ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const ADDRESS = "GBKV...L4MX";
const FULL_ADDRESS = "GBKV3RNQJPXLV2E7QMBXF6UXZA4SBNQ4YBLFZRB5QKPXR7WNMYL4MX";

const TXS = [
  { id: "tx001", type: "in", desc: "Task #1048 completed — ResearchBot", from: "User 0xA1…", amount: "+$0.48", time: "2 min ago", hash: "a8f2…c91b" },
  { id: "tx002", type: "out", desc: "Sub-agent fee — SummaryBot", to: "SummaryBot", amount: "-$0.10", time: "2 min ago", hash: "b3e1…d04a" },
  { id: "tx003", type: "out", desc: "Sub-agent fee — ScraperAgent", to: "ScraperAgent", amount: "-$0.08", time: "2 min ago", hash: "c12f…e29c" },
  { id: "tx004", type: "in", desc: "Task #1047 completed — CopyWriter AI", from: "User 0xB7…", amount: "+$0.28", time: "18 min ago", hash: "d44a…f18b" },
  { id: "tx005", type: "in", desc: "Task #1046 completed — AuditShield", from: "User 0xC2…", amount: "+$1.50", time: "1h ago", hash: "e90b…g32d" },
  { id: "tx006", type: "out", desc: "Withdrawal to external wallet", to: "0xD4…", amount: "-$10.00", time: "3h ago", hash: "f11c…h40e" },
  { id: "tx007", type: "in", desc: "Task #1041 completed — ResearchBot", from: "User 0xE5…", amount: "+$0.48", time: "5h ago", hash: "g22d…i51f" },
];

export default function WalletPage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(FULL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-white">Wallet</h1>
        <p className="mt-0.5 text-[13px] text-zinc-500">Stellar testnet · USDC</p>
      </div>

      {/* Balance card */}
      <div className="mb-6 rounded-2xl border border-zinc-800 bg-[#111114] p-6">
        <p className="text-[12px] text-zinc-500 mb-1">Total balance</p>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-white">$184.20</span>
          <span className="mb-1 text-[13px] text-emerald-500">+$2.74 today</span>
        </div>

        {/* Address */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#09090b] px-3 py-2">
          <span className="flex-1 font-mono text-[12px] text-zinc-400">{FULL_ADDRESS}</span>
          <button onClick={copy} className="text-zinc-600 hover:text-white transition-colors">
            <Copy size={13} />
          </button>
          {copied && <span className="text-[11px] text-emerald-500">Copied</span>}
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <button className="flex items-center gap-2 rounded-md border border-zinc-800 bg-[#09090b] px-4 py-2 text-[13px] text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors">
            <ArrowDownLeft size={14} className="text-emerald-500" />
            Receive
          </button>
          <button className="flex items-center gap-2 rounded-md border border-zinc-800 bg-[#09090b] px-4 py-2 text-[13px] text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors">
            <ArrowUpRight size={14} className="text-zinc-400" />
            Send
          </button>
          <button className="ml-auto flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-violet-500 transition-colors">
            Fund wallet (testnet)
          </button>
        </div>
      </div>

      {/* Mini stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Earned this month", val: "$184.20" },
          { label: "Paid out (sub-agents)", val: "$62.40" },
          { label: "Net margin", val: "$121.80" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-800 bg-[#111114] p-4 text-center">
            <p className="text-lg font-semibold text-white">{s.val}</p>
            <p className="mt-1 text-[11px] text-zinc-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-zinc-800 bg-[#111114]">
        <div className="border-b border-zinc-800 px-5 py-4">
          <h2 className="text-[13px] font-semibold text-white">Transaction history</h2>
        </div>

        <div className="divide-y divide-zinc-800">
          {TXS.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5">
              {/* Icon */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                tx.type === "in" ? "bg-emerald-500/10" : "bg-zinc-800"
              }`}>
                {tx.type === "in"
                  ? <ArrowDownLeft size={14} className="text-emerald-500" />
                  : <ArrowUpRight size={14} className="text-zinc-400" />}
              </div>

              {/* Description */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white truncate">{tx.desc}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">{tx.time} · <span className="font-mono">{tx.hash}</span></p>
              </div>

              {/* Amount + explorer */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[13px] font-semibold ${tx.type === "in" ? "text-emerald-500" : "text-zinc-400"}`}>
                  {tx.amount}
                </span>
                <button className="text-zinc-700 hover:text-zinc-400 transition-colors">
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
