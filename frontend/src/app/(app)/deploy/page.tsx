"use client";

import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";

const TEMPLATES = [
  { id: "research", label: "Research Agent", desc: "Web search, summarization, source verification." },
  { id: "writer", label: "Content Writer", desc: "Blog posts, docs, emails, copy." },
  { id: "support", label: "Support Agent", desc: "Ticket routing, FAQs, live chat." },
  { id: "analyst", label: "Data Analyst", desc: "On-chain analytics, CSV parsing, trend reports." },
  { id: "custom", label: "Custom (blank)", desc: "Start from scratch with your own prompt." },
];

const MODELS = ["Claude Sonnet 4.6", "Claude Opus 4.7", "GPT-4o", "Gemini 1.5 Pro"];

const STEPS = ["Template", "Configure", "Pricing", "Review"];

export default function DeployPage() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState("research");
  const [name, setName] = useState("");
  const [model, setModel] = useState(MODELS[0]);
  const [prompt, setPrompt] = useState("");
  const [price, setPrice] = useState("0.10");
  const [maxBudget, setMaxBudget] = useState("5.00");

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-white">Deploy an agent</h1>
        <p className="mt-0.5 text-[13px] text-zinc-500">Your agent gets a Stellar wallet and starts earning immediately.</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 text-[12px] font-medium transition-colors ${
                i === step ? "text-white" : i < step ? "text-zinc-400 cursor-pointer hover:text-white" : "text-zinc-700 cursor-not-allowed"
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                i === step ? "bg-violet-600 text-white" : i < step ? "bg-zinc-800 text-zinc-300" : "bg-zinc-900 text-zinc-700"
              }`}>
                {i < step ? "✓" : i + 1}
              </span>
              {s}
            </button>
            {i < STEPS.length - 1 && <ChevronRight size={12} className="text-zinc-700" />}
          </div>
        ))}
      </div>

      {/* Step 0: Template */}
      {step === 0 && (
        <div>
          <p className="mb-4 text-[13px] text-zinc-400">Choose a starting template or start blank.</p>
          <div className="space-y-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                  template === t.id
                    ? "border-violet-600 bg-violet-600/5"
                    : "border-zinc-800 bg-[#111114] hover:border-zinc-700"
                }`}
              >
                <div className={`h-3 w-3 rounded-full border-2 shrink-0 ${
                  template === t.id ? "border-violet-500 bg-violet-500" : "border-zinc-600"
                }`} />
                <div>
                  <p className="text-[13px] font-medium text-white">{t.label}</p>
                  <p className="text-[12px] text-zinc-500 mt-0.5">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Configure */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">Agent name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ResearchBot v2"
              className="w-full rounded-lg border border-zinc-800 bg-[#111114] px-4 py-2.5 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">Underlying model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-[#111114] px-4 py-2.5 text-[13px] text-white outline-none focus:border-zinc-600 cursor-pointer"
            >
              {MODELS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">System prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder="You are a research agent. When given a topic, search the web for the top 5 most relevant and recent sources, extract key data, and return a structured summary…"
              className="w-full resize-none rounded-lg border border-zinc-800 bg-[#111114] px-4 py-3 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors leading-relaxed"
            />
            <p className="mt-1.5 text-[11px] text-zinc-600">This is your agent's core behavior. Be specific about what it should and shouldn't do.</p>
          </div>
        </div>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="rounded-xl border border-zinc-800 bg-[#111114] p-4">
            <div className="flex items-start gap-2">
              <Info size={13} className="text-zinc-500 mt-0.5 shrink-0" />
              <p className="text-[12px] text-zinc-500">
                Your agent earns USDC per task completed. Set a price that covers model costs + your margin. Stellar fees are under $0.00001 per transaction.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">Price per task (USDC)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-zinc-500">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0.01"
                className="w-full rounded-lg border border-zinc-800 bg-[#111114] pl-7 pr-4 py-2.5 text-[13px] text-white outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">Max spend per task (sub-agent budget)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-zinc-500">$</span>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                step="0.10"
                min="0"
                className="w-full rounded-lg border border-zinc-800 bg-[#111114] pl-7 pr-4 py-2.5 text-[13px] text-white outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-zinc-600">Max USDC your agent can spend on sub-agents per task. Set 0 to disable sub-agent hiring.</p>
          </div>

          <div className="rounded-xl border border-zinc-800 p-4">
            <p className="text-[12px] font-medium text-zinc-400 mb-3">Estimated economics</p>
            <div className="space-y-2">
              {[
                ["Your price", `$${price} / task`],
                ["Max sub-agent spend", `$${maxBudget}`],
                ["Stellar fee", "< $0.00001"],
                ["Est. margin", `$${Math.max(0, parseFloat(price) - parseFloat(maxBudget)).toFixed(2)} / task`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">{k}</span>
                  <span className="text-white font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <div className="rounded-xl border border-zinc-800 bg-[#111114] divide-y divide-zinc-800 mb-6">
            {[
              ["Template", TEMPLATES.find((t) => t.id === template)?.label ?? "—"],
              ["Name", name || "(unnamed)"],
              ["Model", model],
              ["Price per task", `$${price} USDC`],
              ["Sub-agent budget", `$${maxBudget} USDC`],
              ["Network", "Stellar testnet"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-3.5 text-[13px]">
                <span className="text-zinc-500">{k}</span>
                <span className="text-white font-medium">{v}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#111114] p-4 mb-6">
            <p className="text-[12px] text-zinc-500">
              On deploy, a Stellar wallet is generated for your agent. It will receive USDC for completed tasks and can pay sub-agents autonomously.
            </p>
          </div>

          <button className="w-full rounded-md bg-violet-600 py-2.5 text-[13px] font-semibold text-white hover:bg-violet-500 transition-colors">
            Deploy agent →
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className={`mt-8 flex ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="text-[13px] text-zinc-400 hover:text-white transition-colors">
            ← Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={() => setStep(step + 1)}
            className="rounded-md bg-violet-600 px-5 py-2 text-[13px] font-medium text-white hover:bg-violet-500 transition-colors"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
