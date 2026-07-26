export type DoughType = "thin" | "traditional";

export type PizzaSize = 25 | 30 | 35;

export interface PizzaVariant {
  dough: DoughType;
  size: PizzaSize;
  price: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  imageUrl: string;
  variants: PizzaVariant[];
}

export interface CartItem {
  id: string;
  productId: number;
  title: string;
  imageUrl: string;
  dough: DoughType;
  size: PizzaSize;
  price: number;
  quantity: number;
}

export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  productId: number;
  title: string;
  dough: DoughType;
  size: PizzaSize;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  comment?: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}
