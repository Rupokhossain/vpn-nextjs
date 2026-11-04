"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  CheckCircle2,
  RefreshCw,
  Clock,
  Eye,
  Copy,
  ExternalLink,
  X,
  ShieldAlert,
  Key,
  ShieldCheck,
} from "lucide-react";

interface Order {
  id: string;
  customerEmail: string;
  customerContact: string;
  productName: string;
  quantity: number;
  totalNGN: number;
  totalUSD: number;
  paymentMethod: "Wallet" | "WhatsApp" | "USDT";
  status: "Delivered" | "Processing" | "Replaced" | "Refunded";
  timestamp: string;
  credentials: string[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-9842",
      customerEmail: "tobi.crypto@gmail.com",
      customerContact: "+234 809 111 2233",
      productName: "NordVPN | 1 MONTH Premium Account 1 Device",
      quantity: 1,
      totalNGN: 1650,
      totalUSD: 1.05,
      paymentMethod: "Wallet",
      status: "Delivered",
      timestamp: "5 minutes ago",
      credentials: ["tobi_nord_usr:SecurePass881#@nord"],
    },
    {
      id: "ORD-9841",
      customerEmail: "alex.pro@gmail.com",
      customerContact: "@alex_trade (TG)",
      productName: "9 Proxy = 20 IPs Lifetime Activation",
      quantity: 1,
      totalNGN: 1999,
      totalUSD: 1.3,
      paymentMethod: "USDT",
      status: "Delivered",
      timestamp: "28 minutes ago",
      credentials: ["9PRX-KEY-8891-2290-A882-9901"],
    },
    {
      id: "ORD-9840",
      customerEmail: "john_dev21@yahoo.com",
      customerContact: "+1 555 019 2831",
      productName: "Google Voice (Call & OTP Access)",
      quantity: 1,
      totalNGN: 3700,
      totalUSD: 2.38,
      paymentMethod: "Wallet",
      status: "Replaced",
      timestamp: "1 hour ago",
      credentials: ["gv_usa_john21@gmail.com:Pass99812! - Ph: +1 (202) 555-0143"],
    },
    {
      id: "ORD-9839",
      customerEmail: "samuel.trader@proton.me",
      customerContact: "@samuel_fx (TG)",
      productName: "ExpressVPN For PC (1 Month Private Key)",
      quantity: 2,
      totalNGN: 3700,
      totalUSD: 2.38,
      paymentMethod: "WhatsApp",
      status: "Delivered",
      timestamp: "3 hours ago",
      credentials: [
        "EXPR-PC-ACT-9918-2231-8890",
        "EXPR-PC-ACT-9918-2231-8891",
      ],
    },
    {
      id: "ORD-9838",
      customerEmail: "david.rich@gmail.com",
      customerContact: "+234 701 444 8899",
      productName: "2010-2023 USA OLD GMAIL With Cookies",
      quantity: 5,
      totalNGN: 4750,
      totalUSD: 3.05,
      paymentMethod: "Wallet",
      status: "Delivered",
      timestamp: "5 hours ago",
      credentials: [
        "oldusgmail01@gmail.com:Pass2010#",
        "oldusgmail02@gmail.com:Pass2010#",
        "oldusgmail03@gmail.com:Pass2010#",
        "oldusgmail04@gmail.com:Pass2010#",
        "oldusgmail05@gmail.com:Pass2010#",
      ],
    },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      } else {
        localStorage.setItem("admin_orders", JSON.stringify(orders));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopyCredential = (cred: string, keyId: string) => {
    navigator.clipboard.writeText(cred);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleIssueReplacement = (orderId: string) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: "Replaced" as const,
            credentials: [
              `REPLACEMENT-${Date.now().toString().slice(-4)}:NewSecretPass2026!`,
            ],
          }
        : o
    );
    setOrders(updated);
    try {
      localStorage.setItem("admin_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: "Replaced",
        credentials: [
          `REPLACEMENT-${Date.now().toString().slice(-4)}:NewSecretPass2026!`,
        ],
      });
    }
  };

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Orders & Delivery Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Customer Orders & Delivered Credentials
          </h1>
          <p className="text-sm text-slate-500">
            View customer purchases, copy delivered VPN passwords/keys, and issue 1-hour warranty replacements.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Automated 0s Delivery</span>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Total Orders</div>
          <div className="text-2xl font-black text-slate-900 mt-1">348</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Delivered (0s)</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">341</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Warranty Replacements</div>
          <div className="text-2xl font-black text-purple-600 mt-1">7</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Total Volume</div>
          <div className="text-2xl font-black text-blue-600 mt-1">₦1.85M</div>
        </div>
      </div>

      {/* 3. SEARCH & STATUS FILTER */}
      <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer email, or product..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {["ALL", "Delivered", "Replaced", "Processing"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. ORDERS & CREDENTIALS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-5">Order ID & Date</th>
                <th className="py-3 px-4">Customer Contact</th>
                <th className="py-3 px-4">Purchased Product</th>
                <th className="py-3 px-4">Delivered Password / Key</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* ID & DATE */}
                  <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-900 text-sm sm:text-base">{ord.id}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{ord.timestamp}</span>
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{ord.customerEmail}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {ord.customerContact}
                    </div>
                  </td>

                  {/* PRODUCT */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 max-w-xs truncate text-sm">
                      {ord.productName}
                    </div>
                    <div className="text-xs text-slate-500">Qty: {ord.quantity} item</div>
                  </td>

                  {/* DELIVERED KEY QUICK PEEK */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 text-cyan-300 font-mono text-xs rounded-lg shadow-inner">
                      <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{ord.credentials[0] || "No key"}</span>
                      <button
                        onClick={() => handleCopyCredential(ord.credentials[0], ord.id)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-sans font-bold shrink-0 transition-colors"
                      >
                        {copiedKey === ord.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">
                      ₦{ord.totalNGN.toLocaleString()}
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                      {ord.paymentMethod}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {ord.status === "Delivered" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Delivered
                      </span>
                    )}
                    {ord.status === "Replaced" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                        <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
                        Replaced
                      </span>
                    )}
                    {ord.status === "Processing" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Processing
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs sm:text-sm transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. ORDER & CREDENTIALS INSPECT MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">
                    Order Details: {selectedOrder.id}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customer: {selectedOrder.customerEmail} ({selectedOrder.customerContact})
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Item Purchased
                </div>
                <div className="text-base font-bold text-slate-900">
                  {selectedOrder.productName}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Paid ₦{selectedOrder.totalNGN.toLocaleString()} (${selectedOrder.totalUSD} USD) via {selectedOrder.paymentMethod}
                </div>
              </div>

              {/* CREDENTIALS BOX */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Delivered Account Credentials / Key:
                </span>

                <div className="space-y-2">
                  {selectedOrder.credentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900 text-cyan-300 font-mono text-xs rounded-xl flex items-center justify-between gap-2 shadow-inner"
                    >
                      <span className="truncate select-all">{cred}</span>
                      <button
                        onClick={() => handleCopyCredential(cred, `modal-${idx}`)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-sans font-bold shrink-0 transition-colors flex items-center gap-1"
                      >
                        {copiedKey === `modal-${idx}` ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
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

              {/* 1-HOUR WARRANTY REPLACEMENT ACTION */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>1-Hour Warranty Replacement Control</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  If the buyer reports an invalid login within 1 hour, clicking below generates and delivers a fresh replacement account immediately.
                </p>
                <button
                  onClick={() => handleIssueReplacement(selectedOrder.id)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Issue New Replacement Account</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
