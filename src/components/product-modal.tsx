"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import {
  X,
  AlertCircle,
  Minus,
  Plus,
  MessageCircle,
  Wallet,
  CheckCircle2,
  Copy,
  Clock,
  Key,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [userBalance, setUserBalance] = useState<number>(25000);
  const [deliveredOrder, setDeliveredOrder] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const totalPriceNGN = product.priceNGN * quantity;
  const totalPriceUSD = (product.priceUSD * quantity).toFixed(2);

  // WhatsApp order direct message link
  const orderMessage = encodeURIComponent(
    `Hello! I want to order from NexVPN Store:\n\nProduct: ${product.name}\nQuantity: ${quantity}\nTotal Amount: ₦${totalPriceNGN.toLocaleString()} ($${totalPriceUSD})\n\nPlease provide payment details and delivery.`
  );
  const whatsappUrl = `https://wa.me/?text=${orderMessage}`;

  // Instant Wallet Checkout
  const handleWalletPurchase = () => {
    setInsufficientBalance(false);
    setIsProcessing(true);

    try {
      const savedBal = localStorage.getItem("user_wallet_balance");
      const currentBal = savedBal !== null ? parseFloat(savedBal) : 25000;
      setUserBalance(currentBal);

      if (currentBal < totalPriceNGN) {
        setIsProcessing(false);
        setInsufficientBalance(true);
        return;
      }

      // Deduct balance
      const newBalance = currentBal - totalPriceNGN;
      localStorage.setItem("user_wallet_balance", newBalance.toString());

      // Generate credentials
      const generatedCreds: string[] = [];
      const cleanBrand = product.brand.toLowerCase().replace(/\s+/g, "");
      for (let i = 0; i < quantity; i++) {
        const randNum = Math.floor(100 + Math.random() * 900);
        const passNum = Math.floor(1000 + Math.random() * 9000);
        generatedCreds.push(`${cleanBrand}_user_${randNum}@nexvpn.store : Pass${passNum}!#x`);
      }

      // Create Order
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerEmail: "user@example.com",
        customerContact: "WhatsApp / Web Checkout",
        productName: product.name,
        quantity: quantity,
        totalNGN: totalPriceNGN,
        totalUSD: parseFloat(totalPriceUSD),
        paymentMethod: "Wallet" as const,
        status: "Delivered" as const,
        timestamp: "Just now",
        credentials: generatedCreds,
      };

      // Save to admin_orders in localStorage
      const existingOrdersRaw = localStorage.getItem("admin_orders");
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem("admin_orders", JSON.stringify([newOrder, ...existingOrders]));

      setDeliveredOrder(newOrder);
      setPurchaseSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* MODAL CARD */}
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ============================================================ */}
        {/* CASE 1: INSTANT DELIVERY CONFIRMATION SCREEN (SUCCESS)        */}
        {/* ============================================================ */}
        {purchaseSuccess && deliveredOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* SUCCESS BANNER */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                ⚡ Instant 0-Second Auto Delivery
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Order Successful!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Payment verified. Order <span className="font-mono font-bold text-blue-600">{deliveredOrder.id}</span> has been fulfilled automatically.
              </p>
            </div>

            {/* DELIVERED CREDENTIALS BOX */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider">
                  <Key className="w-4 h-4" />
                  <span>Delivered Login Credentials ({deliveredOrder.credentials.length})</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  {deliveredOrder.productName}
                </span>
              </div>

              <div className="space-y-2">
                {deliveredOrder.credentials.map((cred: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 bg-slate-800/90 rounded-xl border border-slate-700/80 font-mono text-xs sm:text-sm"
                  >
                    <span className="text-emerald-400 select-all truncate">{cred}</span>
                    <button
                      onClick={() => handleCopy(cred, `cred-${idx}`)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedKey === `cred-${idx}` ? (
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

            {/* WARRANTY WARNING CALLOUT */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-amber-800">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>1-Hour Replacement Guarantee Active</span>
              </div>
              <p className="leading-relaxed">
                Please test your credentials immediately. If any issue arises, contact support or request a replacement within 60 minutes with your Order ID.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                href="/orders"
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <span>View in My Orders</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>

          </div>
        ) : (
          /* ============================================================ */
          /* CASE 2: REGULAR PRODUCT DETAILS & CHECKOUT SCREEN            */
          /* ============================================================ */
          <>
            {/* HEADER */}
            <div className="p-6 bg-slate-50/90 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${product.brandColor} shadow-xs shrink-0`}>
                  {product.brandLogoText}
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {product.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* INSUFFICIENT BALANCE ALERT */}
              {insufficientBalance && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between font-bold">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Insufficient Wallet Balance</span>
                    </div>
                    <span className="font-mono">₦{userBalance.toLocaleString()} available</span>
                  </div>
                  <p>
                    You need <strong>₦{totalPriceNGN.toLocaleString()}</strong> to complete this purchase. Please deposit funds into your wallet to proceed.
                  </p>
                  <Link
                    href="/wallet"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 font-bold text-rose-700 hover:underline pt-1"
                  >
                    <span>Go to Wallet & Fund Account →</span>
                  </Link>
                </div>
              )}

              {/* STOCK & PRICING OVERVIEW */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Availability</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-600 flex items-center justify-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{product.stock} qty. in stock</span>
                  </div>
                </div>
                <div className="border-l border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Per Quantity</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    ₦{product.priceNGN.toLocaleString()}.00
                    <span className="text-xs text-slate-500 font-normal ml-1">
                      (${product.priceUSD.toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Product Details & Instructions
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {product.description}
                </p>
              </div>

              {/* RULES & WARRANTY */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/60 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wide">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Important Usage Rules & Warranty</span>
                </div>
                <ul className="text-xs text-amber-950/90 space-y-1.5 pl-5 list-disc">
                  {product.rules.map((rule, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {rule}
                    </li>
                  ))}
                  <li className="font-semibold text-amber-900">
                    Strict 1-Hour Replacement Warranty from instant time of purchase.
                  </li>
                </ul>
              </div>

              {/* QUANTITY SELECTOR & PRICING CALCULATION */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Quantity</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-base font-bold text-slate-900 min-w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock}
                      className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Total Price</div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    ₦{totalPriceNGN.toLocaleString()}.00
                    <span className="text-xs text-slate-500 font-normal ml-1.5">
                      (${totalPriceUSD})
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>

              <button
                onClick={handleWalletPurchase}
                disabled={isProcessing}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span>{isProcessing ? "Processing..." : "Pay with Wallet Balance"}</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
