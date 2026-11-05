"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Sliders,
  ShoppingBag,
  FileText,
  CreditCard,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleAdminLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "false");
    }
    setMobileSidebarOpen(false);
    router.push("/");
  };

  const adminNav = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Hero & Banner CMS", href: "/admin/hero", icon: Sliders, badge: "CMS" },
    { name: "Products & Stock", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders & Delivery", href: "/admin/orders", icon: FileText },
    { name: "Contact Inquiries", href: "/admin/queries", icon: MessageSquare, badge: "Live" },
    { name: "Wallet Deposits", href: "/admin/deposits", icon: CreditCard },
    { name: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  const currentNav = adminNav.find((item) => item.href === pathname) || {
    name: "Dashboard Overview",
  };

  return (
    <div className="min-h-screen bg-slate-100/90 flex flex-col lg:flex-row text-slate-800 font-sans">
      
      {/* 1. DESKTOP ADMIN SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-200 flex-col justify-between shrink-0 border-r border-slate-800 sticky top-0 h-screen z-40">
        <div className="p-4 space-y-4">
          
          {/* ADMIN BRAND HEADER */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-white tracking-tight">
                  Nex<span className="text-blue-400">VPN</span>
                </span>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.2 rounded uppercase">
                  CMS
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">Administrator Control</div>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1">
            <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Management
            </div>
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/20 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* BOTTOM QUICK ACTIONS & LOGOUT */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs sm:text-sm font-bold text-blue-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>← Back to Website</span>
            </span>
          </Link>

          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85%] bg-slate-900 text-white p-5 flex flex-col justify-between h-full max-h-screen overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-black text-white text-base">NexVPN Admin</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {adminNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to Website</span>
              </Link>
              <button
                onClick={handleAdminLogout}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-rose-400 text-xs font-semibold hover:bg-rose-500/10 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT WRAPPER */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        
        {/* TOP ADMIN HEADER BAR (PERMANENT TOP BAR WITH BACK TO WEBSITE BUTTON) */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xs">
          
          {/* Left: Mobile hamburger + Current Page Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-700 truncate">
              <span className="text-slate-400 hidden sm:inline">Admin CMS</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
              <span className="text-blue-600 font-extrabold truncate max-w-[130px] sm:max-w-none">{currentNav.name}</span>
            </div>
          </div>

          {/* Right: "Back to Website" Button & Live Store link */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Website</span>
              <span className="sm:hidden">Site</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Live Site ↗</span>
            </Link>
          </div>
        </header>

        {/* 4. MAIN PAGE BODY (FULL WIDTH - NO EMPTY SIDE GAPS) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
