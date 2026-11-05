"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";
import { productsData, categoriesList } from "@/data/mock-products";
import ProductModal from "@/components/product-modal";
import { useCurrency } from "@/context/currency-context";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  X,
  SlidersHorizontal,
  Flame,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function CategoryProductFilter() {
  const { formatPrice, formatSecondary } = useCurrency();
  const [allProducts, setAllProducts] = useState<Product[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "stock">("featured");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_products_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllProducts(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allProducts.length };
    allProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStock = inStockOnly ? item.stock > 0 : true;

      return matchesCategory && matchesSearch && matchesStock;
    });

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceNGN - b.priceNGN);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceNGN - a.priceNGN);
    } else if (sortBy === "stock") {
      result.sort((a, b) => b.stock - a.stock);
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, inStockOnly, sortBy]);

  // Grouped products when "All" is active and no active search query
  const groupedCategories = useMemo(() => {
    if (selectedCategory !== "All") {
      return [{ categoryName: selectedCategory, items: filteredProducts }];
    }

    const groups: { categoryName: string; items: Product[] }[] = [];
    const distinctCategories = Array.from(
      new Set(filteredProducts.map((p) => p.category))
    );

    distinctCategories.forEach((cat) => {
      const items = filteredProducts.filter((p) => p.category === cat);
      if (items.length > 0) {
        groups.push({ categoryName: cat, items });
      }
    });

    return groups;
  }, [filteredProducts, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      
      {/* 1. HORIZONTAL CATEGORY SCROLL PILLS (TOP FAST ACCESS) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {categoriesList.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 scale-102"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. MAIN 2-COLUMN LAYOUT: CATEGORY SIDEBAR (LEFT) + PRODUCTS GRID (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: DESKTOP CATEGORY FILTER SIDEBAR (3 COLS) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-sm font-black text-slate-900">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Category Filter</span>
            </div>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Category List with Counts */}
          <div className="space-y-1">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate pr-2">{cat}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filters */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Preferences
            </span>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <span>In-Stock Only</span>
            </label>
          </div>
        </aside>

        {/* RIGHT COLUMN: MAIN INVENTORY DISPLAY (9 COLS) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* SEARCH & SORT TOOLBAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by brand, title, or service..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & In-Stock Toolbar */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock">Highest Stock</option>
                </select>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden p-2.5 bg-slate-100 rounded-xl text-slate-700"
                aria-label="Toggle Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACTIVE FILTER HEADER */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
            <div>
              Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items in{" "}
              <span className="font-bold text-blue-600">{selectedCategory}</span>
            </div>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Category Filter</span>
              </button>
            )}
          </div>

          {/* NO PRODUCTS STATE */}
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No accounts match your current filter or search criteria. Try selecting another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setInStockOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* PRODUCT CARDS: GROUPED BY CATEGORY OR FILTERED */}
          {groupedCategories.map((group) => (
            <div key={group.categoryName} className="space-y-4">
              {/* Category Section Header */}
              {selectedCategory === "All" && (
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {group.categoryName}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {group.items.length} {group.items.length === 1 ? "Item" : "Items"}
                  </span>
                </div>
              )}

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {group.items.map((product) => {
                  const isOutOfStock = product.stock <= 0;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* TOP ROW: BRAND & STOCK */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${product.brandColor} shadow-2xs`}
                          >
                            {product.brand}
                          </span>

                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              Out of Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Stock: {product.stock}
                            </span>
                          )}
                        </div>

                        {/* PRODUCT TITLE */}
                        <h4
                          onClick={() => setActiveModalProduct(product)}
                          className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                        >
                          {product.name}
                        </h4>

                        {/* PRODUCT DESCRIPTION */}
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* BOTTOM: PRICE & BUY TRIGGER */}
                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[10px] text-slate-400 font-medium">Price:</div>
                          <div className="text-base sm:text-lg font-black text-slate-900">
                            {formatPrice(product.priceNGN, product.priceUSD)}
                            <span className="text-[11px] font-normal text-slate-500 block sm:inline sm:ml-1">
                              {formatSecondary(product.priceNGN, product.priceUSD)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveModalProduct(product)}
                          disabled={isOutOfStock}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-xs ${
                            isOutOfStock
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95"
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isOutOfStock ? "Sold Out" : "View Accounts"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 3. PRODUCT PURCHASE / RULES MODAL */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}
