"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-14 pb-10 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 4-COLUMN FOOTER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* COLUMN 1: BRAND OVERVIEW */}
          <div className="space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Nex<span className="text-blue-600">VPN</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Legit and trusted automated platform to buy verified VPN accounts, dedicated server access, and private proxies with instant delivery.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Verified 24/7 Automated Inventory</span>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-600 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/wallet" className="hover:text-blue-600 transition-colors">
                  My Wallet & Deposits
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="hover:text-blue-600 transition-colors">
                  My Orders & Logins
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: PLATFORM POLICIES & RULES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Policies & Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  1-Hour Replacement Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  VPN Account Login Rules
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  Privacy & No-Logs Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMMUNITY & OFFICIAL CHANNELS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Official Community
            </h4>
            <p className="text-xs text-slate-500">
              Join our official channel for daily stock updates, announcements, and direct admin assistance:
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Send className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Telegram Official Channel</span>
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WhatsApp 24/7 Help Desk</span>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT (STATIC YEAR TO FIX PRERENDER ERROR) */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 NexVPN Store. All rights reserved.
          </div>
          <div className="text-slate-400">
            Secure Digital Delivery & Verified Logs Store
          </div>
        </div>

      </div>
    </footer>
  );
}
