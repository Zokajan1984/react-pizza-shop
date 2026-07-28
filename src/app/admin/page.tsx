"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCategories } from "@/components/AdminCategories";
import { AdminProducts } from "@/components/AdminProducts";
import { AdminOrder } from "@/components/AdminOrders";

export default function AdminPage() {
  const conatainerClasses = "max-w-5xl mx-auto px-6 py-8";
  return (
    <main className={conatainerClasses}>
      <h1 className="text-2xl font-bold mb-6">Админ панель</h1>

      <Tabs>
        <TabsList>
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
          <AdminOrder />
        </TabsContent>
      </Tabs>
    </main>
  );
}
