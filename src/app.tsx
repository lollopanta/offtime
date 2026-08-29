import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RouteTitle } from "@/app/route-title";
import { StorefrontShell } from "@/components/offtime/storefront-shell";
import { CartProvider } from "@/features/cart/cart-context";
import { CartPage } from "@/pages/cart-page";
import { CatalogPage } from "@/pages/catalog-page";
import { DesignSystemPage } from "@/pages/design-system";
import { DestinationPage, EventsPage } from "@/pages/destination-pages";
import { NotFoundPage } from "@/pages/not-found-page";
import { ProductPage } from "@/pages/product-page";
import { StorefrontPage } from "@/pages/storefront";

const LazySellCardsPage = lazy(() =>
  import("@/pages/sell-cards-page").then((m) => ({ default: m.SellCardsPage }))
);

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <RouteTitle />
        <Routes>
          <Route element={<StorefrontShell />}>
            <Route element={<StorefrontPage />} index />
            <Route element={<CatalogPage />} path="shop" />
            <Route element={<CatalogPage />} path="shop/:game" />
            <Route element={<ProductPage />} path="prodotto/:slug" />
            <Route element={<CatalogPage preorderOnly />} path="preordini" />
            <Route element={<EventsPage />} path="eventi" />
            <Route element={<EventsPage />} path="eventi/:eventSlug" />
            <Route
              element={
                <Suspense>
                  <LazySellCardsPage />
                </Suspense>
              }
              path="vendi"
            />
            <Route
              element={<DestinationPage kind="community" />}
              path="community"
            />
            <Route element={<CartPage />} path="carrello" />
            <Route element={<NotFoundPage />} path="*" />
          </Route>
          <Route element={<DesignSystemPage />} path="design-system" />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
