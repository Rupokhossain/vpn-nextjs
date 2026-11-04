export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  brand: string;
  brandLogoText: string;
  brandColor: string;
  stock: number;
  priceNGN: number;
  priceUSD: number;
  rules: string[];
  description: string;
  isPopular?: boolean;
}
