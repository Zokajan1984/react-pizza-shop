"use client";

import { useState } from "react";
import { IMaskInput } from "react-imask";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { api } from "@/lib/axios";
import { useCartStore } from "@/store/useCartStore";
import { OrderItem } from "@/types/pizza";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderModal({ open, onOpenChange }: OrderModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const isPhoneValid = phone.replace(/\D/g, "").length === 12;
  const isFormValid =
    fullName.trim().length > 0 && address.trim().length > 0 && isPhoneValid;

  const inputClasses =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#fe5f1e] transition-colors";

  const labelClasses = "text-sm font-medium text-gray-700 mb-1 block";

  const submitButtonClasses =
    "w-full bg-[#fe5f1e] hover:bg-[#e2540f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-xl py-3 text-white font-semibold mt-2";

  async function handleSubmit() {
    if (!isFormValid) return;

    setIsSubmitting(true);

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.productId,
      title: item.title,
      dough: item.dough,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      await api.post("/manage", {
        type: "order",
        data: {
          fullName,
          phone,
          address,
          comment,
          items: orderItems,
          totalPrice,
        },
      });

      toast.success("Заказ успешно оформлен!");
      clearCart();
      onOpenChange(false);
      setFullName("");
      setPhone("");
      setAddress("");
      setComment("");
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      toast.error("Не удалось оформить заказ. Попробуйте снова");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div>
            <label className={labelClasses}>Имя и фамилия</label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Али Алиев"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Телефон</label>
            <IMaskInput
              mask="+998 (00) 000-00-00"
              value={phone}
              onAccept={(value: string) => setPhone(value)}
              placeholder="+998 (__) ___-__-__"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Адрес доставки</label>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Улица, дом, квартира"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Комментарий (необезательно)</label>
            <input
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Домофон, этаж и т.д"
              className={inputClasses}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={submitButtonClasses}
          >
            {isSubmitting
              ? "Оформляем..."
              : "Подтвердить заказ на" +
                totalPrice.toLocaleString("ru-RU") +
                " сум"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
