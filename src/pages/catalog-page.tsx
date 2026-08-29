import { FilterIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import * as React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { ProductCard } from "@/components/offtime/product-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  type CatalogSort,
  games,
  getProducts,
  type ProductStatus,
  productLanguages,
  productTypes,
  sortProducts,
} from "@/domain/catalog";

const statusOptions: readonly {
  value: "all" | ProductStatus;
  label: string;
}[] = [
  { label: "Tutte le disponibilità", value: "all" },
  { label: "Disponibili", value: "available" },
  { label: "Preordini", value: "preorder" },
  { label: "In saldo", value: "sale" },
  { label: "Esauriti", value: "sold-out" },
];

const sortOptions: readonly { value: CatalogSort; label: string }[] = [
  { label: "Più recenti", value: "newest" },
  { label: "Prezzo crescente", value: "price-asc" },
  { label: "Prezzo decrescente", value: "price-desc" },
  { label: "Nome", value: "name" },
];

const selectClassName =
  "h-11 min-w-0 rounded-md border border-input bg-background px-3 text-base text-foreground sm:text-sm";

function CatalogControls({
  game,
  language,
  onGameChange,
  onLanguageChange,
  onStatusChange,
  onTypeChange,
  preorderOnly,
  status,
  type,
}: {
  game: string;
  language: string;
  onGameChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onStatusChange: (value: "all" | ProductStatus) => void;
  onTypeChange: (value: string) => void;
  preorderOnly: boolean;
  status: "all" | ProductStatus;
  type: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {preorderOnly ? null : (
        <label className="flex flex-col gap-2 font-medium text-sm">
          Gioco
          <select
            className={selectClassName}
            name="game"
            onChange={(event) => onGameChange(event.target.value)}
            value={game}
          >
            <option value="">Tutti i giochi</option>
            {games.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {preorderOnly ? null : (
        <label className="flex flex-col gap-2 font-medium text-sm">
          Disponibilità
          <select
            className={selectClassName}
            name="status"
            onChange={(event) =>
              onStatusChange(event.target.value as "all" | ProductStatus)
            }
            value={status}
          >
            {statusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="flex flex-col gap-2 font-medium text-sm">
        Tipo di prodotto
        <select
          className={selectClassName}
          name="type"
          onChange={(event) => onTypeChange(event.target.value)}
          value={type}
        >
          <option value="">Tutti i tipi</option>
          {productTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 font-medium text-sm">
        Lingua
        <select
          className={selectClassName}
          name="language"
          onChange={(event) => onLanguageChange(event.target.value)}
          value={language}
        >
          <option value="">Tutte le lingue</option>
          {productLanguages.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
function CatalogSortControl({
  onSortChange,
  sort,
}: {
  onSortChange: (value: CatalogSort) => void;
  sort: CatalogSort;
}) {
  return (
    <label className="min-w-0">
      <span className="sr-only">Ordina prodotti</span>
      <select
        className={`${selectClassName} w-full`}
        name="sort"
        onChange={(event) => onSortChange(event.target.value as CatalogSort)}
        value={sort}
      >
        {sortOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function getCatalogIntro(preorderOnly: boolean, selectedGameName?: string) {
  if (preorderOnly) {
    return {
      description:
        "Prenota ora: ti aggiorniamo quando il prodotto arriva in negozio.",
      eyebrow: "In arrivo",
      title: "Blocca il tuo prossimo set.",
    };
  }
  if (selectedGameName) {
    return {
      description: `Box, carte e accessori ${selectedGameName} selezionati per la tua collezione.`,
      eyebrow: "Shop OFFTIME",
      title: `Shop · ${selectedGameName}.`,
    };
  }
  return {
    description:
      "Box, carte, accessori e collezionabili selezionati per il prossimo capitolo della tua raccolta.",
    eyebrow: "Catalogo OFFTIME",
    title: "Shop.",
  };
}

export function CatalogPage({
  preorderOnly = false,
}: {
  preorderOnly?: boolean;
}) {
  const navigate = useNavigate();
  const { game: gameParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [visibleCount, setVisibleCount] = React.useState(8);
  const status = preorderOnly
    ? "preorder"
    : ((searchParams.get("status") as "all" | ProductStatus | null) ?? "all");
  const sort = (searchParams.get("sort") as CatalogSort | null) ?? "newest";
  const game = gameParam ?? searchParams.get("game") ?? "";
  const language = searchParams.get("language") ?? "";
  const type = searchParams.get("type") ?? "";
  const statusIsValid = statusOptions.some((item) => item.value === status);
  const sortIsValid = sortOptions.some((item) => item.value === sort);
  const activeStatus = statusIsValid ? status : "all";
  const activeSort = sortIsValid ? sort : "newest";
  const selectedGame = games.find((item) => item.slug === game);
  const activeLanguage = productLanguages.includes(language) ? language : "";
  const activeType = productTypes.includes(type) ? type : "";
  const intro = getCatalogIntro(preorderOnly, selectedGame?.name);
  const filtered = sortProducts(
    getProducts({
      gameSlug: game || undefined,
      languages: activeLanguage ? [activeLanguage] : undefined,
      query: searchParams.get("q") ?? undefined,
      statuses: activeStatus === "all" ? undefined : [activeStatus],
      types: activeType ? [activeType] : undefined,
    }),
    activeSort
  );
  const visibleProducts = filtered.slice(0, visibleCount);

  React.useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setVisibleCount(8);
  }, [searchParams]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }
    setSearchParams(next);
  };

  const setGame = (nextGame: string) => {
    const next = new URLSearchParams(searchParams);
    next.delete("game");
    const queryString = next.toString();
    if (nextGame) {
      navigate(`/shop/${nextGame}${queryString ? `?${queryString}` : ""}`);
    } else {
      navigate(`/shop${queryString ? `?${queryString}` : ""}`);
    }
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({ q: query.trim() || null });
  };

  const controls = (
    <CatalogControls
      game={game}
      language={activeLanguage}
      onGameChange={setGame}
      onLanguageChange={(value) => updateParams({ language: value || null })}
      onStatusChange={(value) =>
        updateParams({ status: value === "all" ? null : value })
      }
      onTypeChange={(value) => updateParams({ type: value || null })}
      preorderOnly={preorderOnly}
      status={activeStatus}
      type={activeType}
    />
  );

  return (
    <main className="offtime-container py-12 sm:py-16" id="content">
      <div className="max-w-3xl">
        <p className="offtime-kicker">{intro.eyebrow}</p>
        <h1 className="offtime-display mt-3 text-5xl text-foreground leading-[0.92] sm:text-7xl">
          {intro.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-8">
          {intro.description}
        </p>
      </div>

      <div className="mt-10">
        <form className="flex w-full max-w-3xl gap-2" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="catalog-search">
            Cerca nel catalogo
          </label>
          <InputGroup className="min-w-0 flex-1">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              id="catalog-search"
              name="q"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cerca carte, box, set…"
              type="search"
              value={query}
            />
          </InputGroup>
          <Button className="shrink-0" size="lg" type="submit">
            Cerca
          </Button>
        </form>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-muted-foreground text-sm">
            {filtered.length === 1
              ? "1 prodotto"
              : `${filtered.length} prodotti`}
          </p>
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex sm:items-center">
            <CatalogSortControl
              onSortChange={(value) =>
                updateParams({ sort: value === "newest" ? null : value })
              }
              sort={activeSort}
            />
            <Sheet>
              <SheetTrigger
                render={<Button className="lg:hidden" variant="outline" />}
              >
                <SlidersHorizontalIcon
                  aria-hidden="true"
                  data-icon="inline-start"
                />
                Filtri
              </SheetTrigger>
              <SheetContent
                className="w-[min(90vw,24rem)] overflow-y-auto overscroll-contain border-border bg-background"
                side="left"
              >
                <SheetHeader>
                  <SheetTitle>Filtra il catalogo</SheetTitle>
                  <SheetDescription>
                    Affina la selezione senza perdere la ricerca.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  {controls}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-xl border border-border bg-surface-1 p-5 lg:sticky lg:top-28 lg:block">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <FilterIcon aria-hidden="true" /> Filtri
          </div>
          <div className="mt-5">{controls}</div>
        </aside>
        <div className="min-w-0">
          {visibleProducts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="offtime-surface bg-surface-1 p-7">
              <h2 className="font-semibold text-xl">
                Nessun prodotto corrisponde ai filtri.
              </h2>
              <p className="mt-2 text-muted-foreground">
                Prova a cancellare la ricerca o ad ampliare la disponibilità.
              </p>
              <Button
                className="mt-5"
                onClick={() => {
                  setQuery("");
                  setSearchParams({});
                }}
                variant="outline"
              >
                Azzera filtri
              </Button>
            </div>
          )}
          {visibleCount < filtered.length ? (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setVisibleCount((count) => count + 8)}
                size="lg"
                variant="outline"
              >
                Carica altri prodotti
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
