"use client";

import { useState } from "react";
import { Product, DoughType, PizzaSize, CartItem } from "@/types/pizza";
import { useCartStore } from "@/store/useCartStore";

interface PizzaCardProps {
  product: Product;
}

const doughLabels: Record<DoughType, string> = {
  traditional: "традиционное",
  thin: "тонкое",
};

export const doughLabelsShort: Record<DoughType, string> = {
  traditional: "традиц.",
  thin: "тонкое",
};

export function PizzaCard({ product }: PizzaCardProps) {
  const [selectedDough, setSelectedDough] = useState<DoughType>(
    product.variants[0].dough,
  );

  const availableSizes = product.variants
    .filter((variant) => variant.dough === selectedDough)
    .map((variant) => variant.size);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>(
    availableSizes[0],
  );

  const currentVariant = product.variants.find(
    (variant) =>
      variant.dough === selectedDough && variant.size === selectedSize,
  );

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  const cartItemId = product.id + "-" + selectedDough + "-" + selectedSize;
  const itemInCart = items.find((item) => item.id === cartItemId);

  function handleDoughChange(dough: DoughType) {
    const sizeForDough = product.variants
      .filter((variant) => variant.dough === dough)
      .map((variant) => variant.size);

    setSelectedDough(dough);
    setSelectedSize(sizeForDough[0]);
  }

  function handleAddToCart() {
    if (!currentVariant) return;

    const newCartItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      title: product.title,
      imageUrl: product.imageUrl,
      dough: selectedDough,
      size: selectedSize,
      price: currentVariant.price,
      quantity: 1,
    };
    addItem(newCartItem);
  }

  const uniqueDoughTypes = Array.from(
    new Set(product.variants.map((variant) => variant.dough)),
  );

  const cardClasses =
    "bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center";

  const imageClasses = "w-84 h-64 object-cover rounded";

  const titleClasses = "mt-4 font-bold text-lg text-center";

  const descriptionClasses =
    "mt-2 text-sm text-gray-500 text-center line-clamp-2";

  const selectorWrapperClasses =
    "mt-4 w-full bg-gray-100 rounded-full p-1 flex";

  const selectorButtonBase =
    "flex-1 text-xs py-2 rounded-full transition-colors";

  const selectorActive = "bg-white text-gray-800 shadow-sm";

  const selectorInactive = "text-gray-500";

  const footerClasses = "mt-4 w-full flex items-center justify-between";

  const priceClasses = "font-bold text-lg";

  const addButtonClasses =
    "relative flex items-center gap-2 border-2 border-[#fe5f1e] rounded-full px-4 py-2 text-[#fe5f1e] font-semibold hover:bg-[#fe5f1e] hover:text-white transition-colors";

  const badgeClasses =
    "absolute -top-2 -right-2 bg-[#fe5f1e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center";

  return (
    <div className={cardClasses}>
      <img
        src={product.imageUrl}
        alt={product.title}
        className={imageClasses}
      />

      <h3 className={titleClasses}>{product.title}</h3>
      <p className={descriptionClasses}>{product.description}</p>

      <div className={selectorWrapperClasses}>
        {uniqueDoughTypes.map((dough) => (
          <button
            key={dough}
            onClick={() => handleDoughChange(dough)}
            className={
              selectedDough === dough
                ? selectorButtonBase + " " + selectorActive
                : selectorButtonBase + " " + selectorInactive
            }
          >
            {doughLabels[dough]}
          </button>
        ))}
      </div>

      <div className={selectorWrapperClasses}>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={
              selectedSize === size
                ? selectorButtonBase + " " + selectorActive
                : selectorButtonBase + " " + selectorInactive
            }
          >
            {size} см
          </button>
        ))}
      </div>

      <div className={footerClasses}>
        <span className={priceClasses}>
          {currentVariant?.price.toLocaleString("ru-RU")} сум
        </span>

        <button onClick={handleAddToCart} className={addButtonClasses}>
          + Добавить{" "}
          {itemInCart && (
            <span className={badgeClasses}>{itemInCart.quantity}</span>
          )}
        </button>
      </div>
    </div>
  );
}
