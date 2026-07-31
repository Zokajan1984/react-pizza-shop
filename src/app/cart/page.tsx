"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { doughLabelsShort } from "@/components/PizzaCard";
import { OrderModal } from "@/components/OrderModal";

export default function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const containerClasses =
    "max-w-3xl mx-auto px-4 sm:px-6 py-8 overflow-x-hidden";

  const backLinkClasses =
    "flex items-center gap-2 text-gray-500 " +
    "hover:text-[#fe5f1e] transition-colors mb-6";

  const rowClasses =
    "flex flex-wrap items-center justify-between " +
    "gap-3 py-4 border-b border-gray-100 min-w-0";

  const infoClasses = "flex items-center gap-4 min-w-0";
  const imageClasses = "w-16 h-16 rounded-full object-cover shrink-0";

  const titleClasses = "font-semibold truncate";
  const paramsClasses = "text-sm text-gray-500";

  const counterClasses =
    "flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1 shrink-0";

  const counterButtonClasses =
    "w-6 h-6 flex items-center justify-center " +
    "rounded-full bg-[#fe5f1e] text-white font-bold text-sm";

  const removeButtonClasses =
    "ml-4 text-sm text-gray-400 hover:text-red-500 " +
    "transition-colors shrink-0";

  const totalClasses =
    "mt-6 flex items-center justify-between text-xl font-bold";

  const totalPriceClasses = "text-[#fe5f1e]";

  const checkoutButtonClasses =
    "mt-6 w-full bg-[#fe5f1e] hover:bg-[#e2540f] " +
    "transition-colors rounded-full py-4 " +
    "text-white font-semibold text-lg";

  if (items.length === 0) {
    return (
      <main className={containerClasses}>
        <Link href="/" className={backLinkClasses}>
          <ArrowLeft className="w-4 h-4" />
          Назад на главную
        </Link>

        <p className="text-center text-gray-500 mt-12">Ваша корзина пуста</p>
      </main>
    );
  }

  return (
    <main className={containerClasses}>
      <Link href="/" className={backLinkClasses}>
        <ArrowLeft className="w-4 h-4" />
        Назад на главную
      </Link>

      <h1 className="text-2xl font-bold mb-4">Корзина</h1>

      {items.map((item) => (
        <div key={item.id} className={rowClasses}>
          <div className={infoClasses}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className={imageClasses}
            />

            <div className="min-w-0">
              <p className={titleClasses}>{item.title}</p>
              <p className={paramsClasses}>
                {doughLabelsShort[item.dough]}, {item.size} см
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <div className={counterClasses}>
              <button
                onClick={() => decreaseQuantity(item.id)}
                className={counterButtonClasses}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className={counterButtonClasses}
              >
                +
              </button>
            </div>

            <span className="font-semibold w-24 text-right shrink-0">
              {(item.price * item.quantity).toLocaleString("ru-RU")} сум
            </span>

            <button
              onClick={() => removeItem(item.id)}
              className={removeButtonClasses}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}

      <div className={totalClasses}>
        <span>Итого:</span>
        <span className={totalPriceClasses}>
          {totalPrice.toLocaleString("ru-RU")} сум
        </span>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className={checkoutButtonClasses}
      >
        Оформить заказ
      </button>

      <OrderModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
}
