"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "NGN";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  symbol: string;
  usdRate: number; // 1 USD = 1550 NGN
  formatPrice: (ngn: number, usd?: number) => string;
  formatSecondary: (ngn: number, usd?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const usdRate = 1550; // Exchange rate

  // Load preferred currency from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_currency");
      if (saved === "USD" || saved === "NGN") {
        setCurrencyState(saved);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("app_currency", c);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleCurrency = () => {
    const next = currency === "USD" ? "NGN" : "USD";
    setCurrency(next);
  };

  const symbol = currency === "USD" ? "$" : "₦";

  // Primary formatted string
  const formatPrice = (ngn: number, usd?: number): string => {
    if (currency === "USD") {
      const val = usd !== undefined ? usd : ngn / usdRate;
      return `$${val.toFixed(2)}`;
    } else {
      return `₦${ngn.toLocaleString()}.00`;
    }
  };

  // Secondary formatted string for small subtext
  const formatSecondary = (ngn: number, usd?: number): string => {
    if (currency === "USD") {
      return `(₦${ngn.toLocaleString()})`;
    } else {
      const val = usd !== undefined ? usd : ngn / usdRate;
      return `($${val.toFixed(2)})`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        symbol,
        usdRate,
        formatPrice,
        formatSecondary,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
