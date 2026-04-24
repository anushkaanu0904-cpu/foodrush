import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@tanstack/react-router";
import {
  ChevronRight,
  Flame,
  Leaf,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Utensils,
  Wheat,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { Layout } from "../components/Layout";
import { CardSkeleton } from "../components/LoadingSpinner";
import { RestaurantCard } from "../components/RestaurantCard";
import { useRestaurants } from "../hooks/useRestaurants";
import type { SearchFilters } from "../types";
import { DietaryTag, SortOption } from "../types";

// ── Category config ────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "All", emoji: "🍽️", cuisine: "All" },
  { label: "Biryani", emoji: "🍛", cuisine: "Biryani" },
  { label: "Pizza", emoji: "🍕", cuisine: "Italian" },
  { label: "Burgers", emoji: "🍔", cuisine: "Fast Food" },
  { label: "Chinese", emoji: "🥡", cuisine: "Chinese" },
  { label: "Sushi", emoji: "🍱", cuisine: "Japanese" },
  { label: "South Indian", emoji: "🥘", cuisine: "South Indian" },
  { label: "Desserts", emoji: "🍰", cuisine: "Desserts" },
  { label: "North Indian", emoji: "🍲", cuisine: "North Indian" },
  { label: "Healthy", emoji: "🥗", cuisine: "Salads" },
];

const SORT_OPTIONS: {
  label: string;
  value: SortOption | "";
  icon: React.ReactNode;
}[] = [
  { label: "Relevance", value: "", icon: <Sparkles size={12} /> },
  { label: "Best Rating", value: SortOption.rating, icon: <Star size={12} /> },
  { label: "Fastest", value: SortOption.deliveryTime, icon: <Zap size={12} /> },
  {
    label: "Price ↑",
    value: SortOption.priceAsc,
    icon: <TrendingUp size={12} />,
  },
  {
    label: "Price ↓",
    value: SortOption.priceDesc,
    icon: <TrendingUp size={12} className="rotate-180" />,
  },
];

const DIETARY_OPTIONS: {
  label: string;
  value: DietaryTag;
  icon: React.ReactNode;
}[] = [
  { label: "Veg", value: DietaryTag.veg, icon: <Leaf size={12} /> },
  { label: "Vegan", value: DietaryTag.vegan, icon: <Wheat size={12} /> },
  { label: "Spicy", value: DietaryTag.spicy, icon: <Flame size={12} /> },
];

const RATING_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
];

// ── Hero taglines cycle ────────────────────────────────────────────────────
const HERO_LINES = [
  "Hungry? We've got you covered.",
  "Great food, delivered fast.",
  "Your next meal is a tap away.",
  "Explore flavors, skip the kitchen.",
];

