"use client";

import { Category } from "@/types/pizza";

interface CategoriesProps {
  categories: Category[];
  activeCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

export function categories({
  categories,
  activeCategoryId,
  onSelectCategory,
}: CategoriesProps) {
  const baseButtonClasses =
    "px-5 py-2.5 rounded-full text-sm font-medium transition-all";

  const inactiveClasses = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  const activeClasses = "bg-white text-[#fe5f1e] shadow-sm";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        className={
          activeCategoryId === null
            ? baseButtonClasses + " " + activeClasses
            : baseButtonClasses + " " + inactiveClasses
        }
      >
        Все
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={
            activeCategoryId === category.id
              ? baseButtonClasses + " " + activeClasses
              : baseButtonClasses + " " + inactiveClasses
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
