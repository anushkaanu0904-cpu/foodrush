import { c as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BOLlBpkj.js";
import { c as createLucideIcon, u as useCart, L as Layout, I as Input, B as Button, b as Badge } from "./Layout-jHZpHPgU.js";
import { S as Separator } from "./separator-D0rGvpi1.js";
import { E as EmptyState } from "./EmptyState-B1JZtRfX.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { S as ShoppingBag } from "./shopping-bag-D_23qGVA.js";
import { T as Trash2 } from "./trash-2-HAHo1oqD.js";
import { A as AnimatePresence } from "./index-xsOSNvCR.js";
import { m as motion } from "./proxy-D4LMamSe.js";
import { X } from "./x-BnbYBnaW.js";
import { M as Minus } from "./minus-DH5Ve5_2.js";
import { P as Plus } from "./plus-BtlvXxTP.js";
import { A as ArrowRight } from "./arrow-right-CwwHqNyW.js";
import "./index-C0MjPmF0.js";
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function Cart() {
  var _a;
  const { cart, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = reactExports.useState("");
  const [promoApplied, setPromoApplied] = reactExports.useState(false);
  const deliveryFee = cart.items.length > 0 ? BigInt(4900) : BigInt(0);
  const taxes = BigInt(Math.round(Number(subtotal) * 0.05));
  const total = subtotal + deliveryFee + taxes;
  const handleApplyPromo = () => {
    if (promoCode.trim()) setPromoApplied(true);
  };
  if (cart.items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 56 }),
        title: "Your cart is empty",
        description: "Add items from a restaurant to start your order",
        action: {
          label: "Browse restaurants",
          onClick: () => navigate({ to: "/" })
        },
        className: "py-28"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Your Cart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
          cart.items.length,
          " ",
          cart.items.length === 1 ? "item" : "items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: clearCart,
          "data-ocid": "cart.clear_button",
          className: "text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-destructive/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
            "Clear all"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 mb-5 flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 15, className: "text-primary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
        "Ordering from",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/restaurant/$id",
            params: { id: ((_a = cart.restaurantId) == null ? void 0 : _a.toString()) ?? "0" },
            className: "font-semibold text-primary hover:underline",
            "data-ocid": "cart.restaurant.link",
            children: cart.restaurantName
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card rounded-2xl shadow-card overflow-hidden mb-5",
        "data-ocid": "cart.items.list",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: cart.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.2 },
            "data-ocid": `cart.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-4 border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.image,
                  alt: item.name,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder-food.jpg";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate leading-tight", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PriceDisplay,
                  {
                    paisa: item.price,
                    className: "text-xs text-muted-foreground mt-0.5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-primary rounded-lg overflow-hidden shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateQuantity(item.foodItemId, item.quantity - 1),
                    "data-ocid": `cart.decrease_button.${i + 1}`,
                    className: "w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-black/10 transition-colors",
                    "aria-label": `Decrease ${item.name} quantity`,
                    children: item.quantity === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-sm w-6 text-center tabular-nums", children: item.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateQuantity(item.foodItemId, item.quantity + 1),
                    "data-ocid": `cart.increase_button.${i + 1}`,
                    className: "w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-black/10 transition-colors",
                    "aria-label": `Increase ${item.name} quantity`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0 w-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceDisplay,
                {
                  paisa: item.price * BigInt(item.quantity),
                  className: "font-semibold text-sm text-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeItem(item.foodItemId),
                  "data-ocid": `cart.delete_button.${i + 1}`,
                  className: "text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0",
                  "aria-label": `Remove ${item.name}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                }
              )
            ] })
          },
          item.foodItemId.toString()
        )) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-4 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 14, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm", children: "Promo Code" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: promoCode,
            onChange: (e) => setPromoCode(e.target.value),
            placeholder: "Enter promo code",
            "data-ocid": "cart.promo_code.input",
            className: "flex-1 text-sm h-9",
            disabled: promoApplied
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleApplyPromo,
            disabled: !promoCode.trim() || promoApplied,
            "data-ocid": "cart.promo_apply.button",
            className: "shrink-0 text-xs px-4",
            children: promoApplied ? "Applied!" : "Apply"
          }
        )
      ] }),
      promoApplied && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
        promoCode.toUpperCase(),
        " applied"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-3 text-foreground", children: "Bill Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Item total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: subtotal })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: deliveryFee })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST & taxes (5%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: taxes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: total })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl shadow-card transition-smooth flex items-center gap-2",
        onClick: () => navigate({ to: "/checkout" }),
        "data-ocid": "cart.checkout_button",
        children: [
          "Proceed to Checkout",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1.5 opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: total }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  Cart as default
};
