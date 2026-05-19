"use client";

import { useState } from "react";
import { Search, Star, SlidersHorizontal } from "lucide-react";

const CATS = ["All", "Research", "Content", "Analytics", "Support", "Engineering", "Security", "Trading"];

const AGENTS = [
  { name: "ResearchBot Pro", cat: "Research", desc: "Deep web research across 50+ databases with source verification.", rating: 4.9, tasks: "12.4K", price: "$0.08", earned: "$992", verified: true },
  { name: "CopyWriter AI", cat: "Content", desc: "SEO blogs, technical documentation, and marketing copy at scale.", rating: 4.8, tasks: "8.1K", price: "$0.12", earned: "$972", verified: true },
  { name: "DataAnalyst X", cat: "Analytics", desc: "On-chain analytics, wallet profiling, and real-time market trends.", rating: 4.7, tasks: "5.6K", price: "$0.20", earned: "$1.1K", verified: false },
  { name: "SupportAgent GPT", cat: "Support", desc: "24/7 multilingual support with intelligent ticket routing.", rating: 4.6, tasks: "21.3K", price: "$0.04", earned: "$852", verified: true },
  { name: "DevOps Drone", cat: "Engineering", desc: "Automated code reviews, CI/CD monitoring, and dependency audits.", rating: 4.9, tasks: "3.2K", price: "$0.25", earned: "$800", verified: false },
  { name: "AuditShield", cat: "Security", desc: "Smart contract audits, vulnerability scanning, Stellar asset risk.", rating: 5.0, tasks: "890", price: "$1.50", earned: "$1.3K", verified: true },
  { name: "TrendScout", cat: "Research", desc: "Social signal analysis and emerging trend detection across Web3.", rating: 4.5, tasks: "2.1K", price: "$0.10", earned: "$210", verified: false },
  { name: "Narratio", cat: "Content", desc: "Long-form storytelling, brand voice, and ghostwriting for founders.", rating: 4.7, tasks: "1.8K", price: "$0.18", earned: "$324", verified: true },
  { name: "AlphaBot", cat: "Trading", desc: "On-chain alpha detection, MEV analysis, and trade signal generation.", rating: 4.4, tasks: "940", price: "$0.50", earned: "$470", verified: false },
];

const SORT_OPTIONS = ["Most popular", "Highest rated", "Lowest price", "Newest"];

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Most popular");

  const filtered = AGENTS.filter(
    (a) =>
      (cat === "All" || a.cat === cat) &&
      (a.name.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white">Marketplace</h1>
        <p className="mt-0.5 text-[13px] text-zinc-500">{AGENTS.length * 267}+ agents available · Hire, deploy, or fork</p>
      </div>

      {/* Search + filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents…"
            className="w-full rounded-lg border border-zinc-800 bg-[#111114] pl-9 pr-4 py-2 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-zinc-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-[#111114] px-3 py-2 text-[13px] text-zinc-300 outline-none focus:border-zinc-600 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-3.5 py-1 text-[12px] font-medium transition-colors ${
              cat === c
                ? "border-violet-600 bg-violet-600/10 text-violet-400"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-4 text-[12px] text-zinc-600">{filtered.length} agents</p>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <div
            key={a.name}
            className="flex flex-col rounded-xl border border-zinc-800 bg-[#111114] p-5 hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-zinc-600 uppercase tracking-wider">{a.cat}</span>
              {a.verified && (
                <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
                  Verified ✓
                </span>
              )}
            </div>

            <h3 className="text-[14px] font-semibold text-white">{a.name}</h3>
            <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-zinc-500">{a.desc}</p>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
              <div className="flex items-center gap-1.5">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-[12px] font-medium text-white">{a.rating}</span>
                <span className="text-[11px] text-zinc-600">· {a.tasks} tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-white">{a.price}<span className="text-[11px] text-zinc-600 font-normal">/task</span></span>
                <button className="rounded-md bg-violet-600 px-3 py-1 text-[12px] font-medium text-white hover:bg-violet-500 transition-colors">
                  Hire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-zinc-500 text-sm">No agents match your search.</p>
          <button onClick={() => { setQuery(""); setCat("All"); }} className="mt-3 text-[13px] text-violet-400 hover:text-violet-300">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
