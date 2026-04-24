import { D as DietaryTag, j as jsxRuntimeExports, a as ue, b as useParams, c as useNavigate, d as useAuth, r as reactExports, O as OrderStatus, P as PageLoader } from "./index-BOLlBpkj.js";
import { c as createLucideIcon, u as useCart, B as Button, L as Layout, b as Badge } from "./Layout-jHZpHPgU.js";
import { S as Separator } from "./separator-D0rGvpi1.js";
import { S as Skeleton } from "./skeleton-CN_1PsVK.js";
import { T as Textarea } from "./textarea-CoNsSluP.js";
import { E as EmptyState } from "./EmptyState-B1JZtRfX.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { L as Leaf, F as Flame, C as ChefHat, B as Bike } from "./leaf-BS8sbtnx.js";
import { P as Plus } from "./plus-BtlvXxTP.js";
import { M as Minus } from "./minus-DH5Ve5_2.js";
import { S as StarRating } from "./StarRating-BMVZFCs5.js";
import { u as useMyOrders } from "./useOrders-BVXMOP7Z.js";
import { a as useRestaurant, b as useFoodItems, c as useRestaurantReviews, d as useRestaurantRatingStats, e as usePostReview } from "./useRestaurants-D_HCb9c3.js";
import { C as Clock } from "./clock-D13EsfEZ.js";
import { S as Star } from "./star-BPYwLT5u.js";
import { S as ShoppingBag } from "./shopping-bag-D_23qGVA.js";
import { M as MapPin } from "./map-pin-CwKfQ1No.js";
import { P as Phone } from "./phone-BCUe6uDV.js";
import { U as UtensilsCrossed } from "./utensils-crossed-CCNzBHfL.js";
import "./index-C0MjPmF0.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function FoodItemCard({
  item,
  restaurantName,
  index = 0
}) {
  var _a, _b;
  const {
    addItem,
    updateQuantity,
    getItemQuantity,
    isFromDifferentRestaurant,
    cart
  } = useCart();
  const quantity = getItemQuantity(item.id);
  const imageUrl = ((_b = (_a = item.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder-food.jpg";
  const isVeg = item.dietaryTags.includes(DietaryTag.veg) || item.dietaryTags.includes(DietaryTag.vegan);
  const isSpicy = item.dietaryTags.includes(DietaryTag.spicy);
  const handleAdd = () => {
    if (isFromDifferentRestaurant(item.restaurantId)) {
      ue.warning("Clear your cart first", {
        description: `Your cart has items from ${cart.restaurantName}. Clear it to add from a new restaurant.`,
        action: {
          label: "Clear cart",
          onClick: () => {
          }
        }
      });
      return;
    }
    addItem({
      foodItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: imageUrl,
      restaurantId: item.restaurantId,
      restaurantName
    });
    ue.success(`${item.name} added to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-smooth",
      "data-ocid": `food.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            isVeg ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Leaf,
              {
                size: 14,
                className: "text-green-600 shrink-0",
                "aria-label": "Vegetarian"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-sm border-2 border-red-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-600" }) }),
            isSpicy && /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 13, className: "text-orange-500 shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground text-sm truncate", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-2 mt-1 mb-3", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PriceDisplay,
            {
              paisa: item.price,
              className: "font-semibold text-foreground text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-20 rounded-lg overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: item.name,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder-food.jpg";
              }
            }
          ) }),
          !item.isAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Unavailable" }) : quantity === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleAdd,
              "data-ocid": `food.add_button.${index + 1}`,
              className: "w-24 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                "ADD"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-primary rounded-lg overflow-hidden w-24 h-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => updateQuantity(item.id, quantity - 1),
                "data-ocid": `food.remove_button.${index + 1}`,
                className: "flex-1 flex items-center justify-center h-full text-primary-foreground hover:bg-primary/80 transition-colors",
                "aria-label": "Decrease quantity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-sm min-w-[20px] text-center", children: quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => updateQuantity(item.id, quantity + 1),
                "data-ocid": `food.add_more_button.${index + 1}`,
                className: "flex-1 flex items-center justify-center h-full text-primary-foreground hover:bg-primary/80 transition-colors",
                "aria-label": "Increase quantity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const TABS = ["Menu", "Reviews", "Info"];
function RestaurantDetail() {
  var _a, _b;
  const { id } = useParams({ strict: false });
  const restaurantId = BigInt(id ?? "0");
  const navigate = useNavigate();
  const { data: restaurant, isLoading } = useRestaurant(restaurantId);
  const { data: foodItems, isLoading: itemsLoading } = useFoodItems(restaurantId);
  const { data: reviews, isLoading: reviewsLoading } = useRestaurantReviews(restaurantId);
  const { data: ratingStats } = useRestaurantRatingStats(restaurantId);
  const { data: myOrders } = useMyOrders();
  const { mutateAsync: postReview, isPending: submittingReview } = usePostReview();
  const { totalItems, subtotal, cart } = useCart();
  const { isAuthenticated, login } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("Menu");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [reviewRating, setReviewRating] = reactExports.useState(0);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const categoryBarRef = reactExports.useRef(null);
  const categories = [
    "All",
    ...Array.from(new Set((foodItems == null ? void 0 : foodItems.map((f) => f.category)) ?? []))
  ];
  const itemsByCategory = activeCategory === "All" ? categories.slice(1).map((cat) => ({
    category: cat,
    items: (foodItems ?? []).filter((f) => f.category === cat)
  })) : [
    {
      category: activeCategory,
      items: (foodItems ?? []).filter(
        (f) => f.category === activeCategory
      )
    }
  ];
  const deliveredOrderForRestaurant = myOrders == null ? void 0 : myOrders.find(
    (o) => o.restaurantId === restaurantId && o.status === OrderStatus.delivered
  );
  const imageUrl = ((_b = (_a = restaurant == null ? void 0 : restaurant.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder-restaurant.jpg";
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = (reviews == null ? void 0 : reviews.filter((r) => Number(r.rating) === star).length) ?? 0;
    const total = (reviews == null ? void 0 : reviews.length) ?? 0;
    return { star, count, pct: total > 0 ? count / total * 100 : 0 };
  });
  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!deliveredOrderForRestaurant) return;
    if (reviewRating === 0) {
      ue.error("Please select a star rating");
      return;
    }
    if (reviewComment.trim().length < 10) {
      ue.error("Comment must be at least 10 characters");
      return;
    }
    try {
      await postReview({
        restaurantId,
        orderId: deliveredOrderForRestaurant.id,
        rating: BigInt(reviewRating),
        comment: reviewComment.trim()
      });
      ue.success("Review posted!");
      setReviewRating(0);
      setReviewComment("");
    } catch {
      ue.error("Failed to post review. Please try again.");
    }
  };
  const scrollCategoryIntoView = (cat) => {
    setActiveCategory(cat);
    const bar = categoryBarRef.current;
    if (!bar) return;
    const btn = bar.querySelector(`[data-cat="${cat}"]`);
    btn == null ? void 0 : btn.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  };
  reactExports.useEffect(() => {
    if (activeTab === "Menu") setActiveCategory("All");
  }, [activeTab]);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) });
  if (!restaurant)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "🍽️",
        title: "Restaurant not found",
        description: "This restaurant may have been removed."
      }
    ) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { hideFooter: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative h-56 md:h-72 bg-muted overflow-hidden",
        "data-ocid": "restaurant.hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: restaurant.name,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder-restaurant.jpg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 px-4 pb-5 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-white leading-tight mb-1.5 drop-shadow", children: restaurant.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { size: 13 }),
                  restaurant.cuisineType
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13 }),
                  restaurant.deliveryTimeMinutes.toString(),
                  " min"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "fill-yellow-400 text-yellow-400" }),
                  (ratingStats == null ? void 0 : ratingStats.averageRating.toFixed(1)) ?? "—",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/60", children: [
                    "(",
                    (ratingStats == null ? void 0 : ratingStats.reviewCount.toString()) ?? "0",
                    ")"
                  ] })
                ] })
              ] })
            ] }),
            !restaurant.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "shrink-0", children: "Closed" })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto flex flex-wrap gap-x-6 gap-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 14, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Delivery:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: restaurant.deliveryFee }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Min order:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: restaurant.minimumOrder }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: restaurant.address })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto flex", "data-ocid": "restaurant.tabs", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `restaurant.tab.${tab.toLowerCase()}`,
        onClick: () => setActiveTab(tab),
        className: `flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
        children: tab
      },
      tab
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 pt-4 pb-32", children: [
      activeTab === "Menu" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        categories.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: categoryBarRef,
            className: "flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar",
            "data-ocid": "menu.categories",
            children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-cat": cat,
                "data-ocid": `menu.category.${cat.toLowerCase().replace(/[\s/]/g, "_")}`,
                onClick: () => scrollCategoryIntoView(cat),
                className: `shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`,
                children: cat
              },
              cat
            ))
          }
        ),
        itemsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, key)) }) : (foodItems == null ? void 0 : foodItems.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: "🍽️",
            title: "No menu items yet",
            description: "Check back soon for updates."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", "data-ocid": "menu.items.list", children: itemsByCategory.map(
          ({ category, items }) => items.length === 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            activeCategory === "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-4 rounded-full bg-primary inline-block" }),
              category,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal", children: [
                "(",
                items.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FoodItemCard,
              {
                item,
                restaurantName: restaurant.name,
                index: i
              },
              item.id.toString()
            )) })
          ] }, category)
        ) })
      ] }),
      activeTab === "Reviews" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        ratingStats && ((reviews == null ? void 0 : reviews.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl shadow-card p-5 flex flex-col sm:flex-row gap-6",
            "data-ocid": "reviews.summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-1 min-w-[100px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-5xl text-foreground", children: ratingStats.averageRating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StarRating,
                  {
                    value: Math.round(ratingStats.averageRating),
                    size: "md"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  ratingStats.reviewCount.toString(),
                  " reviews"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "hidden sm:block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "sm:hidden" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1.5", children: ratingBreakdown.map(({ star, count, pct }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 text-right text-muted-foreground", children: star }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 10,
                    className: "fill-primary text-primary shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary rounded-full transition-smooth",
                    style: { width: `${pct}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-muted-foreground", children: count })
              ] }, star)) })
            ]
          }
        ),
        isAuthenticated && deliveredOrderForRestaurant && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl shadow-card p-5",
            "data-ocid": "reviews.write_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base mb-4", children: "Share your experience" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: "Your rating" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StarRating,
                  {
                    value: reviewRating,
                    interactive: true,
                    onChange: setReviewRating,
                    size: "lg"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Tell others what you enjoyed (min. 10 characters)…",
                  value: reviewComment,
                  onChange: (e) => setReviewComment(e.target.value),
                  rows: 3,
                  "data-ocid": "reviews.comment_input",
                  className: "mb-3 resize-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleSubmitReview,
                  disabled: submittingReview || reviewRating === 0,
                  "data-ocid": "reviews.submit_button",
                  className: "w-full sm:w-auto",
                  children: submittingReview ? "Posting…" : "Post Review"
                }
              )
            ]
          }
        ),
        reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }, (_, i) => `rskel-${i}`).map(
          (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, key)
        ) }) : ((reviews == null ? void 0 : reviews.length) ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: "⭐",
            title: "No reviews yet",
            description: "Be the first to share your experience after your delivery."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "reviews.list", children: reviews == null ? void 0 : reviews.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl p-4 shadow-card",
            "data-ocid": `reviews.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold text-xs", children: review.customerName.charAt(0).toUpperCase() }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: review.customerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: Number(review.rating), size: "sm" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: new Date(
                  Number(review.createdAt) / 1e6
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed pl-10", children: review.comment })
            ]
          },
          review.id.toString()
        )) })
      ] }),
      activeTab === "Info" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "restaurant.info_panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "text-primary" }),
            "Restaurant Details"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-0.5", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: restaurant.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15, className: "text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-0.5", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `tel:${restaurant.phone}`,
                    className: "text-primary hover:underline",
                    children: restaurant.phone
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                UtensilsCrossed,
                {
                  size: 15,
                  className: "text-primary mt-0.5 shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-0.5", children: "Cuisine" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: restaurant.cuisineType })
              ] })
            ] }),
            restaurant.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-1", children: "About" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: restaurant.description })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary" }),
            "Operating Hours"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Open" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: restaurant.operatingHours.openTime })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Close" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: restaurant.operatingHours.closeTime })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-2", children: "Days open" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => {
                  const isOpen = restaurant.operatingHours.daysOpen.some(
                    (d) => d.toLowerCase().startsWith(day.toLowerCase().slice(0, 3))
                  );
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `px-2.5 py-1 rounded-full text-xs font-medium ${isOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                      children: day
                    },
                    day
                  );
                }
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 16, className: "text-primary" }),
            "Delivery Info"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
            {
              label: "Delivery Time",
              value: `${restaurant.deliveryTimeMinutes.toString()} min`
            },
            {
              label: "Delivery Fee",
              value: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: restaurant.deliveryFee })
            },
            {
              label: "Min. Order",
              value: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: restaurant.minimumOrder })
            },
            {
              label: "Status",
              value: restaurant.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "Open Now" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "Closed" })
            }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: value })
          ] }, label)) })
        ] })
      ] })
    ] }),
    totalItems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-16 md:bottom-0 left-0 right-0 z-40 px-4 pb-3 md:pb-4 pointer-events-none",
        "data-ocid": "cart.floating_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/cart" }),
            "data-ocid": "cart.view_cart_button",
            className: "pointer-events-auto w-full max-w-xl mx-auto flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-5 py-3.5 shadow-hover transition-smooth hover:brightness-110 active:scale-[0.98]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary-foreground/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 15, className: "text-primary-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm leading-tight", children: [
                    totalItems,
                    " item",
                    totalItems !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-xs", children: cart.restaurantName })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: subtotal }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-sm", children: "›" })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  RestaurantDetail as default
};