export default function Home() {
  const searchParams = useSearch({ strict: false }) as {
    q?: string;
    cuisine?: string;
    sort?: string;
    minRating?: string;
    dietary?: string;
  };

  const [query, setQuery] = useState(searchParams.q ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedCuisine, setSelectedCuisine] = useState(
    searchParams.cuisine ?? "All",
  );
  const [sortBy, setSortBy] = useState<SortOption | "">(
    (searchParams.sort as SortOption) ?? "",
  );
  const [minRating, setMinRating] = useState(
    searchParams.minRating ? Number(searchParams.minRating) : 0,
  );
  const [dietaryTags, setDietaryTags] = useState<DietaryTag[]>(
    searchParams.dietary
      ? (searchParams.dietary.split(",") as DietaryTag[])
      : [],
  );
  const [heroLine, setHeroLine] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync filters to URL (for bookmarking/sharing)
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (selectedCuisine !== "All") params.set("cuisine", selectedCuisine);
    if (sortBy) params.set("sort", sortBy);
    if (minRating > 0) params.set("minRating", String(minRating));
    if (dietaryTags.length > 0) params.set("dietary", dietaryTags.join(","));
    const qs = params.toString();
    const newUrl = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [debouncedQuery, selectedCuisine, sortBy, minRating, dietaryTags]);

  // Cycle hero taglines
  useEffect(() => {
    const t = setInterval(
      () => setHeroLine((p) => (p + 1) % HERO_LINES.length),
      3500,
    );
    return () => clearInterval(t);
  }, []);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  // intentionally empty — initial values are seeded from URL above

  const hasFilters =
    debouncedQuery ||
    selectedCuisine !== "All" ||
    sortBy ||
    minRating > 0 ||
    dietaryTags.length > 0;

  const filters: SearchFilters | null = hasFilters
    ? {
        searchQuery: debouncedQuery || undefined,
        cuisineType: selectedCuisine !== "All" ? selectedCuisine : undefined,
        sortBy: sortBy || undefined,
        minRating: minRating > 0 ? minRating : undefined,
        dietaryTags,
      }
    : null;

  const { data: restaurants, isLoading } = useRestaurants(filters);

  const clearAll = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setSelectedCuisine("All");
    setSortBy("");
    setMinRating(0);
    setDietaryTags([]);
  }, []);

  const toggleDietaryTag = (tag: DietaryTag) => {
    setDietaryTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.cuisine === selectedCuisine)?.label ?? "All";

  const activeFilterCount =
    (selectedCuisine !== "All" ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    dietaryTags.length +
    (sortBy ? 1 : 0);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        {/* decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-primary/8 blur-2xl"
        />

        <div className="relative max-w-3xl mx-auto px-4 py-12 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-primary/20">
              <Flame size={12} />
              <span>100+ restaurants near you</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3 leading-tight">
              Order food &amp; groceries
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroLine}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-primary"
                >
                  {HERO_LINES[heroLine]}
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              Discover top restaurants, lightning-fast delivery, and exclusive
              deals — all in one place.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search for restaurants, cuisines or dishes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-ocid="home.search_input"
              className="pl-11 pr-12 h-13 py-3.5 text-sm bg-card shadow-card border-border rounded-xl focus-visible:ring-primary focus-visible:ring-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </motion.div>

          {/* Quick CTA pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {["Biryani", "Pizza", "Burgers", "Sushi"].map((tag) => {
              const cat = CATEGORIES.find((c) => c.label === tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedCuisine(cat?.cuisine ?? tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors shadow-card"
                  data-ocid={`home.hero_shortcut.${tag.toLowerCase()}`}
                >
                  <span>{cat?.emoji}</span>
                  {tag}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Category chips ─────────────────────────────────────────── */}
      <section className="bg-card border-b border-border sticky top-[57px] z-30 shadow-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCuisine === cat.cuisine;
              return (
                <button
                  key={cat.cuisine}
                  type="button"
                  onClick={() => setSelectedCuisine(cat.cuisine)}
                  data-ocid={`home.cuisine_filter.${cat.label.toLowerCase().replace(/\s/g, "_")}`}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-smooth whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <span className="text-sm leading-none">{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Sort + Filter row */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Sort chips (desktop) */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">
              Sort:
            </span>
            {SORT_OPTIONS.map(({ label, value, icon }) => (
              <button
                key={value || "default"}
                type="button"
                onClick={() => setSortBy(value)}
                data-ocid={`home.sort.${label.toLowerCase().replace(/\W/g, "_")}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth ${
                  sortBy === value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary hover:bg-primary/5"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Filter button + active filters summary */}
          <div className="flex items-center gap-2 ml-auto">
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                data-ocid="home.clear_filters_button"
                className="text-xs text-muted-foreground hover:text-primary gap-1"
              >
                <X size={12} />
                Clear all
              </Button>
            )}
            {/* Mobile-only filter sheet trigger */}
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="home.filter_open_modal_button"
                  className="gap-1.5 relative border-border"
                >
                  <SlidersHorizontal size={14} />
                  <span className="text-xs">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0"
                data-ocid="home.filter.sheet"
              >
                <SheetHeader className="px-5 py-4 border-b border-border">
                  <SheetTitle className="font-display text-base">
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="px-5 py-4 space-y-6 overflow-y-auto h-full pb-24">
                  {/* Sort (mobile) */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Sort by
                    </p>
                    <div className="flex flex-col gap-2">
                      {SORT_OPTIONS.map(({ label, value, icon }) => (
                        <button
                          key={value || "default"}
                          type="button"
                          onClick={() => setSortBy(value)}
                          data-ocid={`home.sort_mobile.${label.toLowerCase().replace(/\W/g, "_")}`}
                          className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium border transition-smooth text-left ${
                            sortBy === value
                              ? "bg-primary/10 text-primary border-primary/40"
                              : "bg-background border-border hover:border-primary/40"
                          }`}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Min Rating */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Minimum Rating
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {RATING_OPTIONS.map(({ label, value }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setMinRating(value)}
                          data-ocid={`home.rating_filter.${value}`}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth ${
                            minRating === value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border hover:border-primary"
                          }`}
                        >
                          {value > 0 && (
                            <Star size={11} className="fill-current" />
                          )}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Dietary tags */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Dietary Preferences
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {DIETARY_OPTIONS.map(({ label, value, icon }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleDietaryTag(value)}
                          data-ocid={`home.dietary_filter.${label.toLowerCase()}`}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth ${
                            dietaryTags.includes(value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border hover:border-primary"
                          }`}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply / Clear footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-5 py-4 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearAll}
                    data-ocid="home.filter.cancel_button"
                  >
                    Clear
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    onClick={() => setFilterOpen(false)}
                    data-ocid="home.filter.confirm_button"
                  >
                    Apply
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active filter chips */}
        {(minRating > 0 || dietaryTags.length > 0 || (sortBy && false)) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {minRating > 0 && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:bg-destructive/10"
                onClick={() => setMinRating(0)}
                data-ocid="home.active_filter.rating"
              >
                <Star size={10} className="fill-current" />
                {minRating}+ stars
                <X size={10} className="ml-0.5" />
              </Badge>
            )}
            {dietaryTags.map((tag) => {
              const opt = DIETARY_OPTIONS.find((o) => o.value === tag);
              return (
                <Badge
                  key={tag.toString()}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-destructive/10"
                  onClick={() => toggleDietaryTag(tag)}
                  data-ocid={`home.active_filter.${opt?.label.toLowerCase()}`}
                >
                  {opt?.icon}
                  {opt?.label}
                  <X size={10} className="ml-0.5" />
                </Badge>
              );
            })}
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <p className="text-sm text-muted-foreground">
              {restaurants && restaurants.length > 0 ? (
                <>
                  <span className="font-semibold text-foreground">
                    {restaurants.length}
                  </span>{" "}
                  restaurant{restaurants.length !== 1 ? "s" : ""} found
                  {selectedCuisine !== "All" && (
                    <>
                      {" "}
                      for{" "}
                      <span className="text-primary font-medium">
                        {activeCategoryLabel}
                      </span>
                    </>
                  )}
                </>
              ) : !isLoading ? (
                "No restaurants found"
              ) : null}
            </p>
          )}
          {/* Active cuisine indicator */}
          {selectedCuisine !== "All" && (
            <button
              type="button"
              onClick={() => setSelectedCuisine("All")}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
              data-ocid="home.active_cuisine_clear"
            >
              {activeCategoryLabel} <X size={11} />
            </button>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => i).map((i) => (
              <CardSkeleton key={`skel-${i}`} />
            ))}
          </div>
        ) : restaurants && restaurants.length > 0 ? (
          <motion.div
            data-ocid="home.restaurants.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {restaurants.map((r, i) => (
              <motion.div
                key={r.id.toString()}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <RestaurantCard restaurant={r} index={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState
              icon={<Utensils />}
              title="No restaurants found"
              description={
                hasFilters
                  ? "Try adjusting your filters or search term."
                  : "We're adding more restaurants soon!"
              }
              action={
                hasFilters
                  ? {
                      label: "Clear all filters",
                      onClick: clearAll,
                    }
                  : undefined
              }
            />
          </motion.div>
        )}

        {/* Explore more nudge */}
        {!isLoading && restaurants && restaurants.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground mb-3">
              Want to discover more cuisines?
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearAll();
                searchRef.current?.focus();
              }}
              data-ocid="home.explore_more_button"
              className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
            >
              <Timer size={14} />
              Browse all restaurants
              <ChevronRight size={14} />
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
