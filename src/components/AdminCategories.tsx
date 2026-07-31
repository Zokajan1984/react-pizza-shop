"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/axios";
import { Category } from "@/types/pizza";

export function AdminCategories() {
  const [categries, setCategories] = useState<Category[]>([]);
  const [newCatagoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setIsLoading(true);

    try {
      const response = await api.get("/manage?type=categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
      toast.error("Не удалось загрузить категории");
    } finally {
      setIsLoading(false);
    }
  }

  async function hadnleAddCategory() {
    if (newCatagoryName.trim().length === 0) return;

    try {
      await api.post("/manage", {
        type: "category",
        data: { name: newCatagoryName },
      });

      toast.success("Категория добавлена");
      setNewCategoryName("");
      loadCategories();
    } catch (error) {
      console.error("Ошибка добавления категории:", error);
      toast.error("Не удалось добавить категорию");
    }
  }

  async function handleDeleteCategory(id: number) {
    try {
      await api.delete("/manage?type=categry&id=" + id);
      toast.success("Категория удалена");
      loadCategories();
    } catch (error) {
      console.error("Ошибка удаления категории:", error);
      toast.error("Не удалось удалить категорию");
    }
  }

  const rowClasses =
    "flex items-center justify-betweet py-3 border-b border-gray-100";

  const inputClassess =
    "flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#fe5f1e] transition-colors";

  const addButtonClasses =
    "bg-[#fe5f1e] hover:bg-[#e2540f] transition-colors text-white font-semibold rounded-xl px-5 py-2.5";

  const deleteButtonClasses =
    "text-gray-400 hover:text-red-500 transition-colors";

  if (isLoading) {
    return <p className="text-gray-500">Загрузка категорий...</p>;
  }

  return (
    <div>
      <div className="flex gap-3">
        <input
          type="text"
          value={newCatagoryName}
          onChange={(eveent) => setNewCategoryName(eveent.target.value)}
          placeholder="Название новый катогории"
          className={inputClassess}
        />

        <button onClick={hadnleAddCategory} className={addButtonClasses}>
          Добавить
        </button>
      </div>

      <div className="mt-6">
        {categries.map((category) => (
          <div key={category.id} className={rowClasses}>
            <span>{category.name}</span>

            <button
              onClick={() => handleDeleteCategory(category.id)}
              className={deleteButtonClasses}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {categries.length === 0 && (
          <p className="text-gray-500 text-sm">Категорий пока нет</p>
        )}
      </div>
    </div>
  );
}
