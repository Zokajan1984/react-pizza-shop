"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Category, Product } from "@/types/pizza";
import { Categories } from "@/components/Categories";
import { Sort, SortType } from "@/components/Sort";
import { PizzaCard } from "@/components/PizzaCard";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeSortType, setActiveSortType] = useState<SortType>("popular");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const categoriesResponse = await api.get("/manage?type=categories");
      const productsResponse = await api.get("/manage?type=products");

      setCategories(categoriesResponse.data.data);
      setProducts(productsResponse.data.data);
    }

    loadData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategoryId === null || product.categoryId === activeCategoryId;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeSortType == "alphabet") {
      return a.title.localeCompare(b.title);
    }

    if (activeSortType === "price") {
      return a.variants[0].price - b.variants[0].price;
    }

    return a.id - b.id;
  });

  const containerClasses = "max-w-6xl mx-auto px-6 py-8";

  const topBarClasses = "flex items-center justify-between flex-wrap gap-4";

  const searchInputClasses =
    "border border-gray-200 ronded-full px-5 py-2.5 text-sm outline-none focus:border-[#fe5f1e] transition-colors w-full sm:w-64";

  const gridClasses =
    "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";

  return (
    <main className={containerClasses}>
      <div className={topBarClasses}>
        <Categories
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
        />

        <input
          type="text"
          placeholder="Поиск пиццы..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className={searchInputClasses}
        />
      </div>

      <div className="mt-6">
        <Sort
          activeSortType={activeSortType}
          onSelectSort={setActiveSortType}
        />
      </div>

      {isLoading && (
        <p className="mt-8 text-center text-gray-500">Загрузка пицц...</p>
      )}

      {!isLoading && sortedProducts.length === 0 && (
        <p className="mt-8 text-center text-gray-500">Ничего не найдено</p>
      )}

      {!isLoading && sortedProducts.length > 0 && (
        <div className={gridClasses}>
          {sortedProducts.map((product) => (
            <PizzaCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
