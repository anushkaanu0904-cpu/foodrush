import { r as reactExports, c as useNavigate, j as jsxRuntimeExports, P as PageLoader, O as OrderStatus, f as useCartContext, a as ue, g as PaymentStatus } from "./index-BOLlBpkj.js";
import { E as EmptyState } from "./EmptyState-B1JZtRfX.js";
import { c as createLucideIcon, L as Layout, C as ClipboardList, d as ChevronDown } from "./Layout-jHZpHPgU.js";
import { O as OrderStatusBadge } from "./OrderStatusBadge-BRfycT3h.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { u as useMyOrders } from "./useOrders-BVXMOP7Z.js";
import { m as motion } from "./proxy-D4LMamSe.js";
import { A as AnimatePresence } from "./index-xsOSNvCR.js";
import { C as ChevronUp } from "./chevron-up-BSn5nQWy.js";
import { M as MapPin } from "./map-pin-CwKfQ1No.js";
import { C as Clock } from "./clock-D13EsfEZ.js";
import { U as UtensilsCrossed } from "./utensils-crossed-CCNzBHfL.js";
import { S as ShoppingBag } from "./shopping-bag-D_23qGVA.js";
import { C as CreditCard } from "./credit-card-BoLv2ONJ.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const FILTER_TABS = [
  { label: "All Orders", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" }
];
const ACTIVE_STATUSES = /* @__PURE__ */ new Set([
  OrderStatus.pending,
  OrderStatus.preparing,
  OrderStatus.out_for_delivery
]);
const TIMELINE_STEPS = [
  { status: OrderStatus.pending, label: "Order Placed", icon: Package },
  { status: OrderStatus.preparing, label: "Preparing", icon: UtensilsCrossed },
  { status: OrderStatus.out_for_delivery, label: "On the Way", icon: Truck },
  { status: OrderStatus.delivered, label: "Delivered", icon: ShoppingBag }
];
const STATUS_ORDER = {
  [OrderStatus.pending]: 0,
  [OrderStatus.preparing]: 1,
  [OrderStatus.out_for_delivery]: 2,
  [OrderStatus.delivered]: 3,
  [OrderStatus.cancelled]: -1
};
function OrderTimeline({ status }) {
  if (status === OrderStatus.cancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-destructive/60 inline-block" }),
      "Order was cancelled"
    ] });
  }
  const currentIdx = STATUS_ORDER[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 w-full", "data-ocid": "order.timeline", children: TIMELINE_STEPS.map((step, idx) => {
    const Icon = step.icon;
    const done = idx <= currentIdx;
    const active = idx === currentIdx;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-7 h-7 rounded-full flex items-center justify-center transition-smooth ${done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} ${active ? "ring-2 ring-primary/30 ring-offset-1" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[10px] mt-1 text-center leading-tight font-medium ${done ? "text-primary" : "text-muted-foreground"}`,
            children: step.label
          }
        )
      ] }),
      idx < TIMELINE_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-0.5 flex-1 mx-1 mb-4 rounded-full transition-smooth ${idx < currentIdx ? "bg-primary" : "bg-border"}`
        }
      )
    ] }, step.status);
  }) });
}
function PaymentBadge({ status }) {
  const config = {
    [PaymentStatus.paid]: {
      label: "Paid",
      className: "text-primary bg-primary/10 border-primary/25"
    },
    [PaymentStatus.pending]: {
      label: "Payment Pending",
      className: "text-foreground bg-muted border-border"
    },
    [PaymentStatus.failed]: {
      label: "Payment Failed",
      className: "text-destructive bg-destructive/10 border-destructive/25"
    },
    [PaymentStatus.refunded]: {
      label: "Refunded",
      className: "text-muted-foreground bg-secondary border-border"
    }
  };
  const c = config[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${c.className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 10 }),
        c.label
      ]
    }
  );
}
function OrderItemsList({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: "flex items-center justify-between text-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0", children: item.quantity.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: item.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceDisplay,
          {
            paisa: item.price * item.quantity,
            className: "text-muted-foreground shrink-0 ml-2"
          }
        )
      ]
    },
    item.foodItemId.toString()
  )) });
}
function OrderCard({
  order,
  index,
  isExpanded,
  onToggle
}) {
  const { addItem, cart } = useCartContext();
  const isActive = ACTIVE_STATUSES.has(order.status);
  const handleReorder = reactExports.useCallback(() => {
    if (cart.restaurantId !== null && cart.restaurantId !== order.restaurantId) {
      ue.error(
        "Clear your current cart before reordering from a different restaurant."
      );
      return;
    }
    for (const item of order.items) {
      addItem({
        foodItemId: item.foodItemId,
        name: item.name,
        price: item.price,
        quantity: Number(item.quantity),
        image: "",
        restaurantId: order.restaurantId,
        restaurantName: order.restaurantName
      });
    }
    ue.success("Items added to cart!", {
      description: `${order.items.length} item(s) from ${order.restaurantName}`
    });
  }, [order, addItem, cart.restaurantId]);
  const formattedDate = new Date(
    Number(order.createdAt) / 1e6
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const formattedTime = new Date(
    Number(order.createdAt) / 1e6
  ).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.22, delay: index * 0.05 },
      "data-ocid": `orders.item.${index + 1}`,
      className: "bg-card rounded-2xl overflow-hidden border border-border shadow-card",
      children: [
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onToggle,
            "data-ocid": `orders.expand_button.${index + 1}`,
            className: "w-full text-left px-4 pt-4 pb-3 hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            "aria-expanded": isExpanded,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base leading-tight truncate", children: order.restaurantName }),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] text-primary font-medium", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" }),
                    "Live"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Order #",
                  order.id.toString(),
                  " · ",
                  formattedDate,
                  " at ",
                  formattedTime
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PriceDisplay,
                    {
                      paisa: order.total,
                      className: "font-bold text-foreground text-sm"
                    }
                  ),
                  isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 14, className: "text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "text-muted-foreground" })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.22 },
            className: "overflow-hidden",
            "data-ocid": `orders.detail.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-border/60 pt-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OrderTimeline, { status: order.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Items" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(OrderItemsList, { items: order.items })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 space-y-1.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.subtotal })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.deliveryFee })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.taxes })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground pt-1 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.total, className: "text-primary" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MapPin,
                    {
                      size: 14,
                      className: "mt-0.5 shrink-0 text-primary/70"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: order.deliveryAddress })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14, className: "shrink-0 text-primary/70" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    formattedDate,
                    " · ",
                    formattedTime
                  ] })
                ] }),
                order.specialInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 italic", children: [
                  '"',
                  order.specialInstructions,
                  '"'
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentBadge, { status: order.paymentStatus }),
                order.status !== OrderStatus.cancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleReorder,
                    "data-ocid": `orders.reorder_button.${index + 1}`,
                    className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 11 }),
                      "Reorder"
                    ]
                  }
                )
              ] })
            ] })
          }
        ) })
      ]
    }
  );
}
function filterOrders(orders, tab) {
  switch (tab) {
    case "active":
      return orders.filter((o) => ACTIVE_STATUSES.has(o.status));
    case "completed":
      return orders.filter((o) => o.status === OrderStatus.delivered);
    case "cancelled":
      return orders.filter((o) => o.status === OrderStatus.cancelled);
    default:
      return orders;
  }
}
function Orders() {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const { data: allOrders, isLoading } = useMyOrders(null);
  const navigate = useNavigate();
  const filtered = allOrders ? filterOrders(allOrders, activeTab) : [];
  const activeCount = allOrders ? allOrders.filter((o) => ACTIVE_STATUSES.has(o.status)).length : 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        (allOrders == null ? void 0 : allOrders.length) ?? 0,
        " order",
        ((allOrders == null ? void 0 : allOrders.length) ?? 0) !== 1 ? "s" : "",
        " placed"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none",
        "data-ocid": "orders.filter.tabs",
        children: FILTER_TABS.map(({ label, value }) => {
          const isSelected = activeTab === value;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(value),
              "data-ocid": `orders.filter.${value}`,
              className: `shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${isSelected ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:border-primary/60 hover:text-primary"}`,
              children: [
                label,
                value === "active" && activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"}`,
                    children: activeCount
                  }
                )
              ]
            },
            value
          );
        })
      }
    ),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 56 }),
        title: activeTab === "all" ? "No orders yet" : activeTab === "active" ? "No active orders" : activeTab === "completed" ? "No completed orders" : "No cancelled orders",
        description: activeTab === "all" ? "Place your first order and it will show up here." : activeTab === "active" ? "Your current orders will appear here once placed." : "Switch to 'All' to see your full order history.",
        action: activeTab === "all" ? {
          label: "Browse restaurants",
          onClick: () => navigate({ to: "/" })
        } : void 0,
        "data-ocid": "orders.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "space-y-3", "data-ocid": "orders.list", layout: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((order, i) => {
      const id = order.id.toString();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        OrderCard,
        {
          order,
          index: i,
          isExpanded: expandedId === id,
          onToggle: () => setExpandedId((prev) => prev === id ? null : id)
        },
        id
      );
    }) }) })
  ] }) });
}
export {
  Orders as default
};
