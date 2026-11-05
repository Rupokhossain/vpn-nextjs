"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
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
  ShoppingBag,
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

export default function CustomerDashboardWalletPage() {
  const { formatPrice, formatSecondary, currency } = useCurrency();
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

  // Wallet and deposit configurations
  const [cryptoWallets, setCryptoWallets] = useState({
    usdtTrc20: "TQn9Y2khEsL7w1ChVMfHN5MeSTow5KaxnSE",
    btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    bankName: "Guaranty Trust Bank (GTBank)",
    accountNumber: "0123456789",
    accountName: "NexVPN Enterprise Ltd",
  });

  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem("user_wallet_balance");
      if (savedBalance !== null) {
        setBalanceNGN(parseFloat(savedBalance));
      } else {
        localStorage.setItem("user_wallet_balance", "25000");
        setBalanceNGN(25000);
      }

      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) {
        setCustomerEmail(savedEmail);
      }

      // Load admin deposits or initial mock
      const storedDeposits = localStorage.getItem("admin_deposits");
      if (storedDeposits) {
        setDeposits(JSON.parse(storedDeposits));
      } else {
        const initialDeposits: DepositItem[] = [
          {
            id: "DEP-1001",
            customerEmail: "user@example.com",
            method: "USDT (TRC-20)",
            amountNGN: 15500,
            amountUSD: 10.0,
            txHash: "7b134d19d5cb21094ea511c778ef21d604bce31b8d2b",
            status: "Approved",
            timestamp: "Today, 10:15 AM",
          },
          {
            id: "DEP-0982",
            customerEmail: "user@example.com",
            method: "Direct Bank Transfer",
            amountNGN: 9500,
            amountUSD: 6.12,
            txHash: "TRF-GTB-99812401",
            status: "Approved",
            timestamp: "Yesterday, 04:30 PM",
          },
        ];
        setDeposits(initialDeposits);
        localStorage.setItem("admin_deposits", JSON.stringify(initialDeposits));
      }

      // Check if admin updated deposit wallet addresses
      const siteSettings = localStorage.getItem("admin_site_settings");
      if (siteSettings) {
        const parsed = JSON.parse(siteSettings);
        if (parsed.usdtAddress) {
          setCryptoWallets((prev) => ({
            ...prev,
            usdtTrc20: parsed.usdtAddress || prev.usdtTrc20,
            btcAddress: parsed.btcAddress || prev.btcAddress,
            bankName: parsed.bankName || prev.bankName,
            accountNumber: parsed.bankAccountNumber || prev.accountNumber,
            accountName: parsed.bankAccountName || prev.accountName,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddDemoFunds = (amount: number) => {
    const newBal = balanceNGN + amount;
    setBalanceNGN(newBal);
    localStorage.setItem("user_wallet_balance", newBal.toString());
  };

  const handleSubmitDepositProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim()) {
      alert("Please enter your Transaction Hash or Transfer Reference.");
      return;
    }

    const newDeposit: DepositItem = {
      id: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      customerEmail: customerEmail.trim() || "user@example.com",
      method: selectedMethod,
      amountNGN: Number(depositAmountNGN),
      amountUSD: Number((depositAmountNGN / USD_RATE).toFixed(2)),
      txHash: txHash.trim(),
      status: "Pending",
      timestamp: "Just now",
    };

    const updated = [newDeposit, ...deposits];
    setDeposits(updated);
    localStorage.setItem("admin_deposits", JSON.stringify(updated));

    setSubmitSuccess(true);
    setTxHash("");
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 w-full pb-8">
      {/* 1. TOP HEADER & DEMO FUNDS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>Store Wallet System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Wallet & Deposits
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mt-1">
            Fund your store wallet via USDT TRC-20, Bitcoin, or Bank Transfer for instant 0-second checkouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleAddDemoFunds(10000)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            title="Add instant simulated demo funds"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>+ Add Demo ₦10,000</span>
          </button>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy VPNs</span>
          </Link>
        </div>
      </div>

      {/* 2. WALLET BALANCE CARD + QUICK STEPS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Available Balance Box */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
              <Wallet className="w-4 h-4" />
              <span>Available Store Balance</span>
            </div>
            <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full">
              Active & Ready
            </span>
          </div>

          <div className="my-4 relative z-10">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {formatPrice(balanceNGN)}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
              <span>≈ {formatSecondary(balanceNGN)}</span>
              <span className="text-slate-500">(@ 1 USD = ₦1,550)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant 0-second auto deduction at checkout</span>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-bold text-blue-300 hover:text-white"
            >
              <span>Buy VPN Products</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* How to add funds guide */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>How to Add Funds</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              3 Simple Steps to Fund
            </h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium">
              <li>Select payment method (USDT TRC-20, BTC, or Bank).</li>
              <li>Transfer exact amount to the provided store address.</li>
              <li>Paste your Transaction Hash / Reference below for approval.</li>
            </ol>
          </div>

          <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-700 flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-blue-600" />
            <span>Admin approval typically takes 5 to 15 minutes.</span>
          </div>
        </div>
      </div>

      {/* 3. PAYMENT METHOD SELECTION & DEPOSIT DETAILS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Select Deposit Method
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose your preferred payment gateway to view official transfer details.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(["USDT (TRC-20)", "Bitcoin (BTC)", "Direct Bank Transfer"] as const).map(
            (method) => (
              <button
                key={method}
                type="button"
                onClick={() => setSelectedMethod(method)}
                className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedMethod === method
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {method === "Direct Bank Transfer" ? (
                  <Building2 className="w-4 h-4" />
                ) : (
                  <DollarSign className="w-4 h-4" />
                )}
                <span>{method}</span>
              </button>
            )
          )}
        </div>

        {/* Details Box per Method */}
        <div className="p-4 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
          {selectedMethod === "USDT (TRC-20)" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-emerald-800">
                  Network: TRON (TRC-20) Only
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                  Official USDT TRC-20 Deposit Address
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={cryptoWallets.usdtTrc20}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-800 select-all"
                  />
                  <button
                    onClick={() => handleCopy(cryptoWallets.usdtTrc20, "usdt")}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    {copiedField === "usdt" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
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
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  Send only <strong>USDT TRC-20</strong> to this address. Sending via ERC-20, BEP-20, or any other chain will result in permanent loss.
                </span>
              </div>
            </div>
          )}

          {selectedMethod === "Bitcoin (BTC)" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-amber-800">
                  Network: Bitcoin Native (BTC)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                  Official Bitcoin (BTC) Deposit Address
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={cryptoWallets.btcAddress}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-800 select-all"
                  />
                  <button
                    onClick={() => handleCopy(cryptoWallets.btcAddress, "btc")}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    {copiedField === "btc" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
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
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Send only native <strong>Bitcoin (BTC)</strong>. Usually confirms after 1-2 block confirmations.</span>
              </div>
            </div>
          )}

          {selectedMethod === "Direct Bank Transfer" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-blue-800">
                  Instant Nigerian Bank Transfer (NGN)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Bank Name</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{cryptoWallets.bankName}</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Account Number</div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm font-mono font-bold text-blue-600">{cryptoWallets.accountNumber}</span>
                    <button
                      onClick={() => handleCopy(cryptoWallets.accountNumber, "bank-num")}
                      className="text-xs font-bold text-slate-500 hover:text-blue-600"
                    >
                      {copiedField === "bank-num" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Account Name</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{cryptoWallets.accountName}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. SUBMIT DEPOSIT PROOF FORM */}
        <form onSubmit={handleSubmitDepositProof} className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900">
              Submit Payment Proof / Hash for Verification
            </h4>
            <span className="text-xs text-slate-400">* Required for wallet credit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Deposit Amount (NGN ₦)
              </label>
              <input
                type="number"
                required
                min={1000}
                value={depositAmountNGN}
                onChange={(e) => setDepositAmountNGN(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ ${(depositAmountNGN / USD_RATE).toFixed(2)} USD
              </span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Transaction Hash / Reference Number
              </label>
              <input
                type="text"
                required
                placeholder="Paste the Blockchain TxHash or Bank Reference code here..."
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Proof for Admin Verification</span>
            </button>
          </div>

          {submitSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Deposit submitted successfully! Admin will verify and credit your balance within 5-15 mins.</span>
            </div>
          )}
        </form>
      </div>

      {/* 5. DEPOSIT HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Deposit & Funding Records
            </h3>
            <p className="text-xs text-slate-500">
              Track the verification status of your incoming funds.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Total {deposits.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 sm:px-6">Deposit ID</th>
                <th className="py-3 px-4 sm:px-6">Method</th>
                <th className="py-3 px-4 sm:px-6">Amount ({currency})</th>
                <th className="py-3 px-4 sm:px-6">Tx Hash / Ref</th>
                <th className="py-3 px-4 sm:px-6">Time</th>
                <th className="py-3 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {deposits.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-mono font-bold text-blue-600">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900">
                    {item.method}
                  </td>
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">
                    {formatPrice(item.amountNGN, item.amountUSD)}
                  </td>
                  <td className="py-3 px-4 sm:px-6 font-mono text-xs text-slate-500 truncate max-w-[150px]">
                    {item.txHash}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-slate-500 text-xs">
                    {item.timestamp}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-right">
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
    </div>
  );
}
