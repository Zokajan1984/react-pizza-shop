"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const containerClasses =
    "max-w-6xl mx-auto px-6 py-4 flex items-center justify-between";

  const headerClasses =
    "sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm";

  const cartButtonClasses =
    "flex items-center gap-3 bg-[#fe5f1e] hover:bg-[#e2540f] transition-colors rounded-full px-6 py-3 text-white font-semibold";

  const badgeClasses = "bg-white/25 rounded-full px-2 py-0.5 text-sm";

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        <Link href="/" className="text-2xl font-extrabold text-gray-800">
          React <span className="text-[#fe5f1e]">Pizza</span>
        </Link>

        <Link href="/cart" className={cartButtonClasses}>
          <ShoppingCart className="w-5 h-5" />
          <span>{totalPrice.toLocaleString("ru-RU")} сум</span>
          <span className={badgeClasses}>{totalQuantity}</span>
        </Link>
      </div>
    </header>
  );
}
