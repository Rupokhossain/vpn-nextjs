"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  DollarSign,
  QrCode,
  Building2,
  RefreshCw,
  PlusCircle,
  Send,
} from "lucide-react";

interface DepositItem {
  id: string;
  customerEmail: string;
  method: "USDT (TRC-20)" | "Bitcoin (BTC)" | "Direct Bank Transfer";
  amountNGN: number;
  amountUSD: number;
  txHash: string;
  status: "Pending" | "Approved" | "Rejected";
  timestamp: string;
}

export default function WalletPage() {
  const [balanceNGN, setBalanceNGN] = useState<number>(25000);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<
    "USDT (TRC-20)" | "Bitcoin (BTC)" | "Direct Bank Transfer"
  >("USDT (TRC-20)");
  const [depositAmountNGN, setDepositAmountNGN] = useState<number>(15500);
  const [txHash, setTxHash] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("user@example.com");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [deposits, setDeposits] = useState<DepositItem[]>([]);

  const USD_RATE = 1550; // 1 USD = 1,550 NGN

  // Load user balance and deposits from localStorage
  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem("user_wallet_balance");
      if (savedBalance !== null) {
        setBalanceNGN(parseFloat(savedBalance));
      } else {
        localStorage.setItem("user_wallet_balance", "25000");
        setBalanceNGN(25000);
      }

      const savedDeposits = localStorage.getItem("admin_deposits");
      if (savedDeposits) {
        setDeposits(JSON.parse(savedDeposits));
      } else {
        const initialDeposits: DepositItem[] = [
          {
            id: "DEP-7719",
            customerEmail: "user@example.com",
            method: "USDT (TRC-20)",
            amountNGN: 15500,
            amountUSD: 10.0,
            txHash: "4c7a6f8b9e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b",
            status: "Approved",
            timestamp: "2 hours ago",
          },
          {
            id: "DEP-7715",
            customerEmail: "user@example.com",
            method: "Direct Bank Transfer",
            amountNGN: 9500,
            amountUSD: 6.13,
            txHash: "REF-NIP-99812-GTB",
            status: "Approved",
            timestamp: "1 day ago",
          },
        ];
        localStorage.setItem("admin_deposits", JSON.stringify(initialDeposits));
        setDeposits(initialDeposits);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Add demo funds for testing
  const handleAddDemoFunds = (amount: number) => {
    const newBal = balanceNGN + amount;
    setBalanceNGN(newBal);
    localStorage.setItem("user_wallet_balance", newBal.toString());
  };

  // Submit deposit proof
  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim()) return;

    const newDep: DepositItem = {
      id: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      customerEmail: customerEmail.trim() || "user@example.com",
      method: selectedMethod,
      amountNGN: depositAmountNGN,
      amountUSD: parseFloat((depositAmountNGN / USD_RATE).toFixed(2)),
      txHash: txHash.trim(),
      status: "Pending",
      timestamp: "Just now",
    };

    const updated = [newDep, ...deposits];
    setDeposits(updated);
    localStorage.setItem("admin_deposits", JSON.stringify(updated));

    setSubmitSuccess(true);
    setTxHash("");
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const balanceUSD = (balanceNGN / USD_RATE).toFixed(2);
  const depositAmountUSD = (depositAmountNGN / USD_RATE).toFixed(2);

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
              <span className="text-slate-900 font-semibold">My Wallet & Deposits</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Customer Wallet Balance
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fund your account securely with Crypto or Direct Bank Transfer to purchase instant VPNs.
                </p>
              </div>

              {/* DEMO BALANCE BUTTON (FOR TESTING) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddDemoFunds(10000)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs transition-colors cursor-pointer"
                  title="Add ₦10,000 for instant checkout testing"
                >
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                  <span>+ Add Demo ₦10,000</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN CONTENT BODY */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* WALLET METRICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* CARD 1: MAIN BALANCE */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-1 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                    <Wallet className="w-4 h-4" />
                    <span>Available Store Balance</span>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                    Active & Ready
                  </span>
                </div>
                
                <div className="pt-3">
                  <div className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    ₦{balanceNGN.toLocaleString()}.00
                  </div>
                  <div className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-2">
                    <span>≈ ${balanceUSD} USD</span>
                    <span className="text-xs text-slate-400 font-normal">
                      (@ 1 USD = ₦{USD_RATE.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700/60 mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 relative z-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Instant 0-second auto deduction at checkout</span>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md active:scale-95"
                >
                  <span>Buy VPN Products</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* CARD 2: QUICK HOW-TO-DEPOSIT */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>How to Add Funds</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  3 Simple Steps to Fund
                </h3>
                <ol className="mt-3 space-y-2 text-xs text-slate-600 list-decimal pl-4">
                  <li>Select payment method (USDT TRC-20, BTC, or Bank).</li>
                  <li>Transfer exact amount to the provided store address.</li>
                  <li>Paste your Transaction Hash / Reference below for approval.</li>
                </ol>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Admin approval typically takes <strong>5 to 15 minutes</strong>.
                </span>
              </div>
            </div>

          </div>

          {/* 3. DEPOSIT SECTION (METHODS TABS & ADDRESSES) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* TABS */}
            <div className="p-4 sm:p-6 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Select Deposit Method
                </h2>
                <p className="text-xs text-slate-500">
                  Choose your preferred payment gateway to view official transfer details.
                </p>
              </div>

              {/* METHOD SELECTION BUTTONS */}
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "USDT (TRC-20)", label: "USDT (TRC-20)" },
                  { name: "Bitcoin (BTC)", label: "Bitcoin (BTC)" },
                  { name: "Direct Bank Transfer", label: "Bank Transfer" },
                ].map((m) => {
                  const isActive = selectedMethod === m.name;
                  return (
                    <button
                      key={m.name}
                      onClick={() =>
                        setSelectedMethod(
                          m.name as "USDT (TRC-20)" | "Bitcoin (BTC)" | "Direct Bank Transfer"
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PAYMENT DETAILS DISPLAY ACCORDING TO SELECTED TAB */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* TAB 1: USDT TRC-20 */}
              {selectedMethod === "USDT (TRC-20)" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Network: TRON (TRC-20) Only</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                        Official USDT TRC-20 Deposit Address
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value="TQn9Y2khEsLJW1ChVWFMSMeSTow5KaxnSE"
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-900 font-bold focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            handleCopy("TQn9Y2khEsLJW1ChVWFMSMeSTow5KaxnSE", "usdt")
                          }
                          className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedField === "usdt" ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 leading-relaxed">
                      ⚠️ Send only <strong>USDT TRC-20</strong> to this address. Sending via ERC-20, BEP-20, or any other chain will result in permanent loss.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <div className="w-28 h-28 bg-white border-2 border-slate-300 rounded-2xl flex items-center justify-center shadow-xs">
                      <QrCode className="w-20 h-20 text-slate-800" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 mt-2">
                      Scan in TrustWallet / Binance
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: BITCOIN (BTC) */}
              {selectedMethod === "Bitcoin (BTC)" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>Network: Bitcoin Native SegWit</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                        Official Bitcoin Deposit Address
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-900 font-bold focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            handleCopy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", "btc")
                          }
                          className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedField === "btc" ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                      Requires 1 network confirmation on the Bitcoin blockchain before balance credit.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <div className="w-28 h-28 bg-white border-2 border-slate-300 rounded-2xl flex items-center justify-center shadow-xs">
                      <QrCode className="w-20 h-20 text-slate-800" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 mt-2">
                      Scan with any BTC Wallet
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: DIRECT BANK TRANSFER */}
              {selectedMethod === "Direct Bank Transfer" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Instant NIP Bank Transfer (NGN)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">Bank Name</div>
                      <div className="text-base font-bold text-slate-900 mt-1">
                        Access Bank / Kuda MFB
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">Account Number</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-base font-mono font-bold text-slate-900">
                          0123456789
                        </span>
                        <button
                          onClick={() => handleCopy("0123456789", "bank")}
                          className="text-xs text-blue-600 font-bold hover:underline"
                        >
                          {copiedField === "bank" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">Account Name</div>
                      <div className="text-base font-bold text-slate-900 mt-1">
                        NexVPN Store Global
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. SUBMIT DEPOSIT PROOF FORM */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  <Send className="w-4 h-4" />
                  <span>Proof Submission Form</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Already Transferred? Notify Admin to Credit Balance
                </h3>

                {submitSuccess && (
                  <div className="p-4 mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs sm:text-sm font-bold animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>
                        Deposit submitted successfully! Admin will verify your transaction and credit your balance shortly.
                      </span>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Submitted</span>
                  </div>
                )}

                <form onSubmit={handleSubmitDeposit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Amount NGN */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Amount Deposited (NGN)
                      </label>
                      <input
                        type="number"
                        min="1000"
                        step="500"
                        required
                        value={depositAmountNGN}
                        onChange={(e) => setDepositAmountNGN(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        ≈ ${depositAmountUSD} USD
                      </span>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Account Email
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Method */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Payment Method Used
                      </label>
                      <select
                        value={selectedMethod}
                        onChange={(e) =>
                          setSelectedMethod(
                            e.target.value as
                              | "USDT (TRC-20)"
                              | "Bitcoin (BTC)"
                              | "Direct Bank Transfer"
                          )
                        }
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      >
                        <option value="USDT (TRC-20)">USDT (TRC-20)</option>
                        <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                        <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                      </select>
                    </div>
                  </div>

                  {/* Transaction Hash */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Transaction Hash (TXID) / Bank Payment Reference
                    </label>
                    <input
                      type="text"
                      required
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="e.g. 4c7a6f8b9e1d... or Bank Session ID REF-99120"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Deposit Verification</span>
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* 5. RECENT TRANSACTIONS TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Recent Deposit History
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time status of your submitted deposit notifications.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {deposits.length} Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 sm:px-6">Deposit ID</th>
                    <th className="py-3.5 px-4 sm:px-6">Method</th>
                    <th className="py-3.5 px-4 sm:px-6">Amount</th>
                    <th className="py-3.5 px-4 sm:px-6">TXID / Reference</th>
                    <th className="py-3.5 px-4 sm:px-6">Time</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {deposits.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-mono font-bold text-blue-600">
                        {item.id}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-800">
                        {item.method}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                        ₦{item.amountNGN.toLocaleString()}.00
                        <span className="text-xs text-slate-400 font-normal ml-1">
                          (${item.amountUSD})
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-500 truncate max-w-[180px]">
                        {item.txHash}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-500 text-xs">
                        {item.timestamp}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : item.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "Approved"
                                ? "bg-emerald-500"
                                : item.status === "Pending"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                          />
                          <span>{item.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
