import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";
import { Layout } from "../../components/Layout";
import { OrderStatusBadge } from "../../components/OrderStatusBadge";
import { PriceDisplay } from "../../components/PriceDisplay";
import { useAllOrders } from "../../hooks/useOrders";
import { useAllUsers } from "../../hooks/useProfile";
import { useRestaurants } from "../../hooks/useRestaurants";
import { OrderStatus } from "../../types";

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  href: string;
  accent: string;
  sub?: string;
}) {
  return (
    <Link
      to={href}
      data-ocid={`admin.stat.${label.toLowerCase().replace(/\s+/g, "_")}.card`}
      className="bg-card rounded-2xl shadow-card p-5 hover:shadow-hover transition-smooth group flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}
        >
          <Icon size={20} />
        </div>
        <ArrowRight
          size={16}
          className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-smooth"
        />
      </div>
      <div>
        <p className="font-display font-bold text-3xl text-foreground">
          {value}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
        {sub && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">{sub}</p>
        )}
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: orders } = useAllOrders();
  const { data: restaurants } = useRestaurants();
  const { data: users } = useAllUsers();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime() * 1_000_000;

  const todayOrders =
    orders?.filter((o) => Number(o.createdAt) >= todayMs) ?? [];
  const todayRevenue = todayOrders.reduce((sum, o) => sum + Number(o.total), 0);

  const weekMs = (Date.now() - 7 * 24 * 60 * 60 * 1000) * 1_000_000;
  const weekRevenue =
    orders
      ?.filter((o) => Number(o.createdAt) >= weekMs)
      .reduce((sum, o) => sum + Number(o.total), 0) ?? 0;

  const activeRestaurants = restaurants?.filter((r) => r.isActive).length ?? 0;

  const stats = [
    {
      label: "Orders Today",
      value: todayOrders.length,
      icon: ShoppingBag,
      href: "/admin/orders",
      accent: "bg-primary/10 text-primary",
      sub: `₹${(todayRevenue / 100).toLocaleString("en-IN")} revenue`,
    },
    {
      label: "Weekly Revenue",
      value: `₹${(weekRevenue / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      href: "/admin/orders",
      accent: "bg-secondary text-secondary-foreground",
    },
    {
      label: "Active Restaurants",
      value: activeRestaurants,
      icon: Utensils,
      href: "/admin/restaurants",
      accent: "bg-accent/20 text-accent-foreground",
      sub: `${restaurants?.length ?? 0} total`,
    },
    {
      label: "Total Users",
      value: users?.filter((u) => !u.isDeleted).length ?? 0,
      icon: Users,
      href: "/admin/users",
      accent: "bg-muted text-muted-foreground",
    },
  ];

  const recentOrders = [...(orders ?? [])]
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 8);

  const quickActions = [
    {
      label: "Add Restaurant",
      href: "/admin/restaurants",
      icon: Utensils,
      desc: "Create a new restaurant listing",
    },
    {
      label: "View All Orders",
      href: "/admin/orders",
      icon: ClipboardList,
      desc: "Monitor and update order statuses",
    },
    {
      label: "Manage Users",
      href: "/admin/users",
      icon: Users,
      desc: "View users and assign roles",
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <LayoutDashboard size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Recent Orders
              </h2>
              <Link
                to="/admin/orders"
                data-ocid="admin.view_all_orders.link"
                className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div
              className="bg-card rounded-2xl shadow-card overflow-hidden"
              data-ocid="admin.recent_orders.list"
            >
              {recentOrders.length === 0 ? (
                <div
                  className="p-10 text-center text-muted-foreground text-sm"
                  data-ocid="admin.recent_orders.empty_state"
                >
                  No orders yet
                </div>
              ) : (
                recentOrders.map((order, i) => (
                  <div
                    key={order.id.toString()}
                    data-ocid={`admin.recent_orders.item.${i + 1}`}
                    className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ShoppingBag size={15} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        #{order.id.toString()} · {order.restaurantName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <OrderStatusBadge status={order.status} />
                      <span className="text-sm font-semibold text-foreground">
                        <PriceDisplay paisa={order.total} />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div>
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    data-ocid={`admin.quickaction.${action.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                    className="flex items-center gap-3 bg-card rounded-xl shadow-card p-4 hover:shadow-hover transition-smooth group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <action.icon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {action.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {action.desc}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Order status breakdown */}
            <div>
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                Order Pipeline
              </h2>
              <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
                {[
                  { status: OrderStatus.pending, label: "Pending" },
                  { status: OrderStatus.preparing, label: "Preparing" },
                  {
                    status: OrderStatus.out_for_delivery,
                    label: "Out for Delivery",
                  },
                  { status: OrderStatus.delivered, label: "Delivered" },
                  { status: OrderStatus.cancelled, label: "Cancelled" },
                ].map(({ status, label }) => {
                  const count =
                    orders?.filter((o) => o.status === status).length ?? 0;
                  const total = orders?.length ?? 1;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {label}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-xs h-5 px-2"
                          >
                            {count}
                          </Badge>
                          <span className="text-xs text-muted-foreground w-8 text-right">
                            {pct}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/70 rounded-full transition-smooth"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
