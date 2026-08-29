import type { Product } from "@/domain/catalog";

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CartState {
  lines: readonly CartLine[];
}
