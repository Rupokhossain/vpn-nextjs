"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  FileText,
  Search,
  Key,
  Copy,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  AlertTriangle,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

interface UserOrder {
  id: string;
  customerEmail: string;
  customerContact: string;
  productName: string;
  quantity: number;
  totalNGN: number;
  totalUSD: number;
  paymentMethod: string;
  status: "Delivered" | "Processing" | "Replaced" | "Refunded";
  timestamp: string;
  credentials: string[];
}

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      }

      // Default mock orders for demo
      const initialOrders: UserOrder[] = [
        {
          id: "ORD-9842",
          customerEmail: "user@example.com",
          customerContact: "+234 809 111 2233",
          productName: "NordVPN | 1 MONTH Premium Account 1 Device",
          quantity: 1,
          totalNGN: 1650,
          totalUSD: 1.05,
          paymentMethod: "Wallet",
          status: "Delivered",
          timestamp: "10 minutes ago",
          credentials: ["nord_user_991@nexvpn.store : SecurePass881#@nord"],
        },
        {
          id: "ORD-9838",
          customerEmail: "user@example.com",
          customerContact: "+234 701 444 8899",
          productName: "2010-2023 USA OLD GMAIL With Cookies",
          quantity: 2,
          totalNGN: 1900,
          totalUSD: 1.22,
          paymentMethod: "Wallet",
          status: "Delivered",
          timestamp: "2 hours ago",
          credentials: [
            "oldusgmail01@gmail.com : Pass2010#recovery",
            "oldusgmail02@gmail.com : Pass2010#recovery",
          ],
        },
      ];
      setOrders(initialOrders);
      localStorage.setItem("admin_orders", JSON.stringify(initialOrders));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCopy = (cred: string, keyId: string) => {
    navigator.clipboard.writeText(cred);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.productName.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        
        {/* 1. TOP HEADER & BREADCRUMB */}
        <section className="w-full bg-white border-b border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">My Delivered Orders</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  My Purchased Products & Logins
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Access delivered VPN credentials, copy account details, and monitor your 1-hour warranty guarantee.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop More Products</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. MAIN ORDER LIST */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* SEARCH & FILTER BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID or Product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong>{filteredOrders.length}</strong> orders
            </div>
          </div>

          {/* ORDERS LIST */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No orders found</h3>
              <p className="text-xs text-slate-500">
                You haven&apos;t placed any orders matching your search. Explore our VPN catalog to get started.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                <span>Browse Products</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const whatsappIssueMsg = encodeURIComponent(
                  `Hello Support! I need assistance or replacement for my purchase:\n\nOrder ID: ${order.id}\nProduct: ${order.productName}\nTime: ${order.timestamp}\n\nPlease check my credentials.`
                );
                const issueUrl = `https://wa.me/?text=${whatsappIssueMsg}`;

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
                  >
                    {/* ORDER TOP HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
                          {order.id}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Placed {order.timestamp}
                        </span>
                        <span className="text-xs text-slate-400">• Paid via {order.paymentMethod}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.status === "Replaced"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-emerald-500"
                                : order.status === "Replaced"
                                ? "bg-purple-500"
                                : "bg-amber-500"
                            }`}
                          />
                          <span>{order.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* PRODUCT & PRICE INFO */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {order.productName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Quantity: <strong>{order.quantity} item(s)</strong>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-base sm:text-lg font-black text-slate-900">
                          ₦{order.totalNGN.toLocaleString()}.00
                        </div>
                        <span className="text-xs text-slate-400 font-normal">
                          (${order.totalUSD.toFixed(2)})
                        </span>
                      </div>
                    </div>

                    {/* DELIVERED CREDENTIALS DISPLAY */}
                    <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white space-y-3">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider">
                          <Key className="w-4 h-4" />
                          <span>Delivered Credentials ({order.credentials.length})</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">Instant Access</span>
                      </div>

                      <div className="space-y-2">
                        {order.credentials.map((cred, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 p-3 bg-slate-800/90 rounded-xl border border-slate-700/80 font-mono text-xs sm:text-sm"
                          >
                            <span className="text-emerald-400 select-all truncate">{cred}</span>
                            <button
                              onClick={() => handleCopy(cred, `${order.id}-${idx}`)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                            >
                              {copiedKey === `${order.id}-${idx}` ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 1-HOUR WARRANTY STATUS & WHATSAPP SUPPORT ACTION */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-100">
                      <div className="flex items-center gap-2 text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>1-Hour Replacement Warranty Guaranteed</span>
                      </div>

                      <a
                        href={issueUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Issue with Account? Request 1-Hour Replacement</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}
