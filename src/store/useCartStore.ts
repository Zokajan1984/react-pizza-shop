import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/pizza";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existingItem = get().items.find(
          (cartItem) => cartItem.id === item.id,
        );

        if (existingItem) {
          set({
            items: get().items.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem,
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((cartItem) => cartItem.id !== id),
        });
      },

      increaseQuantity: (id) => {
        set({
          items: get().items.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        });
      },

      decreaseQuantity: (id) => {
        const existingItem = get().items.find((cartItem) => cartItem.id === id);

        if (existingItem && existingItem.quantity <= 1) {
          set({
            items: get().items.filter((cartItem) => cartItem.id !== id),
          });
        } else {
          set({
            items: get().items.map((cartItem) =>
              cartItem.id === id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem,
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0,
        );
      },

      getTotalQuantity: () => {
        return get().items.reduce(
          (sum, cartItem) => sum + cartItem.quantity,
          0,
        );
      },
    }),
    {
      name: "pizza-cart-storage",
    },
  ),
);
