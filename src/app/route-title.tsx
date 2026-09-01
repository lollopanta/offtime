import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { games, getProductBySlug } from "@/domain/catalog";
import { getEventBySlug } from "@/domain/events";

const eventTitleForPath = (pathname: string) => {
  if (!pathname.startsWith("/eventi/")) {
    return;
  }

  const [eventSlug] = pathname.slice("/eventi/".length).split("/");
  const event = eventSlug ? getEventBySlug(eventSlug) : undefined;
  return event ? `${event.name} | OFFTIME` : "Evento non trovato | OFFTIME";
};

const titleForPath = (pathname: string) => {
  if (pathname === "/") {
    return "OFFTIME";
  }
  if (pathname === "/shop") {
    return "Shop | OFFTIME";
  }
  if (pathname.startsWith("/shop/")) {
    const [gameSlug] = pathname.slice("/shop/".length).split("/");
    const game = games.find((item) => item.slug === gameSlug);
    return game ? `${game.name} | Shop | OFFTIME` : "Shop | OFFTIME";
  }
  if (pathname.startsWith("/prodotto/")) {
    const [productSlug] = pathname.slice("/prodotto/".length).split("/");
    const product = productSlug ? getProductBySlug(productSlug) : undefined;
    return product
      ? `${product.name} | OFFTIME`
      : "Prodotto non trovato | OFFTIME";
  }
  if (pathname === "/preordini") {
    return "Preordini | OFFTIME";
  }
  if (pathname === "/eventi") {
    return "Eventi | OFFTIME";
  }
  const eventTitle = eventTitleForPath(pathname);
  if (eventTitle) {
    return eventTitle;
  }
  if (pathname === "/vendi") {
    return "Vendi le tue carte | OFFTIME";
  }
  if (pathname === "/community") {
    return "Community | OFFTIME";
  }
  if (pathname === "/carrello") {
    return "Carrello | OFFTIME";
  }
  if (pathname === "/design-system") {
    return "OFFTIME Design System";
  }
  return "Pagina non trovata | OFFTIME";
};

export function RouteTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titleForPath(pathname);
  }, [pathname]);

  return null;
}
