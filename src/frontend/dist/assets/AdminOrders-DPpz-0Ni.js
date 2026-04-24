import { r as reactExports, j as jsxRuntimeExports, P as PageLoader, L as Link, a as ue, O as OrderStatus } from "./index-BOLlBpkj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-lJpWrGte.js";
import { c as createLucideIcon, L as Layout, d as ChevronDown } from "./Layout-jHZpHPgU.js";
import { O as OrderStatusBadge } from "./OrderStatusBadge-BRfycT3h.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { e as useAllOrders, f as useUpdateOrderStatus } from "./useOrders-BVXMOP7Z.js";
import { C as ChevronUp } from "./chevron-up-BSn5nQWy.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const ALL_STATUSES = Object.values(OrderStatus);
const STATUS_LABELS = {
  [OrderStatus.pending]: "Pending",
  [OrderStatus.preparing]: "Preparing",
  [OrderStatus.out_for_delivery]: "Out for Delivery",
  [OrderStatus.delivered]: "Delivered",
  [OrderStatus.cancelled]: "Cancelled"
};
function ExpandedOrder({ order }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-0 bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: "Order Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              item.name,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "×",
                item.quantity.toString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: item.price * item.quantity }) })
          ]
        },
        item.foodItemId.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.subtotal })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.deliveryFee })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.taxes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-bold text-foreground pt-1 border-t border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.total })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: "Delivery Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Address: " }),
          order.deliveryAddress || "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Phone: " }),
          order.phone || "—"
        ] }),
        order.specialInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Note: " }),
          order.specialInstructions
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Payment: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: order.paymentStatus })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Customer: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] break-all", children: [
            order.customerId.toString().slice(0, 20),
            "…"
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function AdminOrders() {
  const [statusFilter, setStatusFilter] = reactExports.useState(null);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const { data: orders, isLoading } = useAllOrders(null, statusFilter);
  const updateMutation = useUpdateOrderStatus();
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateMutation.mutateAsync({ orderId, status });
      ue.success("Order status updated");
    } catch {
      ue.error("Failed to update status");
    }
  };
  const toggleExpand = (id) => setExpandedId((prev) => prev === id ? null : id);
  const handleExportCSV = () => {
    if (!orders || orders.length === 0) {
      ue.info("No orders to export");
      return;
    }
    const header = "ID,Restaurant,Customer,Total,Status,Date";
    const rows = orders.map(
      (o) => [
        o.id.toString(),
        `"${o.restaurantName}"`,
        o.customerId.toString().slice(0, 16),
        (Number(o.total) / 100).toFixed(2),
        o.status,
        new Date(Number(o.createdAt) / 1e6).toLocaleString()
      ].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("CSV exported");
  };
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/admin",
            className: "text-xs text-muted-foreground hover:text-primary mb-1 inline-flex items-center gap-1",
            children: "← Dashboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Orders" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleExportCSV,
          "data-ocid": "admin_orders.export_csv.button",
          className: "flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
            "Export CSV"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6", children: [
      { status: null, label: "All", count: (orders == null ? void 0 : orders.length) ?? 0 },
      ...ALL_STATUSES.map((s) => ({
        status: s,
        label: STATUS_LABELS[s],
        count: (orders == null ? void 0 : orders.filter((o) => o.status === s).length) ?? 0
      }))
    ].map(({ status, label, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setStatusFilter(status),
        "data-ocid": `admin_orders.filter.${(status ?? "all").replace(/_/g, "-")}`,
        className: `rounded-xl p-3 text-center transition-smooth border ${statusFilter === status ? "bg-primary text-primary-foreground border-primary shadow-card" : "bg-card text-foreground border-border hover:border-primary/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg font-display", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-tight opacity-80", children: label })
        ]
      },
      label
    )) }),
    statusFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Showing: ",
        STATUS_LABELS[statusFilter]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setStatusFilter(null),
          className: "text-primary hover:underline text-xs ml-1",
          "data-ocid": "admin_orders.clear_filter.button",
          children: "Clear"
        }
      )
    ] }),
    !orders || orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card rounded-2xl shadow-card p-12 text-center",
        "data-ocid": "admin_orders.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No orders found." })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "admin_orders.list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_auto] gap-4 px-4 py-2.5 bg-muted/50 rounded-xl text-xs font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Order / Restaurant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
      ] }),
      orders.map((order, i) => {
        const isExpanded = expandedId === order.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `admin_orders.item.${i + 1}`,
            className: "bg-card rounded-2xl shadow-card overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_auto] gap-3 md:gap-4 px-4 py-4 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
                    "#",
                    order.id.toString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: order.restaurantName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: new Date(
                    Number(order.createdAt) / 1e6
                  ).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground truncate", children: [
                  order.customerId.toString().slice(0, 18),
                  "…"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
                  order.items.length,
                  " item",
                  order.items.length !== 1 ? "s" : ""
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.total }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: order.status,
                    onValueChange: (v) => handleStatusChange(order.id, v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-8 text-xs w-full",
                          "data-ocid": `admin_orders.status_select.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status }) })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: s }) }) }, s)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleExpand(order.id),
                    "data-ocid": `admin_orders.expand_button.${i + 1}`,
                    className: "flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors text-muted-foreground",
                    "aria-label": isExpanded ? "Collapse order" : "Expand order",
                    children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 })
                  }
                )
              ] }),
              isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandedOrder, { order })
            ]
          },
          order.id.toString()
        );
      })
    ] })
  ] }) });
}
export {
  AdminOrders as default
};
