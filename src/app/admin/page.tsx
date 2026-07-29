"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCategories } from "@/components/AdminCategories";
import { AdminProducts } from "@/components/AdminProducts";
import { AdminOrders } from "@/components/AdminOrders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminPage() {
  const conatainerClasses = "max-w-5xl mx-auto px-6 py-8";
  return (
    <main className={conatainerClasses}>
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-500 hover:text-[#fe5f1e] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад на главную
      </Link>
      <h1 className="text-2xl font-bold mb-6">Админ панель</h1>

      <Tabs>
        <TabsList className="w-full">
          <TabsTrigger value="products">Продукты</TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
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
