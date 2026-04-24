import { Button } from "@/components/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle, Clock, MapPin, ShoppingBag, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PriceDisplay } from "../components/PriceDisplay";
import { useCart } from "../hooks/useCart";
import {
  useConfirmOrderPayment,
  usePlaceOrder,
  useStripeSessionStatus,
} from "../hooks/useOrders";

const ESTIMATED_MINUTES = 35;

function SuccessCheckmark() {
  return (
    <motion.div
      className="relative mx-auto mb-6"
      style={{ width: 96, height: 96 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500/20"
        initial={{ scale: 0.8, opacity: 1 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.8,
          ease: "easeOut",
          delay: 0.6,
        }}
      />
      <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 240,
            damping: 14,
          }}
        >
          <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface PendingOrderData {
  deliveryAddress: string;
  restaurantId: string;
  specialInstructions: string;
  phone: string;
  items: Array<{ foodItemId: string; quantity: number }>;
}

export default function OrderSuccess() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { session_id?: string };
  const sessionId = search.session_id ?? null;
  const { data: sessionStatus, isLoading } = useStripeSessionStatus(sessionId);
  const confirmMutation = useConfirmOrderPayment();
  const placeMutation = usePlaceOrder();
  const { cart, clearCart } = useCart();
  const finalizedRef = useRef(false);

  // Parse pending order from sessionStorage for display
  const pendingOrderRaw = sessionStorage.getItem("pendingOrder");
  const pendingOrder: PendingOrderData | null = pendingOrderRaw
    ? (JSON.parse(pendingOrderRaw) as PendingOrderData)
    : null;

  // Keep stable refs so useEffect doesn't need them as deps
  const placeMutateRef = useRef(placeMutation.mutateAsync);
  const confirmMutateRef = useRef(confirmMutation.mutateAsync);
  const clearCartRef = useRef(clearCart);
  placeMutateRef.current = placeMutation.mutateAsync;
  confirmMutateRef.current = confirmMutation.mutateAsync;
  clearCartRef.current = clearCart;

  useEffect(() => {
    if (
      !sessionStatus ||
      sessionStatus.__kind__ !== "completed" ||
      !sessionId ||
      finalizedRef.current
    )
      return;
    finalizedRef.current = true;

    const stored = sessionStorage.getItem("pendingOrder");
    const orderData: PendingOrderData | null = stored
      ? (JSON.parse(stored) as PendingOrderData)
      : null;

    const finalize = async () => {
      try {
        if (orderData) {
          await placeMutateRef.current({
            deliveryAddress: orderData.deliveryAddress,
            restaurantId: BigInt(orderData.restaurantId),
            specialInstructions: orderData.specialInstructions,
            phone: orderData.phone,
            items: orderData.items.map((i) => ({
              foodItemId: BigInt(i.foodItemId),
              quantity: BigInt(i.quantity),
            })),
            stripeSessionId: sessionId,
          });
          sessionStorage.removeItem("pendingOrder");
        }
        await confirmMutateRef.current(sessionId);
        clearCartRef.current();
        toast.success("Payment confirmed! Your order is being prepared 🍽️");
      } catch {
        toast.error(
          "Payment confirmed but order creation failed. Please contact support.",
        );
      }
    };
    finalize();
  }, [sessionStatus, sessionId]);

  // Loading state
  if (!sessionId && cart.items.length === 0) {
    // Cash on delivery success — navigated here via orders
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <SuccessCheckmark />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="font-display font-bold text-2xl text-foreground mb-2">
              Order Placed!
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Your order has been successfully placed. Our delivery team is
              getting it ready.
            </p>
            <div className="flex items-center justify-center gap-2 bg-muted/40 rounded-xl px-4 py-3 mb-8">
              <Clock size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Estimated delivery:{" "}
                <span className="text-primary font-bold">
                  {ESTIMATED_MINUTES}–45 mins
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate({ to: "/orders" })}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
                data-ocid="order_success.track_order.button"
              >
                Track My Order
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: "/" })}
                className="w-full font-semibold rounded-xl"
                data-ocid="order_success.continue_shopping.button"
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (isLoading || confirmMutation.isPending || placeMutation.isPending) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-5" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            Confirming your payment…
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Please wait — don't close this tab.
          </p>
        </div>
      </Layout>
    );
  }

  const success = sessionStatus?.__kind__ === "completed";

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        {success ? (
          <>
            <SuccessCheckmark />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display font-bold text-2xl text-foreground mb-1">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Your order is confirmed and being prepared with care.
              </p>
            </motion.div>

            {/* Estimated delivery */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex items-center justify-center gap-2 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 mb-5"
            >
              <Clock size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Estimated delivery:{" "}
                <span className="text-primary font-bold">
                  {ESTIMATED_MINUTES}–45 mins
                </span>
              </span>
            </motion.div>

            {/* Order summary card */}
            {pendingOrder && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="bg-card rounded-2xl shadow-card p-5 mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag size={15} className="text-primary" />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    Order Summary
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {cart.items.length > 0 ? (
                    cart.items.map((item) => (
                      <div
                        key={item.foodItemId.toString()}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-foreground">
                          {item.name}
                          <span className="text-muted-foreground ml-1">
                            ×{item.quantity}
                          </span>
                        </span>
                        <PriceDisplay
                          paisa={item.price * BigInt(item.quantity)}
                          className="text-foreground font-medium"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Items confirmed ✓
                    </p>
                  )}
                </div>

                {/* Delivery address */}
                <div className="bg-muted/40 rounded-xl p-3 flex items-start gap-2">
                  <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      Delivering to
                    </p>
                    <p className="text-sm text-foreground">
                      {pendingOrder.deliveryAddress}
                    </p>
                    {pendingOrder.phone && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pendingOrder.phone}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-col gap-3"
            >
              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-card transition-smooth"
                onClick={() => navigate({ to: "/orders" })}
                data-ocid="order_success.track_order.button"
              >
                Track My Order
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 font-semibold rounded-xl transition-smooth"
                onClick={() => navigate({ to: "/" })}
                data-ocid="order_success.continue_shopping.button"
              >
                Continue Shopping
              </Button>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="mb-6"
            >
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <XCircle
                  size={48}
                  className="text-destructive"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h1 className="font-display font-bold text-2xl text-foreground mb-2">
                Payment Failed
              </h1>
              <p className="text-muted-foreground text-sm mb-8">
                Something went wrong with your payment. Your cart items are
                still saved.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
                  onClick={() => navigate({ to: "/checkout" })}
                  data-ocid="order_success.retry.button"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 font-semibold rounded-xl"
                  onClick={() => navigate({ to: "/" })}
                  data-ocid="order_success.browse.button"
                >
                  Browse Restaurants
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
}
