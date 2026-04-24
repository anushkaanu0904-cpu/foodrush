import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import { Layout } from "../components/Layout";
import { PageLoader } from "../components/LoadingSpinner";
import { OrderStatusBadge } from "../components/OrderStatusBadge";
import { PriceDisplay } from "../components/PriceDisplay";
import { useCartContext } from "../context/CartContext";
import { useMyOrders } from "../hooks/useOrders";
import type { Order, OrderItem } from "../types";
import { OrderStatus, PaymentStatus } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "active" | "completed" | "cancelled";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All Orders", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const ACTIVE_STATUSES = new Set([
  OrderStatus.pending,
  OrderStatus.preparing,
  OrderStatus.out_for_delivery,
]);

// ─── Order Timeline ───────────────────────────────────────────────────────────

const TIMELINE_STEPS: {
  status: OrderStatus;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { status: OrderStatus.pending, label: "Order Placed", icon: Package },
  { status: OrderStatus.preparing, label: "Preparing", icon: UtensilsCrossed },
  { status: OrderStatus.out_for_delivery, label: "On the Way", icon: Truck },
  { status: OrderStatus.delivered, label: "Delivered", icon: ShoppingBag },
];

const STATUS_ORDER: Record<OrderStatus, number> = {
  [OrderStatus.pending]: 0,
  [OrderStatus.preparing]: 1,
  [OrderStatus.out_for_delivery]: 2,
  [OrderStatus.delivered]: 3,
  [OrderStatus.cancelled]: -1,
};

