"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { Order, OrderStatus } from "@/types/pizza";
import { doughLabelsShort } from "@/components/PizzaCard";

const statusLabels: Record<OrderStatus, string> = {
  new: "Новый",
  processing: "В обработке",
  completed: "Выполнен",
  cancelled: "Отменён",
};

const statusColors: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusOptions: OrderStatus[] = [
  "new",
  "processing",
  "completed",
  "cancelled",
];

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setIsLoading(true);

    try {
      const respons = await api.get("/manage?type=orders");
      setOrders(respons.data.data);
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
      toast.error("Не удалось загрузить заказы");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusChange(orderId: number, status: OrderStatus) {
    try {
      await api.put("/manage", {
        type: "order",
        id: orderId,
        data: { status },
      });

      toast.success("Статус заказа обнавлён");
      loadOrders();
    } catch (error) {
      console.error("Ошибка обнавления статуса", error);
      toast.error("Не удалось обнавить статус");
    }
  }

  const cardClasses = "bg-white border border-gray-100 rounded-2xl p-5 mb-4";

  const headerRowClasses = "flex items-center justify-between";

  const badgeClasses = "text-xs font-medium rounded-full px-3 py-1";

  const infoTextClasses = "text-sm text-gray-500 mt-1";

  const itemsListClasses = "mt-3 text-sm text-gray-700 space-y-1";

  const selectClasses =
    "mt-3 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#fe5f1e]";

  if (isLoading) {
    return <p className="text-gray-500">Загрузка заказов...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-500">Заказов пока нет</p>;
  }

  return (
    <div className="w-150">
      {orders.map((order) => (
        <div key={order.id} className={cardClasses}>
          <div className={headerRowClasses}>
            <span className="font-semibold">{order.fullName}</span>

            <span className={badgeClasses + " " + statusColors[order.status]}>
              {statusLabels[order.status]}
            </span>
          </div>

          <p className={infoTextClasses}>Телефон: {order.phone}</p>
          <p className={infoTextClasses}>Адрес: {order.address}</p>

          {order.comment && (
            <p className={infoTextClasses}>Комментарий: {order.comment}</p>
          )}

          <div className={itemsListClasses}>
            {order.items.map((item, index) => (
              <p key={index}>
                {item.title} ({doughLabelsShort[item.dough]}, {item.size} см) x{" "}
                {item.quantity}
              </p>
            ))}
          </div>

          <p className="mt-3 font-bold text-[#fe5f1e]">
            {order.totalPrice.toLocaleString("ru-RU")} сум
          </p>

          <select
            value={order.status}
            onChange={(event) =>
              handleStatusChange(order.id, event.target.value as OrderStatus)
            }
            className={selectClasses}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
