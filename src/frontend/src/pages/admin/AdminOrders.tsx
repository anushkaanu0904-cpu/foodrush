import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Download, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../../components/Layout";
import { PageLoader } from "../../components/LoadingSpinner";
import { OrderStatusBadge } from "../../components/OrderStatusBadge";
import { PriceDisplay } from "../../components/PriceDisplay";
import { useAllOrders, useUpdateOrderStatus } from "../../hooks/useOrders";
import { OrderStatus } from "../../types";
import type { Order } from "../../types";

const ALL_STATUSES = Object.values(OrderStatus);

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "Pending",
  [OrderStatus.preparing]: "Preparing",
  [OrderStatus.out_for_delivery]: "Out for Delivery",
  [OrderStatus.delivered]: "Delivered",
  [OrderStatus.cancelled]: "Cancelled",
};

// ─── expanded row ─────────────────────────────────────────────────────────────

function ExpandedOrder({ order }: { order: Order }) {
  return (
    <div className="px-4 pb-4 pt-0 bg-muted/30 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">
            Order Items
          </p>
          <div className="space-y-1.5">
            {order.items.map((item) => (
              <div
                key={item.foodItemId.toString()}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-muted-foreground">
                  {item.name}{" "}
                  <span className="font-medium text-foreground">
                    ×{item.quantity.toString()}
                  </span>
                </span>
                <span className="text-foreground font-medium">
                  <PriceDisplay paisa={item.price * item.quantity} />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtotal</span>
              <PriceDisplay paisa={order.subtotal} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Delivery fee</span>
              <PriceDisplay paisa={order.deliveryFee} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Taxes</span>
              <PriceDisplay paisa={order.taxes} />
            </div>
            <div className="flex justify-between text-xs font-bold text-foreground pt-1 border-t border-border/50">
              <span>Total</span>
              <PriceDisplay paisa={order.total} />
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">
            Delivery Details
          </p>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Address: </span>
              {order.deliveryAddress || "—"}
            </p>
            <p>
              <span className="font-medium text-foreground">Phone: </span>
              {order.phone || "—"}
            </p>
            {order.specialInstructions && (
              <p>
                <span className="font-medium text-foreground">Note: </span>
                {order.specialInstructions}
              </p>
            )}
            <p>
              <span className="font-medium text-foreground">Payment: </span>
              <span className="capitalize">{order.paymentStatus}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Customer: </span>
              <span className="font-mono text-[10px] break-all">
                {order.customerId.toString().slice(0, 20)}…
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const { data: orders, isLoading } = useAllOrders(null, statusFilter);
  const updateMutation = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateMutation.mutateAsync({ orderId, status });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const toggleExpand = (id: bigint) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleExportCSV = () => {
    if (!orders || orders.length === 0) {
      toast.info("No orders to export");
      return;
    }
    const header = "ID,Restaurant,Customer,Total,Status,Date";
    const rows = orders.map((o) =>
      [
        o.id.toString(),
        `"${o.restaurantName}"`,
        o.customerId.toString().slice(0, 16),
        (Number(o.total) / 100).toFixed(2),
        o.status,
        new Date(Number(o.createdAt) / 1_000_000).toLocaleString(),
      ].join(","),
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  if (isLoading)
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/admin"
              className="text-xs text-muted-foreground hover:text-primary mb-1 inline-flex items-center gap-1"
            >
              ← Dashboard
            </Link>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Orders
            </h1>
          </div>
          <button
            type="button"
            onClick={handleExportCSV}
            data-ocid="admin_orders.export_csv.button"
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
          {[
            { status: null, label: "All", count: orders?.length ?? 0 },
            ...ALL_STATUSES.map((s) => ({
              status: s,
              label: STATUS_LABELS[s],
              count: orders?.filter((o) => o.status === s).length ?? 0,
            })),
          ].map(({ status, label, count }) => (
            <button
              key={label}
              type="button"
              onClick={() => setStatusFilter(status)}
              data-ocid={`admin_orders.filter.${(status ?? "all").replace(/_/g, "-")}`}
              className={`rounded-xl p-3 text-center transition-smooth border ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground border-primary shadow-card"
                  : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              <p className="font-bold text-lg font-display">{count}</p>
              <p className="text-xs leading-tight opacity-80">{label}</p>
            </button>
          ))}
        </div>

        {/* Filter label */}
        {statusFilter && (
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Filter size={14} />
            <span>Showing: {STATUS_LABELS[statusFilter]}</span>
            <button
              type="button"
              onClick={() => setStatusFilter(null)}
              className="text-primary hover:underline text-xs ml-1"
              data-ocid="admin_orders.clear_filter.button"
            >
              Clear
            </button>
          </div>
        )}

        {/* Orders list */}
        {!orders || orders.length === 0 ? (
          <div
            className="bg-card rounded-2xl shadow-card p-12 text-center"
            data-ocid="admin_orders.empty_state"
          >
            <p className="text-muted-foreground text-sm">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-2" data-ocid="admin_orders.list">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_auto] gap-4 px-4 py-2.5 bg-muted/50 rounded-xl text-xs font-medium text-muted-foreground">
              <span>Order / Restaurant</span>
              <span>Customer</span>
              <span>Items</span>
              <span>Total</span>
              <span>Status</span>
              <span />
            </div>

            {orders.map((order, i) => {
              const isExpanded = expandedId === order.id;
              return (
                <div
                  key={order.id.toString()}
                  data-ocid={`admin_orders.item.${i + 1}`}
                  className="bg-card rounded-2xl shadow-card overflow-hidden"
                >
                  {/* Main row */}
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_auto] gap-3 md:gap-4 px-4 py-4 items-center">
                    {/* Order / restaurant */}
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        #{order.id.toString()}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {order.restaurantName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Customer */}
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        {order.customerId.toString().slice(0, 18)}…
                      </p>
                    </div>

                    {/* Items count */}
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        <PriceDisplay paisa={order.total} />
                      </p>
                    </div>

                    {/* Status select */}
                    <div>
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          handleStatusChange(order.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger
                          className="h-8 text-xs w-full"
                          data-ocid={`admin_orders.status_select.${i + 1}`}
                        >
                          <SelectValue>
                            <OrderStatusBadge status={order.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_STATUSES.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              <div className="flex items-center gap-2">
                                <OrderStatusBadge status={s} />
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expand toggle */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(order.id)}
                      data-ocid={`admin_orders.expand_button.${i + 1}`}
                      className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                      aria-label={
                        isExpanded ? "Collapse order" : "Expand order"
                      }
                    >
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && <ExpandedOrder order={order} />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
