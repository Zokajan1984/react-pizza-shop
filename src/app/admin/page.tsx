"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCategories } from "@/components/AdminCategories";
import { AdminProducts } from "@/components/AdminProducts";
import { AdminOrders } from "@/components/AdminOrders";

export default function AdminPage() {
  const containerClasses = "max-w-5xl mx-auto px-6 py-8";

  const tabsListClasses =
    "bg-gray-100 rounded-full p-1 inline-flex gap-1 w-full";

  const tabsTriggerClasses =
    "rounded-full px-5 py-2 text-sm font-medium " +
    "transition-colors text-gray-600 " +
    "hover:text-gray-800 " +
    "data-[state=active]:bg-white " +
    "data-[state=active]:text-[#fe5f1e] " +
    "data-[state=active]:shadow-sm";

  return (
    <main className={containerClasses}>
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-500 hover:text-[#fe5f1e] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад на главную
      </Link>

      <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>

      <Tabs defaultValue="products" className="w-150">
        <TabsList className={tabsListClasses}>
          <TabsTrigger value="products" className={tabsTriggerClasses}>
            Продукты
          </TabsTrigger>
          <TabsTrigger value="categories" className={tabsTriggerClasses}>
            Категории
          </TabsTrigger>
          <TabsTrigger value="orders" className={tabsTriggerClasses}>
            Заказы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <AdminProducts />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <AdminCategories />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <AdminOrders />
        </TabsContent>
      </Tabs>
    </main>
  );
}
