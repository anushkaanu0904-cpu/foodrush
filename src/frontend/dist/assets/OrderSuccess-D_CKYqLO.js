import { c as useNavigate, u as useSearch, r as reactExports, j as jsxRuntimeExports, e as LoadingSpinner, a as ue } from "./index-BOLlBpkj.js";
import { c as createLucideIcon, u as useCart, L as Layout, B as Button } from "./Layout-jHZpHPgU.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { c as useStripeSessionStatus, d as useConfirmOrderPayment, a as usePlaceOrder } from "./useOrders-BVXMOP7Z.js";
import { m as motion } from "./proxy-D4LMamSe.js";
import { C as Clock } from "./clock-D13EsfEZ.js";
import { S as ShoppingBag } from "./shopping-bag-D_23qGVA.js";
import { M as MapPin } from "./map-pin-CwKfQ1No.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const ESTIMATED_MINUTES = 35;
function SuccessCheckmark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "relative mx-auto mb-6",
      style: { width: 96, height: 96 },
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { type: "spring", stiffness: 220, damping: 16, delay: 0.1 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 rounded-full bg-green-500/20",
            initial: { scale: 0.8, opacity: 1 },
            animate: { scale: 1.6, opacity: 0 },
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeOut",
              delay: 0.6
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: {
              delay: 0.3,
              type: "spring",
              stiffness: 240,
              damping: 14
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 48, className: "text-green-500", strokeWidth: 1.5 })
          }
        ) })
      ]
    }
  );
}
function OrderSuccess() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const sessionId = search.session_id ?? null;
  const { data: sessionStatus, isLoading } = useStripeSessionStatus(sessionId);
  const confirmMutation = useConfirmOrderPayment();
  const placeMutation = usePlaceOrder();
  const { cart, clearCart } = useCart();
  const finalizedRef = reactExports.useRef(false);
  const pendingOrderRaw = sessionStorage.getItem("pendingOrder");
  const pendingOrder = pendingOrderRaw ? JSON.parse(pendingOrderRaw) : null;
  const placeMutateRef = reactExports.useRef(placeMutation.mutateAsync);
  const confirmMutateRef = reactExports.useRef(confirmMutation.mutateAsync);
  const clearCartRef = reactExports.useRef(clearCart);
  placeMutateRef.current = placeMutation.mutateAsync;
  confirmMutateRef.current = confirmMutation.mutateAsync;
  clearCartRef.current = clearCart;
  reactExports.useEffect(() => {
    if (!sessionStatus || sessionStatus.__kind__ !== "completed" || !sessionId || finalizedRef.current)
      return;
    finalizedRef.current = true;
    const stored = sessionStorage.getItem("pendingOrder");
    const orderData = stored ? JSON.parse(stored) : null;
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
              quantity: BigInt(i.quantity)
            })),
            stripeSessionId: sessionId
          });
          sessionStorage.removeItem("pendingOrder");
        }
        await confirmMutateRef.current(sessionId);
        clearCartRef.current();
        ue.success("Payment confirmed! Your order is being prepared 🍽️");
      } catch {
        ue.error(
          "Payment confirmed but order creation failed. Please contact support."
        );
      }
    };
    finalize();
  }, [sessionStatus, sessionId]);
  if (!sessionId && cart.items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessCheckmark, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Order Placed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Your order has been successfully placed. Our delivery team is getting it ready." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 bg-muted/40 rounded-xl px-4 py-3 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                "Estimated delivery:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
                  ESTIMATED_MINUTES,
                  "–45 mins"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => navigate({ to: "/orders" }),
                  className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl",
                  "data-ocid": "order_success.track_order.button",
                  children: "Track My Order"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => navigate({ to: "/" }),
                  className: "w-full font-semibold rounded-xl",
                  "data-ocid": "order_success.continue_shopping.button",
                  children: "Continue Shopping"
                }
              )
            ] })
          ]
        }
      )
    ] }) });
  }
  if (isLoading || confirmMutation.isPending || placeMutation.isPending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", className: "mx-auto mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Confirming your payment…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Please wait — don't close this tab." })
    ] }) });
  }
  const success = (sessionStatus == null ? void 0 : sessionStatus.__kind__) === "completed";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto px-4 py-12", children: success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessCheckmark, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.5, duration: 0.4 },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Payment Successful!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Your order is confirmed and being prepared with care." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.65 },
        className: "flex items-center justify-center gap-2 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 mb-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            "Estimated delivery:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
              ESTIMATED_MINUTES,
              "–45 mins"
            ] })
          ] })
        ]
      }
    ),
    pendingOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.75 },
        className: "bg-card rounded-2xl shadow-card p-5 mb-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 15, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Order Summary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: cart.items.length > 0 ? cart.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                  item.name,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1", children: [
                    "×",
                    item.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PriceDisplay,
                  {
                    paisa: item.price * BigInt(item.quantity),
                    className: "text-foreground font-medium"
                  }
                )
              ]
            },
            item.foodItemId.toString()
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Items confirmed ✓" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-0.5", children: "Delivering to" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: pendingOrder.deliveryAddress }),
              pendingOrder.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: pendingOrder.phone })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.85 },
        className: "flex flex-col gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-card transition-smooth",
              onClick: () => navigate({ to: "/orders" }),
              "data-ocid": "order_success.track_order.button",
              children: "Track My Order"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full h-12 font-semibold rounded-xl transition-smooth",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "order_success.continue_shopping.button",
              children: "Continue Shopping"
            }
          )
        ]
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 220, damping: 16 },
        className: "mb-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleX,
          {
            size: 48,
            className: "text-destructive",
            strokeWidth: 1.5
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Payment Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Something went wrong with your payment. Your cart items are still saved." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl",
                onClick: () => navigate({ to: "/checkout" }),
                "data-ocid": "order_success.retry.button",
                children: "Try Again"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full h-12 font-semibold rounded-xl",
                onClick: () => navigate({ to: "/" }),
                "data-ocid": "order_success.browse.button",
                children: "Browse Restaurants"
              }
            )
          ] })
        ]
      }
    )
  ] }) }) });
}
export {
  OrderSuccess as default
};
