"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

interface DepositRequest {
  id: string;
  customerEmail: string;
  method: "USDT (TRC-20)" | "Bitcoin (BTC)" | "Direct Bank Transfer";
  amountNGN: number;
  amountUSD: number;
  txHash: string;
  status: "Pending" | "Approved" | "Rejected";
  timestamp: string;
}

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<DepositRequest[]>([
    {
      id: "DEP-7719",
      customerEmail: "tobi.crypto@gmail.com",
      method: "USDT (TRC-20)",
      amountNGN: 15500,
      amountUSD: 10.0,
      txHash: "4c7a6f8b9e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b",
      status: "Pending",
      timestamp: "12 minutes ago",
    },
    {
      id: "DEP-7718",
      customerEmail: "emeka.fx@yahoo.com",
      method: "Direct Bank Transfer",
      amountNGN: 31000,
      amountUSD: 20.0,
      txHash: "REF-NIP-99812-GTB",
      status: "Pending",
      timestamp: "35 minutes ago",
    },
    {
      id: "DEP-7717",
      customerEmail: "john_dev21@yahoo.com",
      method: "USDT (TRC-20)",
      amountNGN: 7750,
      amountUSD: 5.0,
      txHash: "9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
      status: "Approved",
      timestamp: "3 hours ago",
    },
    {
      id: "DEP-7716",
      customerEmail: "unknown_user@proton.me",
      method: "Bitcoin (BTC)",
      amountNGN: 15500,
      amountUSD: 10.0,
      txHash: "INVALID-TX-TEST",
      status: "Rejected",
      timestamp: "1 day ago",
    },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_deposits");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDeposits(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<"ALL" | "Pending" | "Approved" | "Rejected">("ALL");
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleApprove = (id: string, email: string, amountNGN: number) => {
    const updated = deposits.map((d) => (d.id === id ? { ...d, status: "Approved" as const } : d));
    setDeposits(updated);
    try {
      localStorage.setItem("admin_deposits", JSON.stringify(updated));
      const currentBal = parseFloat(localStorage.getItem("user_wallet_balance") || "25000");
      localStorage.setItem("user_wallet_balance", (currentBal + amountNGN).toString());
    } catch (e) {
      console.error(e);
    }
    showFeedback(`Approved deposit ${id}! Credited ₦${amountNGN.toLocaleString()} to ${email}.`);
  };

  const handleReject = (id: string) => {
    const updated = deposits.map((d) => (d.id === id ? { ...d, status: "Rejected" as const } : d));
    setDeposits(updated);
    try {
      localStorage.setItem("admin_deposits", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showFeedback(`Deposit ${id} has been rejected.`);
  };

  const filteredDeposits = deposits.filter((d) => {
    if (activeTab === "ALL") return true;
    return d.status === activeTab;
  });

  const pendingCount = deposits.filter((d) => d.status === "Pending").length;

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Financial Approvals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Wallet Deposit Approvals
          </h1>
          <p className="text-sm text-slate-500">
            Verify blockchain transactions and bank payment proofs to credit user wallets.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold animate-pulse">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{pendingCount} Pending Approvals Require Attention</span>
          </div>
        )}
      </div>

      {/* FEEDBACK TOAST */}
      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs sm:text-sm font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{feedback}</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Done</span>
        </div>
      )}

      {/* 2. TABS */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-2xs">
        {(["ALL", "Pending", "Approved", "Rejected"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab} {tab === "Pending" && pendingCount > 0 && `(${pendingCount})`}
          </button>
        ))}
      </div>

      {/* 3. DEPOSITS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Deposit ID & Time</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Method & Hash</th>
                <th className="py-3.5 px-4">Amount (NGN / USD)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredDeposits.map((dep) => (
                <tr key={dep.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* ID & TIME */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-mono font-bold text-slate-900">{dep.id}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{dep.timestamp}</span>
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900">{dep.customerEmail}</div>
                    <div className="text-[10px] text-slate-400">Verified Buyer</div>
                  </td>

                  {/* METHOD & TX HASH */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="font-bold text-slate-800">{dep.method}</div>
                    <div className="text-[11px] text-blue-600 font-mono truncate hover:text-blue-800">
                      Tx: {dep.txHash}
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">
                      ₦{dep.amountNGN.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400">
                      ${dep.amountUSD.toFixed(2)} USD
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {dep.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending Review
                      </span>
                    )}
                    {dep.status === "Approved" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Approved & Credited
                      </span>
                    )}
                    {dep.status === "Rejected" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        Rejected
                      </span>
                    )}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    {dep.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(dep.id, dep.customerEmail, dep.amountNGN)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(dep.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
