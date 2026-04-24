import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Bike,
  ChefHat,
  Clock,
  Info,
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import { FoodItemCard } from "../components/FoodItemCard";
import { Layout } from "../components/Layout";
import { PageLoader } from "../components/LoadingSpinner";
import { PriceDisplay } from "../components/PriceDisplay";
import { StarRating } from "../components/StarRating";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useMyOrders } from "../hooks/useOrders";
import {
  useFoodItems,
  usePostReview,
  useRestaurant,
  useRestaurantRatingStats,
  useRestaurantReviews,
} from "../hooks/useRestaurants";
import { OrderStatus } from "../types";

const TABS = ["Menu", "Reviews", "Info"] as const;
type Tab = (typeof TABS)[number];

export default function RestaurantDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const restaurantId = BigInt(id ?? "0");
  const navigate = useNavigate();

  const { data: restaurant, isLoading } = useRestaurant(restaurantId);
  const { data: foodItems, isLoading: itemsLoading } =
    useFoodItems(restaurantId);
  const { data: reviews, isLoading: reviewsLoading } =
    useRestaurantReviews(restaurantId);
  const { data: ratingStats } = useRestaurantRatingStats(restaurantId);
  const { data: myOrders } = useMyOrders();
  const { mutateAsync: postReview, isPending: submittingReview } =
    usePostReview();
  const { totalItems, subtotal, cart } = useCart();
  const { isAuthenticated, login } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("Menu");
  const [activeCategory, setActiveCategory] = useState("All");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const categoryBarRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    ...Array.from(new Set(foodItems?.map((f) => f.category) ?? [])),
  ];

  // Group items by category for display
  const itemsByCategory =
    activeCategory === "All"
      ? categories.slice(1).map((cat) => ({
          category: cat,
          items: (foodItems ?? []).filter((f) => f.category === cat),
        }))
      : [
          {
            category: activeCategory,
            items: (foodItems ?? []).filter(
              (f) => f.category === activeCategory,
            ),
          },
        ];

  // Check if user has a delivered order from this restaurant
  const deliveredOrderForRestaurant = myOrders?.find(
    (o) =>
      o.restaurantId === restaurantId && o.status === OrderStatus.delivered,
  );

  const imageUrl =
    restaurant?.image?.getDirectURL?.() ??
    "/assets/images/placeholder-restaurant.jpg";

  // Rating breakdown (star counts)
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews?.filter((r) => Number(r.rating) === star).length ?? 0;
    const total = reviews?.length ?? 0;
    return { star, count, pct: total > 0 ? (count / total) * 100 : 0 };
  });

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!deliveredOrderForRestaurant) return;
    if (reviewRating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (reviewComment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }
    try {
      await postReview({
        restaurantId,
        orderId: deliveredOrderForRestaurant.id,
        rating: BigInt(reviewRating),
        comment: reviewComment.trim(),
      });
      toast.success("Review posted!");
      setReviewRating(0);
      setReviewComment("");
    } catch {
      toast.error("Failed to post review. Please try again.");
    }
  };

  const scrollCategoryIntoView = (cat: string) => {
    setActiveCategory(cat);
    const bar = categoryBarRef.current;
    if (!bar) return;
    const btn = bar.querySelector(`[data-cat="${cat}"]`);
    btn?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // When tab changes to Menu, reset category
  useEffect(() => {
    if (activeTab === "Menu") setActiveCategory("All");
  }, [activeTab]);

  if (isLoading)
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );

  if (!restaurant)
    return (
      <Layout>
        <EmptyState
          icon="🍽️"
          title="Restaurant not found"
          description="This restaurant may have been removed."
        />
      </Layout>
    );

  return (
    <Layout hideFooter>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div
        className="relative h-56 md:h-72 bg-muted overflow-hidden"
        data-ocid="restaurant.hero"
      >
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder-restaurant.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Restaurant name + meta overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-8">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight mb-1.5 drop-shadow">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <ChefHat size={13} />
                  {restaurant.cuisineType}
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {restaurant.deliveryTimeMinutes.toString()} min
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  {ratingStats?.averageRating.toFixed(1) ?? "—"}
                  <span className="text-white/60">
                    ({ratingStats?.reviewCount.toString() ?? "0"})
                  </span>
                </span>
              </div>
            </div>
            {!restaurant.isActive && (
              <Badge variant="destructive" className="shrink-0">
                Closed
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* ── Info Strip ──────────────────────────────────────────── */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bike size={14} className="text-primary" />
            <span>
              Delivery:{" "}
              <strong className="text-foreground">
                <PriceDisplay paisa={restaurant.deliveryFee} />
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ShoppingBag size={14} className="text-primary" />
            <span>
              Min order:{" "}
              <strong className="text-foreground">
                <PriceDisplay paisa={restaurant.minimumOrder} />
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>
        </div>
      </div>

      {/* ── Main Tab Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto flex" data-ocid="restaurant.tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`restaurant.tab.${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Page Content ────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-32">
        {/* ══ Menu Tab ════════════════════════════════════════════ */}
        {activeTab === "Menu" && (
          <div>
            {/* Category pill bar */}
            {categories.length > 1 && (
              <div
                ref={categoryBarRef}
                className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar"
                data-ocid="menu.categories"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    data-cat={cat}
                    data-ocid={`menu.category.${cat.toLowerCase().replace(/[\s/]/g, "_")}`}
                    onClick={() => scrollCategoryIntoView(cat)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {itemsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((key) => (
                  <Skeleton key={key} className="h-28 w-full rounded-xl" />
                ))}
              </div>
            ) : foodItems?.length === 0 ? (
              <EmptyState
                icon="🍽️"
                title="No menu items yet"
                description="Check back soon for updates."
              />
            ) : (
              <div className="space-y-6" data-ocid="menu.items.list">
                {itemsByCategory.map(({ category, items }) =>
                  items.length === 0 ? null : (
                    <section key={category}>
                      {activeCategory === "All" && (
                        <h2 className="font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                          {category}
                          <span className="text-xs text-muted-foreground font-normal">
                            ({items.length})
                          </span>
                        </h2>
                      )}
                      <div className="space-y-3">
                        {items.map((item, i) => (
                          <FoodItemCard
                            key={item.id.toString()}
                            item={item}
                            restaurantName={restaurant.name}
                            index={i}
                          />
                        ))}
                      </div>
                    </section>
                  ),
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ Reviews Tab ════════════════════════════════════════ */}
        {activeTab === "Reviews" && (
          <div className="space-y-6">
            {/* Rating summary */}
            {ratingStats && (reviews?.length ?? 0) > 0 && (
              <div
                className="bg-card rounded-2xl shadow-card p-5 flex flex-col sm:flex-row gap-6"
                data-ocid="reviews.summary"
              >
                {/* Big score */}
                <div className="flex flex-col items-center justify-center gap-1 min-w-[100px]">
                  <span className="font-display font-bold text-5xl text-foreground">
                    {ratingStats.averageRating.toFixed(1)}
                  </span>
                  <StarRating
                    value={Math.round(ratingStats.averageRating)}
                    size="md"
                  />
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {ratingStats.reviewCount.toString()} reviews
                  </span>
                </div>

                <Separator orientation="vertical" className="hidden sm:block" />
                <Separator className="sm:hidden" />

                {/* Breakdown bars */}
                <div className="flex-1 space-y-1.5">
                  {ratingBreakdown.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-4 text-right text-muted-foreground">
                        {star}
                      </span>
                      <Star
                        size={10}
                        className="fill-primary text-primary shrink-0"
                      />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-smooth"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-5 text-muted-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Write review form — only if user has a delivered order */}
            {isAuthenticated && deliveredOrderForRestaurant && (
              <div
                className="bg-card rounded-2xl shadow-card p-5"
                data-ocid="reviews.write_form"
              >
                <h3 className="font-display font-semibold text-base mb-4">
                  Share your experience
                </h3>
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Your rating
                  </p>
                  <StarRating
                    value={reviewRating}
                    interactive
                    onChange={setReviewRating}
                    size="lg"
                  />
                </div>
                <Textarea
                  placeholder="Tell others what you enjoyed (min. 10 characters)…"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  data-ocid="reviews.comment_input"
                  className="mb-3 resize-none"
                />
                <Button
                  onClick={handleSubmitReview}
                  disabled={submittingReview || reviewRating === 0}
                  data-ocid="reviews.submit_button"
                  className="w-full sm:w-auto"
                >
                  {submittingReview ? "Posting…" : "Post Review"}
                </Button>
              </div>
            )}

            {/* Reviews list */}
            {reviewsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }, (_, i) => `rskel-${i}`).map(
                  (key) => (
                    <Skeleton key={key} className="h-24 w-full rounded-xl" />
                  ),
                )}
              </div>
            ) : (reviews?.length ?? 0) === 0 ? (
              <EmptyState
                icon="⭐"
                title="No reviews yet"
                description="Be the first to share your experience after your delivery."
              />
            ) : (
              <div className="space-y-3" data-ocid="reviews.list">
                {reviews?.map((review, i) => (
                  <div
                    key={review.id.toString()}
                    className="bg-card rounded-xl p-4 shadow-card"
                    data-ocid={`reviews.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-semibold text-xs">
                            {review.customerName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {review.customerName}
                          </p>
                          <StarRating value={Number(review.rating)} size="sm" />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(
                          Number(review.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-10">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ Info Tab ═══════════════════════════════════════════ */}
        {activeTab === "Info" && (
          <div className="space-y-4" data-ocid="restaurant.info_panel">
            {/* Address & contact */}
            <div className="bg-card rounded-2xl shadow-card p-5 space-y-4">
              <h3 className="font-display font-semibold text-base flex items-center gap-2">
                <Info size={16} className="text-primary" />
                Restaurant Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">
                      Address
                    </p>
                    <p className="text-foreground">{restaurant.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={15} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">
                      Phone
                    </p>
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="text-primary hover:underline"
                    >
                      {restaurant.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UtensilsCrossed
                    size={15}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">
                      Cuisine
                    </p>
                    <p className="text-foreground">{restaurant.cuisineType}</p>
                  </div>
                </div>
                {restaurant.description && (
                  <div className="pt-1">
                    <p className="text-muted-foreground text-xs mb-1">About</p>
                    <p className="text-foreground leading-relaxed">
                      {restaurant.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Operating hours */}
            <div className="bg-card rounded-2xl shadow-card p-5">
              <h3 className="font-display font-semibold text-base flex items-center gap-2 mb-4">
                <Clock size={16} className="text-primary" />
                Operating Hours
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Open</span>
                  <span className="font-medium text-foreground">
                    {restaurant.operatingHours.openTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Close</span>
                  <span className="font-medium text-foreground">
                    {restaurant.operatingHours.closeTime}
                  </span>
                </div>
                <Separator className="my-2" />
                <div>
                  <p className="text-muted-foreground text-xs mb-2">
                    Days open
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => {
                        const isOpen = restaurant.operatingHours.daysOpen.some(
                          (d) =>
                            d
                              .toLowerCase()
                              .startsWith(day.toLowerCase().slice(0, 3)),
                        );
                        return (
                          <span
                            key={day}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              isOpen
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {day}
                          </span>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-card rounded-2xl shadow-card p-5">
              <h3 className="font-display font-semibold text-base flex items-center gap-2 mb-4">
                <Bike size={16} className="text-primary" />
                Delivery Info
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Delivery Time",
                    value: `${restaurant.deliveryTimeMinutes.toString()} min`,
                  },
                  {
                    label: "Delivery Fee",
                    value: <PriceDisplay paisa={restaurant.deliveryFee} />,
                  },
                  {
                    label: "Min. Order",
                    value: <PriceDisplay paisa={restaurant.minimumOrder} />,
                  },
                  {
                    label: "Status",
                    value: restaurant.isActive ? (
                      <span className="text-primary font-semibold">
                        Open Now
                      </span>
                    ) : (
                      <span className="text-destructive font-semibold">
                        Closed
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-muted/40 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Floating Cart Bar ───────────────────────────────────── */}
      {totalItems > 0 && (
        <div
          className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 px-4 pb-3 md:pb-4 pointer-events-none"
          data-ocid="cart.floating_bar"
        >
          <button
            type="button"
            onClick={() => navigate({ to: "/cart" })}
            data-ocid="cart.view_cart_button"
            className="pointer-events-auto w-full max-w-xl mx-auto flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-5 py-3.5 shadow-hover transition-smooth hover:brightness-110 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <ShoppingBag size={15} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm leading-tight">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
                <p className="text-primary-foreground/70 text-xs">
                  {cart.restaurantName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">
                <PriceDisplay paisa={subtotal} />
              </span>
              <span className="text-primary-foreground/70 text-sm">›</span>
            </div>
          </button>
        </div>
      )}
    </Layout>
  );
}
