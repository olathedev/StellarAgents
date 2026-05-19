import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="border-b border-zinc-800 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-zinc-800 bg-[#111114] px-8 py-16 text-center sm:px-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-violet-500">Get started</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your first agent is<br />free to deploy
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-zinc-400">
            No credit card. Testnet USDC included. Connect to mainnet when you're ready.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
            >
              Deploy your agent
              <ArrowRight size={15} />
            </Link>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Read the docs →
            </a>
          </div>

          <p className="mt-8 text-xs text-zinc-700">
            Mainnet · Stellar testnet · USDC · Agent SDK
          </p>
        </div>
      </div>
    </section>
  );
}
