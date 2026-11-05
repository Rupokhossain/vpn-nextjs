"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Sliders,
  Users,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Settings,
  Eye,
  MessageSquare,
  FileText,
  Mail,
  Clock,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [inquiriesCount, setInquiriesCount] = useState(3);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([
    {
      id: "QRY-8841",
      name: "Alex Morgan",
      subject: "1-Hour Replacement Guarantee Request",
      time: "12 mins ago",
      status: "Unread",
    },
    {
      id: "QRY-8840",
      name: "Samuel Jackson",
      subject: "Payment & Wallet Deposit Inquiry",
      time: "45 mins ago",
      status: "Unread",
    },
  ]);

  const [ordersCount, setOrdersCount] = useState<number>(348);
  const [productsCount, setProductsCount] = useState<number>(18);
  const [recentOrdersList, setRecentOrdersList] = useState<any[]>([
    {
      id: "ORD-9842",
      customer: "tobi.crypto@gmail.com",
      product: "NordVPN 1 Month Premium",
      amount: "₦1,650.00",
      status: "Delivered",
      time: "5 mins ago",
    },
    {
      id: "ORD-9841",
      customer: "alex.pro@gmail.com",
      product: "9 Proxy = 20 IPs Activation",
      amount: "₦1,999.00",
      status: "Delivered",
      time: "28 mins ago",
    },
    {
      id: "ORD-9840",
      customer: "john_dev21@yahoo.com",
      product: "Google Voice (Call & OTP)",
      amount: "₦3,700.00",
      status: "Replaced",
      time: "1 hour ago",
    },
  ]);

  useEffect(() => {
    try {
      // Inquiries
      const storedQueries = localStorage.getItem("contact_queries");
      if (storedQueries) {
        const parsed = JSON.parse(storedQueries);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setInquiriesCount(parsed.length);
          setRecentInquiries(parsed.slice(0, 3));
        }
      }

      // Orders
      const storedOrders = localStorage.getItem("admin_orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrdersCount(345 + parsed.length);
          setRecentOrdersList(
            parsed.slice(0, 4).map((o: any) => ({
              id: o.id,
              customer: o.customerEmail || "user@example.com",
              product: o.productName,
              amount: `₦${Number(o.totalNGN || 0).toLocaleString()}.00`,
              status: o.status,
              time: o.timestamp || "Recently",
            }))
          );
        }
      }

      // Products
      const storedProds = localStorage.getItem("admin_products_data");
      if (storedProds) {
        const parsed = JSON.parse(storedProds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductsCount(parsed.length);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: "₦1,850,500.00",
      subtext: "+18.4% this month",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      title: "Completed Orders",
      value: `${ordersCount}`,
      subtext: "Instant 0s delivery",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Active Listed Products",
      value: `${productsCount} Items`,
      subtext: "Across 11 categories",
      icon: Sliders,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Contact Inquiries",
      value: `${inquiriesCount} Messages`,
      subtext: "From Contact Page",
      icon: MessageSquare,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      href: "/admin/queries",
    },
  ];

  const lowStockItems = [
    { name: "NordVPN | 7 DAYS Premium VPN 1 Device", stock: 1, category: "7 DAYS VPN" },
    { name: "2010-2023 USA OLD GMAIL", stock: 1, category: "USA OLD GMAIL" },
    { name: "Talkatone USA Calling Account", stock: 2, category: "A - USA TEXTING APP" },
    { name: "ExpressVPN For PC (1 Month)", stock: 2, category: "One Month Paid VPN" },
  ];

  const recentOrders = recentOrdersList;

  return (
    <div className="space-y-6 w-full pb-8">
      
      {/* 1. TOP WELCOME & QUICK CMS BANNER (TIGHT PADDING & CRISP TYPOGRAPHY) */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Store Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Live control over the entire website: modify the Hero banner, logo, products, stock, customer orders, and support inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/hero"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all"
          >
            <Sliders className="w-4 h-4" />
            <span>Hero Banner CMS</span>
          </Link>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Edit Product</span>
          </Link>
        </div>
      </div>

      {/* 2. STATS 4-COLUMN CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <Link
              key={idx}
              href={st.href || "/admin"}
              className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 hover:border-blue-400 transition-all block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{st.title}</span>
                <div className={`w-9 h-9 rounded-xl ${st.color} border flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{st.value}</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">{st.subtext}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. TWO-COLUMN LAYOUT: RECENT ORDERS & SUPPORT INQUIRIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        
        {/* LEFT COLUMN: RECENT PURCHASES (7 COLS) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Recent Customer Purchases</h3>
            </div>
            <Link href="/admin/orders" className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
              View All Orders ➔
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 font-mono font-bold text-slate-900">{ord.id}</td>
                    <td className="py-2.5 text-slate-800 max-w-[160px] truncate">{ord.product}</td>
                    <td className="py-2.5 font-bold text-slate-900">{ord.amount}</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT CONTACT INQUIRIES (5 COLS) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Recent Contact Inquiries</h3>
            </div>
            <Link href="/admin/queries" className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
              View All ({inquiriesCount}) ➔
            </Link>
          </div>

          <div className="space-y-2">
            {recentInquiries.map((q, idx) => (
              <Link
                key={idx}
                href="/admin/queries"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{q.name}</span>
                  <span className="text-[11px] text-amber-700 font-bold bg-amber-100 px-2 py-0.2 rounded-full">
                    {q.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 truncate font-medium">{q.subject}</div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{q.time || "Recently"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* 4. LOW STOCK & FAST CMS SHORTCUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Link
          href="/admin/hero"
          className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-blue-400 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Hero Banner Customizer
              </div>
              <div className="text-xs text-slate-500">Edit slide images, titles, and buttons</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/products"
          className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-blue-400 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Product & Stock Manager
              </div>
              <div className="text-xs text-slate-500">Add accounts, set prices, update quantity</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/settings"
          className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-blue-400 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Site Identity & Logo
              </div>
              <div className="text-xs text-slate-500">Update WhatsApp, Telegram, and branding</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

    </div>
  );
}
