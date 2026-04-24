import { j as jsxRuntimeExports, L as Link, O as OrderStatus } from "./index-BOLlBpkj.js";
import { U as Utensils, L as Layout, g as LayoutDashboard, C as ClipboardList, b as Badge } from "./Layout-jHZpHPgU.js";
import { O as OrderStatusBadge } from "./OrderStatusBadge-BRfycT3h.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { e as useAllOrders } from "./useOrders-BVXMOP7Z.js";
import { b as useAllUsers } from "./useProfile-AHZ80ytO.js";
import { u as useRestaurants } from "./useRestaurants-D_HCb9c3.js";
import { S as ShoppingBag } from "./shopping-bag-D_23qGVA.js";
import { T as TrendingUp } from "./trending-up-yWH8ah2L.js";
import { U as Users } from "./users-D7LoLWuz.js";
import { A as ArrowRight } from "./arrow-right-CwwHqNyW.js";
import "./useMutation-I4pzC6GI.js";
function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: href,
      "data-ocid": `admin.stat.${label.toLowerCase().replace(/\s+/g, "_")}.card`,
      className: "bg-card rounded-2xl shadow-card p-5 hover:shadow-hover transition-smooth group flex flex-col gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl flex items-center justify-center ${accent}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArrowRight,
            {
              size: 16,
              className: "text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-smooth"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: label }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5", children: sub })
        ] })
      ]
    }
  );
}
function AdminDashboard() {
  const { data: orders } = useAllOrders();
  const { data: restaurants } = useRestaurants();
  const { data: users } = useAllUsers();
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime() * 1e6;
  const todayOrders = (orders == null ? void 0 : orders.filter((o) => Number(o.createdAt) >= todayMs)) ?? [];
  const todayRevenue = todayOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const weekMs = (Date.now() - 7 * 24 * 60 * 60 * 1e3) * 1e6;
  const weekRevenue = (orders == null ? void 0 : orders.filter((o) => Number(o.createdAt) >= weekMs).reduce((sum, o) => sum + Number(o.total), 0)) ?? 0;
  const activeRestaurants = (restaurants == null ? void 0 : restaurants.filter((r) => r.isActive).length) ?? 0;
  const stats = [
    {
      label: "Orders Today",
      value: todayOrders.length,
      icon: ShoppingBag,
      href: "/admin/orders",
      accent: "bg-primary/10 text-primary",
      sub: `₹${(todayRevenue / 100).toLocaleString("en-IN")} revenue`
    },
    {
      label: "Weekly Revenue",
      value: `₹${(weekRevenue / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      href: "/admin/orders",
      accent: "bg-secondary text-secondary-foreground"
    },
    {
      label: "Active Restaurants",
      value: activeRestaurants,
      icon: Utensils,
      href: "/admin/restaurants",
      accent: "bg-accent/20 text-accent-foreground",
      sub: `${(restaurants == null ? void 0 : restaurants.length) ?? 0} total`
    },
    {
      label: "Total Users",
      value: (users == null ? void 0 : users.filter((u) => !u.isDeleted).length) ?? 0,
      icon: Users,
      href: "/admin/users",
      accent: "bg-muted text-muted-foreground"
    }
  ];
  const recentOrders = [...orders ?? []].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 8);
  const quickActions = [
    {
      label: "Add Restaurant",
      href: "/admin/restaurants",
      icon: Utensils,
      desc: "Create a new restaurant listing"
    },
    {
      label: "View All Orders",
      href: "/admin/orders",
      icon: ClipboardList,
      desc: "Monitor and update order statuses"
    },
    {
      label: "Manage Users",
      href: "/admin/users",
      icon: Users,
      desc: "View users and assign roles"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 20, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Recent Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin/orders",
              "data-ocid": "admin.view_all_orders.link",
              className: "text-xs text-primary hover:underline font-medium flex items-center gap-1",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card rounded-2xl shadow-card overflow-hidden",
            "data-ocid": "admin.recent_orders.list",
            children: recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-10 text-center text-muted-foreground text-sm",
                "data-ocid": "admin.recent_orders.empty_state",
                children: "No orders yet"
              }
            ) : recentOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `admin.recent_orders.item.${i + 1}`,
                className: "flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 15, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                      "#",
                      order.id.toString(),
                      " · ",
                      order.restaurantName
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                      Number(order.createdAt) / 1e6
                    ).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit"
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: order.total }) })
                  ] })
                ]
              },
              order.id.toString()
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-4", children: "Quick Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: quickActions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: action.href,
              "data-ocid": `admin.quickaction.${action.label.toLowerCase().replace(/\s+/g, "_")}.link`,
              className: "flex items-center gap-3 bg-card rounded-xl shadow-card p-4 hover:shadow-hover transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { size: 16, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: action.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: action.desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ArrowRight,
                  {
                    size: 14,
                    className: "text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                  }
                )
              ]
            },
            action.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-4", children: "Order Pipeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-card p-4 space-y-3", children: [
            { status: OrderStatus.pending, label: "Pending" },
            { status: OrderStatus.preparing, label: "Preparing" },
            {
              status: OrderStatus.out_for_delivery,
              label: "Out for Delivery"
            },
            { status: OrderStatus.delivered, label: "Delivered" },
            { status: OrderStatus.cancelled, label: "Cancelled" }
          ].map(({ status, label }) => {
            const count = (orders == null ? void 0 : orders.filter((o) => o.status === status).length) ?? 0;
            const total = (orders == null ? void 0 : orders.length) ?? 1;
            const pct = total > 0 ? Math.round(count / total * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs h-5 px-2",
                      children: count
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-8 text-right", children: [
                    pct,
                    "%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary/70 rounded-full transition-smooth",
                  style: { width: `${pct}%` }
                }
              ) })
            ] }, status);
          }) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
