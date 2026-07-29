import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbServer";
import { Category, Product, Order } from "@/types/pizza";
import { error } from "console";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  const db = readDb();

  if (type === "categories") {
    return NextResponse.json({ data: db.categories });
  }

  if (type === "products") {
    const categoryId = searchParams.get("category");

    if (categoryId) {
      const filtered = db.products.filter(
        (product) => product.categoryId === Number(categoryId),
      );
      return NextResponse.json({ data: filtered });
    }

    return NextResponse.json({ data: db.products });
  }

  if (type === "orders") {
    return NextResponse.json({ data: db.orders });
  }

  return NextResponse.json(
    { error: "Неизвесеный тип запроса" },
    { status: 400 },
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, data } = body;

  const db = readDb();

  if (type === "category") {
    const newCategory: Category = {
      id: Date.now(),
      name: data.name,
    };
    db.categories.push(newCategory);
    writeDb(db);
    return NextResponse.json({ data: newCategory });
  }

  if (type === "product") {
    const newProduct: Product = {
      id: Date.now(),
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      variants: data.variants,
    };
    db.products.push(newProduct);
    writeDb(db);
    return NextResponse.json({ data: newProduct });
  }

  if (type === "order") {
    const newOrder: Order = {
      id: Date.now(),
      fullName: data.fullName,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
      items: data.items,
      totalPrice: data.totalPrice,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    db.orders.push(newOrder);
    writeDb(db);
    return NextResponse.json({ data: newOrder });
  }
  return NextResponse.json(
    { error: "Неизвестный тип данных" },
    { status: 400 },
  );
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { type, id, data } = body;

  const db = readDb();

  if (type === "category") {
    db.categories = db.categories.map((category) =>
      category.id === id ? { ...category, ...data } : category,
    );

    writeDb(db);
    return NextResponse.json({ success: true });
  }

  if (type === "product") {
    db.products = db.products.map((product) =>
      product.id === id ? { ...product, ...data } : product,
    );
    writeDb(db);
    return NextResponse.json({ success: true });
  }

  if (type === "order") {
    db.orders = db.orders.map((order) =>
      order.id === id ? { ...order, ...data } : order,
    );
    writeDb(db);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Неизвестный тип данных" },
    { status: 400 },
  );
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const id = Number(searchParams.get("id"));

  const db = readDb();

  if (type === "category") {
    db.categories = db.categories.filter((category) => category.id !== id);
    writeDb(db);
    return NextResponse.json({ success: true });
  }

  if (type === "product") {
    db.products = db.products.filter((product) => product.id !== id);
    writeDb(db);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Неизвестный тип данных" },
    { status: 400 },
  );
}