function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === OrderStatus.cancelled) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-2 h-2 rounded-full bg-destructive/60 inline-block" />
        Order was cancelled
      </div>
    );
  }

  const currentIdx = STATUS_ORDER[status];

  return (
    <div className="flex items-center gap-0 w-full" data-ocid="order.timeline">
      {TIMELINE_STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = idx <= currentIdx;
        const active = idx === currentIdx;

        return (
          <div key={step.status} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-smooth ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                } ${active ? "ring-2 ring-primary/30 ring-offset-1" : ""}`}
              >
                <Icon size={13} />
              </div>
              <span
                className={`text-[10px] mt-1 text-center leading-tight font-medium ${
                  done ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < TIMELINE_STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 mb-4 rounded-full transition-smooth ${
                  idx < currentIdx ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Payment Status Badge ─────────────────────────────────────────────────────

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const config: Record<PaymentStatus, { label: string; className: string }> = {
    [PaymentStatus.paid]: {
      label: "Paid",
      className: "text-primary bg-primary/10 border-primary/25",
    },
    [PaymentStatus.pending]: {
      label: "Payment Pending",
      className: "text-foreground bg-muted border-border",
    },
    [PaymentStatus.failed]: {
      label: "Payment Failed",
      className: "text-destructive bg-destructive/10 border-destructive/25",
    },
    [PaymentStatus.refunded]: {
      label: "Refunded",
      className: "text-muted-foreground bg-secondary border-border",
    },
  };
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${c.className}`}
    >
      <CreditCard size={10} />
      {c.label}
    </span>
  );
}

// ─── Order Items List ─────────────────────────────────────────────────────────

function OrderItemsList({ items }: { items: OrderItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.foodItemId.toString()}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
              {item.quantity.toString()}
            </span>
            <span className="text-foreground truncate">{item.name}</span>
          </div>
          <PriceDisplay
            paisa={item.price * item.quantity}
            className="text-muted-foreground shrink-0 ml-2"
          />
        </li>
      ))}
    </ul>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({
  order,
  index,
  isExpanded,
  onToggle,
}: {
  order: Order;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { addItem, cart } = useCartContext();
  const isActive = ACTIVE_STATUSES.has(order.status);

  const handleReorder = useCallback(() => {
    if (
      cart.restaurantId !== null &&
      cart.restaurantId !== order.restaurantId
    ) {
      toast.error(
        "Clear your current cart before reordering from a different restaurant.",
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
        restaurantName: order.restaurantName,
      });
    }
    toast.success("Items added to cart!", {
      description: `${order.items.length} item(s) from ${order.restaurantName}`,
    });
  }, [order, addItem, cart.restaurantId]);

  const formattedDate = new Date(
    Number(order.createdAt) / 1_000_000,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(
    Number(order.createdAt) / 1_000_000,
  ).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, delay: index * 0.05 }}
      data-ocid={`orders.item.${index + 1}`}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-card"
    >
      {/* Active pulse indicator */}
      {isActive && (
        <div className="h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
      )}

      {/* Card header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        data-ocid={`orders.expand_button.${index + 1}`}
        className="w-full text-left px-4 pt-4 pb-3 hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-display font-bold text-foreground text-base leading-tight truncate">
                {order.restaurantName}
              </p>
              {isActive && (
                <span className="inline-flex items-center gap-1 text-[10px] text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                  Live
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Order #{order.id.toString()} · {formattedDate} at {formattedTime}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <OrderStatusBadge status={order.status} />
            <div className="flex items-center gap-1.5">
              <PriceDisplay
                paisa={order.total}
                className="font-bold text-foreground text-sm"
              />
              {isExpanded ? (
                <ChevronUp size={14} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={14} className="text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
            data-ocid={`orders.detail.${index + 1}`}
          >
            <div className="px-4 pb-4 border-t border-border/60 pt-4 space-y-4">
              {/* Status timeline */}
              <OrderTimeline status={order.status} />

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Items
                </p>
                <OrderItemsList items={order.items} />
              </div>

              {/* Price breakdown */}
              <div className="bg-muted/40 rounded-xl p-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <PriceDisplay paisa={order.subtotal} />
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <PriceDisplay paisa={order.deliveryFee} />
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <PriceDisplay paisa={order.taxes} />
                </div>
                <div className="flex justify-between font-bold text-foreground pt-1 border-t border-border">
                  <span>Total</span>
                  <PriceDisplay paisa={order.total} className="text-primary" />
                </div>
              </div>

              {/* Delivery & payment meta */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-primary/70"
                  />
                  <span className="leading-snug">{order.deliveryAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} className="shrink-0 text-primary/70" />
                  <span>
                    {formattedDate} · {formattedTime}
                  </span>
                </div>
                {order.specialInstructions && (
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 italic">
                    "{order.specialInstructions}"
                  </div>
                )}
              </div>

              {/* Footer: payment badge + reorder */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <PaymentBadge status={order.paymentStatus} />
                {order.status !== OrderStatus.cancelled && (
                  <button
                    type="button"
                    onClick={handleReorder}
                    data-ocid={`orders.reorder_button.${index + 1}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full transition-smooth"
                  >
                    <RefreshCw size={11} />
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Filter tab helpers ───────────────────────────────────────────────────────

function filterOrders(orders: Order[], tab: FilterTab): Order[] {
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Orders() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fetch all orders and do client-side filtering (simpler, and polling covers active)
  const { data: allOrders, isLoading } = useMyOrders(null);

  const navigate = useNavigate();

  const filtered = allOrders ? filterOrders(allOrders, activeTab) : [];

  // Active-order count badge for "Active" tab
  const activeCount = allOrders
    ? allOrders.filter((o) => ACTIVE_STATUSES.has(o.status)).length
    : 0;

  if (isLoading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-foreground">
            My Orders
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {allOrders?.length ?? 0} order
            {(allOrders?.length ?? 0) !== 1 ? "s" : ""} placed
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none"
          data-ocid="orders.filter.tabs"
        >
          {FILTER_TABS.map(({ label, value }) => {
            const isSelected = activeTab === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setActiveTab(value)}
                data-ocid={`orders.filter.${value}`}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:border-primary/60 hover:text-primary"
                }`}
              >
                {label}
                {value === "active" && activeCount > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {activeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Order list or empty state */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<ClipboardList size={56} />}
            title={
              activeTab === "all"
                ? "No orders yet"
                : activeTab === "active"
                  ? "No active orders"
                  : activeTab === "completed"
                    ? "No completed orders"
                    : "No cancelled orders"
            }
            description={
              activeTab === "all"
                ? "Place your first order and it will show up here."
                : activeTab === "active"
                  ? "Your current orders will appear here once placed."
                  : "Switch to 'All' to see your full order history."
            }
            action={
              activeTab === "all"
                ? {
                    label: "Browse restaurants",
                    onClick: () => navigate({ to: "/" }),
                  }
                : undefined
            }
            data-ocid="orders.empty_state"
          />
        ) : (
          <motion.div className="space-y-3" data-ocid="orders.list" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((order, i) => {
                const id = order.id.toString();
                return (
                  <OrderCard
                    key={id}
                    order={order}
                    index={i}
                    isExpanded={expandedId === id}
                    onToggle={() =>
                      setExpandedId((prev) => (prev === id ? null : id))
                    }
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
