"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";
import { productsData, categoriesList } from "@/data/mock-products";
import ProductModal from "@/components/product-modal";
import { useCurrency } from "@/context/currency-context";
import {
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Eye,
  Search,
  Check,
} from "lucide-react";

export default function ProductShowcase() {
  const { formatPrice, formatSecondary } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
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

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  // Group products by category when "All" is selected
  const groupedCategories = useMemo(() => {
    if (selectedCategory !== "All") {
      return [{ categoryName: selectedCategory, items: filteredProducts }];
    }

    const groups: { categoryName: string; items: Product[] }[] = [];
    const categoriesInFiltered = Array.from(
      new Set(filteredProducts.map((p) => p.category))
    );

    categoriesInFiltered.forEach((cat) => {
      const items = filteredProducts.filter((p) => p.category === cat);
      if (items.length > 0) {
        groups.push({ categoryName: cat, items });
      }
    });

    return groups;
  }, [filteredProducts, selectedCategory]);

  return (
    <section className="w-full py-8 sm:py-12" id="products" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" suppressHydrationWarning>
        
        {/* 1. TOP BAR: CATEGORY DROPDOWN BUTTON & SEARCH */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-30">
          
          {/* CATEGORY DROPDOWN TRIGGER BUTTON */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="inline-flex items-center justify-between gap-2.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all min-w-[170px]"
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span>Category</span>
              </div>
              {categoryDropdownOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* CATEGORY DROPDOWN MENU */}
            {categoryDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCategoryDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[380px] overflow-y-auto">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Category
                  </div>
                  {categoriesList.map((cat, idx) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <span className="uppercase">{cat}</span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* SEARCH INPUT & ACTIVE FILTER BADGE */}
          <div className="flex items-center gap-2 flex-1 sm:max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or brand..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl border border-blue-200 whitespace-nowrap transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>

        </div>

        {/* 2. MODERN PRODUCT CARDS GRID (GROUPED BY CATEGORY) */}
        {groupedCategories.length > 0 ? (
          <div className="space-y-10" suppressHydrationWarning>
            {groupedCategories.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                
                {/* CATEGORY SECTION HEADER */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span>{group.categoryName}</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {group.items.length} {group.items.length === 1 ? "Product" : "Products"}
                  </span>
                </div>

                {/* MODERN 3-COLUMN CARD GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {group.items.map((product) => {
                    const isOutOfStock = product.stock <= 0;

                    return (
                      <div
                        key={product.id}
                        className="group bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* TOP ROW: BRAND BADGE & IN STOCK STATUS */}
                          <div className="flex items-center justify-between gap-2 mb-3.5">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${product.brandColor} shadow-2xs`}>
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
                                In Stock: {product.stock} qty.
                              </span>
                            )}
                          </div>

                          {/* PRODUCT TITLE */}
                          <h4
                            onClick={() => setActiveModalProduct(product)}
                            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                          >
                            {product.name}
                          </h4>

                          {/* SHORT DESCRIPTION SNIPPET */}
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* BOTTOM AREA: PER QUANTITY PRICE & VIEW ACCOUNTS BUTTON */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-[11px] text-slate-500 font-medium">Per Quantity:</div>
                            <div className="text-lg sm:text-xl font-black text-slate-900">
                              {formatPrice(product.priceNGN, product.priceUSD)}
                              <span className="text-[11px] font-normal text-slate-500 block sm:inline sm:ml-1">
                                {formatSecondary(product.priceNGN, product.priceUSD)}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveModalProduct(product)}
                            disabled={isOutOfStock}
                            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                              isOutOfStock
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95"
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                            <span>{isOutOfStock ? "Out of Stock" : "View Accounts"}</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* EMPTY SEARCH STATE */
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-3">
            <Search className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">No products found</h4>
            <p className="text-xs text-slate-500">
              No product matched your search query. Try clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* 3. PRODUCT MODAL */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
