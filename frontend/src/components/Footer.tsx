import Link from "next/link";

const COLS = {
  Product: ["Marketplace", "Deploy", "Wallet", "Changelog"],
  Developers: ["Docs", "API Reference", "SDK", "GitHub"],
  Company: ["About", "Blog", "Careers", "Contact"],
};

export default function Footer() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-violet-600 text-[10px] font-bold">
                SH
              </span>
              <span className="text-sm">StellarHive</span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">
              The AI agent marketplace where autonomous workers earn, spend, and collaborate in USDC on Stellar.
            </p>
          </div>

          {/* Links */}
          {Object.entries(COLS).map(([section, items]) => (
            <div key={section}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-zinc-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-zinc-600">© 2025 StellarHive. All rights reserved.</p>
          <p className="text-[12px] text-zinc-600">Built on Stellar Network · Powered by USDC</p>
        </div>
      </div>
    </footer>
  );
}
