"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  LogOut,
  Wallet,
  ShoppingBag,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Authentication State: Defaults to true (logged-in view per user request)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage if set, default to true
  useEffect(() => {
    const savedAuth = localStorage.getItem("isLoggedIn");
    if (savedAuth !== null) {
      setIsLoggedIn(savedAuth === "true");
    } else {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Do not render public website navbar inside admin dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Nex<span className="text-blue-600">VPN</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Fast & Secure Network
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT SIDE: AUTHENTICATED USER PILL OR GUEST BUTTONS */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                
                {/* USER PILL BUTTON (BLUE/SLATE THEME WITHOUT ORANGE) */}
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white shadow-xs transition-all cursor-pointer group"
                  aria-label="User Account Menu"
                >
                  {/* Avatar: Blue circle with white U */}
                  <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
                    U
                  </div>
                  <span className="text-xs font-bold text-slate-100">User</span>
                  {userDropdownOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900/98 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-50 text-white space-y-1 animate-in fade-in zoom-in-95 duration-100">
                    
                    {/* My Wallet Link */}
                    <Link
                      href="/wallet"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors group"
                    >
                      <Wallet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>My Wallet & Balance</span>
                    </Link>

                    {/* My Orders Link */}
                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors group"
                    >
                      <ShoppingBag className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span>My Orders & Credentials</span>
                    </Link>

                    <div className="border-t border-slate-800/90 my-1" />

                    {/* Dashboard Link (Directly to Admin Dashboard) */}
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors group"
                    >
                      <LayoutGrid className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span>Admin CMS Dashboard</span>
                    </Link>

                    <div className="border-t border-slate-800/90 my-1" />

                    {/* Logout Action */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-colors group text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                      <span>Logout</span>
                    </button>

                  </div>
                )}

              </div>
            ) : (
              /* GUEST BUTTONS (LOGIN & REGISTER) */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 text-sm font-semibold transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* 4. MOBILE CONTROLS & HAMBURGER TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn ? (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-xs font-bold"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-white text-[10px] font-bold">
                  U
                </div>
                <span>User</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-semibold"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/wallet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold"
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    <span>My Wallet & Balance</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md font-bold">
                    Wallet
                  </span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                    <span>My Orders & Credentials</span>
                  </div>
                  <span className="text-xs text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md font-bold">
                    Orders
                  </span>
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutGrid className="w-4 h-4 text-blue-500" />
                    <span>Go to Admin Dashboard</span>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">Admin</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-rose-600 font-semibold text-xs hover:bg-rose-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout from Session</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
