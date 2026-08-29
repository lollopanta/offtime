import * as React from "react";

import type { CartLine, CartState } from "@/domain/cart";
import { type Product, products } from "@/domain/catalog";

type CartAction =
  | { product: Product; quantity: number; type: "add" }
  | { productId: string; quantity: number; type: "quantity" }
  | { productId: string; type: "remove" };

interface CartContextValue {
  addProduct: (product: Product, quantity?: number) => void;
  count: number;
  lines: readonly CartLine[];
  removeProduct: (productId: string) => void;
  subtotal: number;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

const storageKey = "offtime-cart";

function initialCart(): CartState {
  if (typeof window === "undefined") {
    return { lines: [] };
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    const stored: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(stored)) {
      return { lines: [] };
    }

    const lines: CartLine[] = [];
    for (const item of stored) {
      if (
        !item ||
        typeof item !== "object" ||
        !("productId" in item) ||
        !("quantity" in item) ||
        typeof item.productId !== "string" ||
        typeof item.quantity !== "number" ||
        item.quantity < 1
      ) {
        continue;
      }

      const product = products.find(
        (candidate) => candidate.id === item.productId
      );
      if (product && product.status !== "sold-out") {
        lines.push({ product, quantity: Math.floor(item.quantity) });
      }
    }
    return { lines };
  } catch {
    return { lines: [] };
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "remove") {
    return {
      lines: state.lines.filter((line) => line.product.id !== action.productId),
    };
  }

  if (action.type === "quantity") {
    return {
      lines: state.lines.flatMap((line) => {
        if (line.product.id !== action.productId) {
          return [line];
        }
        if (action.quantity <= 0) {
          return [];
        }
        return [{ ...line, quantity: action.quantity }];
      }),
    };
  }

  if (action.product.status === "sold-out") {
    return state;
  }

  const existing = state.lines.find(
    (line) => line.product.id === action.product.id
  );
  if (existing) {
    return {
      lines: state.lines.map((line) =>
        line.product.id === action.product.id
          ? { ...line, quantity: line.quantity + action.quantity }
          : line
      ),
    };
  }

  return {
    lines: [
      ...state.lines,
      { product: action.product, quantity: action.quantity },
    ],
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(
    cartReducer,
    undefined,
    initialCart
  );
  React.useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(
        state.lines.map((line) => ({
          productId: line.product.id,
          quantity: line.quantity,
        }))
      )
    );
  }, [state.lines]);
  const value = React.useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = state.lines.reduce(
      (total, line) => total + line.product.price * line.quantity,
      0
    );

    return {
      addProduct(product, quantity = 1) {
        dispatch({ product, quantity: Math.max(1, quantity), type: "add" });
      },
      count,
      lines: state.lines,
      removeProduct(productId) {
        dispatch({ productId, type: "remove" });
      },
      subtotal,
      updateQuantity(productId, quantity) {
        dispatch({ productId, quantity, type: "quantity" });
      },
    };
  }, [state.lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
