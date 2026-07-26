import fs from "fs";
import path from "path";
import { Category, Product, Order } from "@/types/pizza";

interface Database {
  categories: Category[];
  products: Product[];
  orders: Order[];
}

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

export function readDb(): Database {
  const fileContent = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(fileContent) as Database;
}

export function writeDb(data: Database): void {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}
