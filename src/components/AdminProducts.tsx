"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/axios";
import {
  Category,
  Product,
  DoughType,
  PizzaSize,
  PizzaVariant,
} from "@/types/pizza";
import { table } from "console";

const emptyVariant: PizzaVariant = {
  dough: "traditional",
  size: 25,
  price: 0,
};

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [variants, setVariants] = useState<PizzaVariant[]>([
    { ...emptyVariant },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        api.get("/manage?type=products"),
        api.get("/manage?type=categories"),
      ]);

      setProducts(productsResponse.data.data);
      setCategories(categoriesResponse.data.data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      toast.error("Не удалось загрузить данные");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddVariantRow() {
    setVariants([...variants, { ...emptyVariant }]);
  }

  function handleRemoveVariantRow(index: number) {
    setVariants(variants.filter((_, variantIndex) => variantIndex !== index));
  }

  function handleVariantChange(
    index: number,
    field: keyof PizzaVariant,
    value: string,
  ) {
    setVariants(
      variants.map((variant, variantIndex) => {
        if (variantIndex !== index) return variant;

        if (field === "dough") {
          return { ...variant, dough: value as DoughType };
        }

        if (field === "size") {
          return { ...variant, size: Number(value) as PizzaSize };
        }

        return { ...variant, price: Number(value) };
      }),
    );
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCategoryId(null);
    setVariants([{ ...emptyVariant }]);
  }

  async function handleAddProduct() {
    if (
      title.trim().length === 0 ||
      imageUrl.trim().length === 0 ||
      categoryId === null
    ) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    try {
      await api.post("/manage", {
        type: "product",
        data: {
          title,
          description,
          imageUrl,
          categoryId,
          variants,
        },
      });

      toast.success("Пицца длбавлена");
      resetForm();
      loadData();
    } catch (error) {
      console.error("Ошибка добавления пиццы:", error);
      toast.error("Не удалось добавить пиццу");
    }
  }

  async function handleDeleteProduct(id: number) {
    try {
      await api.delete("/manage?type=product&id=" + id);
      toast.success("Пицца удалена");
      loadData();
    } catch (error) {
      console.error("Ошибка удаления пиццы:", error);
      toast.error("Не удалось удалить пиццу");
    }
  }

  const inputClasses =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#fe5f1e] transition-colors";

  const labelClasses = "text-sm font-medium text-gray-700 mb-1 block";

  const formCardClasses = "bg-white border border-gray-100 rounded-2xl p-6";

  const variantRowClasses = "flex items-center gap-3 mt-3";

  const smallInputClasses =
    "border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#fe5f1e] transitio-colors";

  const addButtonClasses =
    "mt-6 w-full bg-[#fe5f1e] hover:bg-[#e2540f] transition-colors text-white font-semibold rounded-xl py-3";

  const productRowClasses =
    "flex items-center justify-between py-3 border-b border-gray-100";

  const productInfoClasses = "flex items-center gap-3";

  const productImageClasses = "w-12 h-12 rounded-full object-cover";

  const deleteButtonClasses =
    "text-gray-400 hover:text-red-500 transition-colors";

  if (isLoading) {
    return <p className="text-gray-500">Загрузка продуктов...</p>;
  }

  return (
    <div>
      <div className={formCardClasses}>
        <h3 className="font-bold text-lg mb-4">Добавить пиццу</h3>

        <label className={labelClasses}>Название</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Название пиццы"
          className={inputClasses}
        />

        <label className={labelClasses + " mt-4"}>Описание</label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Описание пиццы"
          className={inputClasses}
        />

        <label className={labelClasses + " mt-4"}>Ссылка на картинку</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://..."
          className={inputClasses}
        />

        <label className={labelClasses + " mt-4"}>Категория</label>
        <select
          value={categoryId ?? ""}
          onChange={(event) => setCategoryId(Number(event.target.value))}
          className={inputClasses}
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label className={labelClasses + " mt-4"}>Варианты</label>

        {variants.map((variant, index) => (
          <div key={index} className={variantRowClasses}>
            <select
              value={variant.dough}
              onChange={(event) =>
                handleVariantChange(index, "dough", event.target.value)
              }
              className={smallInputClasses}
            >
              <option value="traditional">традиционное</option>
              <option value="thin">тонкое</option>
            </select>

            <select
              value={variant.size}
              onChange={(event) =>
                handleVariantChange(index, "size", event.target.value)
              }
              className={smallInputClasses}
            >
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={35}>35</option>
            </select>

            <input
              type="number"
              value={variant.price}
              onChange={(event) =>
                handleVariantChange(index, "price", event.target.value)
              }
              placeholder="Цена"
              className={smallInputClasses + " w-28"}
            />

            <button
              onClick={() => handleRemoveVariantRow(index)}
              className={deleteButtonClasses}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddVariantRow}
          className="mt-3 flex items-center gap-2 text-sm text-[#fe5f1e] font-medium"
        >
          <Plus className="w-4 h-4" />
          Добавить вариант
        </button>

        <button onClick={handleAddProduct} className={addButtonClasses}>
          Сохранить пиццу
        </button>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">Список пицц</h3>

        {products.map((product) => (
          <div key={product.id} className={productRowClasses}>
            <div className={productInfoClasses}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className={productImageClasses}
              />

              <span>{product.title}</span>
            </div>

            <button
              onClick={() => handleDeleteProduct(product.id)}
              className={deleteButtonClasses}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
