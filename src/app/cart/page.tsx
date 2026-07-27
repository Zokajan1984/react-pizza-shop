"use client";

import { useCartStore } from "@/store/useCartStore";
import { doughLabelsShort } from "@/components/PizzaCard";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const containerClasses = "max-w-3xl mx-auto px-6 py-8";

  const rowClasses =
    "flex tiems-center justify-berween py-4 border-b border-gray-100";

  const infoClasses = "flex items-center gap-4";
  const imageClasses = "w-16 h-16 rounded-full object-cover";

  const titleClasses = "font-semibold";
  const paramsClasses = "text-sm text-gray-500";
  const counterClasses =
    "flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1";

  const counterButtonClasses =
    "w-6 h-6 flex items-center justify-center rounded-full bg-[#fe5f1e] text-white font-bold text-sm";

  const removeButtonClasses =
    "ml-4 text-sm text-gray-400 hover:text-red-500 transition-colors";

  const totalClasses =
    "mt-6 flex items-center juctify-between text-xl font-bold";

  const totalPriceSlasses = "text-[#fe5f1e]";

  if (items.length === 0) {
    return (
      <main className={containerClasses}>
        <p className="text-center text-gray-500 mt-13">Вашв корзина пуста</p>
      </main>
    );
  }

  return (
    <main className={containerClasses}>
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>

      {items.map((item) => (
        <div key={item.id} className={rowClasses}>
          <div className={infoClasses}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className={imageClasses}
            />

            <div>
              <p className={titleClasses}>{item.title}</p>
              <p className={paramsClasses}>
                {doughLabelsShort[item.dough]}, {item.size} см
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className={counterClasses}>
              <button
                className={counterButtonClasses}
                onClick={() => decreaseQuantity(item.id)}
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

            <span className="ml-4 font-semibold w-24 text-right">
              {(item.price * item.quantity).toLocaleString("ru-RU")} сум
            </span>

            <button
              className={removeButtonClasses}
              onClick={() => removeItem(item.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}

      <div className={totalClasses}>
        <span>Итого:</span>
        <span className={totalPriceSlasses}>
          {totalPrice.toLocaleString("ru-RU")} сум
        </span>
      </div>
    </main>
  );
}
