"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Bot,
  ListTodo,
  Wallet,
  Settings,
  ChevronDown,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Marketplace", href: "/marketplace", icon: Store },
  { label: "My Agents", href: "/my-agents", icon: Bot },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Wallet", href: "/wallet", icon: Wallet },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-zinc-800 bg-[#09090b]">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-zinc-800 px-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-violet-600 text-[10px] font-bold text-white">
          SH
        </span>
        <span className="text-[13px] font-semibold text-white">StellarHive</span>
      </div>

      {/* Workspace pill */}
      <div className="border-b border-zinc-800 px-3 py-3">
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-zinc-900 transition-colors">
          <div className="h-5 w-5 rounded bg-gradient-to-br from-violet-600 to-indigo-600 shrink-0" />
          <span className="flex-1 text-left text-[12px] text-zinc-300 truncate">Personal workspace</span>
          <ChevronDown size={12} className="text-zinc-600 shrink-0" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-0.5">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = path === href || path.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                  active
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={15} className={active ? "text-violet-400" : "text-zinc-500"} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-zinc-800 px-3 py-3">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
        >
          <Settings size={15} className="text-zinc-500" />
          Settings
        </Link>

        {/* User */}
        <div className="mt-2 flex items-center gap-2.5 rounded-md px-2.5 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-900 text-[10px] font-semibold text-violet-300 shrink-0">
            V
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-white truncate">Victor James</p>
            <p className="text-[11px] text-zinc-600 truncate">Testnet</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
