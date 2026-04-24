import { c as useNavigate, r as reactExports, j as jsxRuntimeExports, a as ue } from "./index-BOLlBpkj.js";
import { c as createLucideIcon, u as useCart, L as Layout, I as Input, B as Button } from "./Layout-jHZpHPgU.js";
import { L as Label } from "./label-Bmb5X0vy.js";
import { S as Separator } from "./separator-D0rGvpi1.js";
import { S as Skeleton } from "./skeleton-CN_1PsVK.js";
import { T as Textarea } from "./textarea-CoNsSluP.js";
import { P as PriceDisplay } from "./PriceDisplay-BM2hoOae.js";
import { a as usePlaceOrder, b as useCreateCheckoutSession } from "./useOrders-BVXMOP7Z.js";
import { u as useProfile } from "./useProfile-AHZ80ytO.js";
import { M as MapPin } from "./map-pin-CwKfQ1No.js";
import { P as Phone } from "./phone-BCUe6uDV.js";
import { C as CreditCard } from "./credit-card-BoLv2ONJ.js";
import "./index-C0MjPmF0.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const placeMutation = usePlaceOrder();
  const checkoutMutation = useCreateCheckoutSession();
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [instructions, setInstructions] = reactExports.useState("");
  const profileInitialized = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (profile && !profileInitialized.current) {
      profileInitialized.current = true;
      if (profile.defaultAddress) setAddress(profile.defaultAddress);
      if (profile.phone) setPhone(profile.phone);
      if (profile.name) setName(profile.name);
    }
  }, [profile]);
  const deliveryFee = BigInt(4900);
  const taxes = BigInt(Math.round(Number(subtotal) * 0.05));
  const total = subtotal + deliveryFee + taxes;
  if (cart.items.length === 0) {
    navigate({ to: "/" });
    return null;
  }
  const validate = () => {
    if (!address.trim()) {
      ue.error("Please enter a delivery address");
      return false;
    }
    if (!phone.trim()) {
      ue.error("Please enter a phone number");
      return false;
    }
    return true;
  };
  const fullAddress = [address.trim(), city.trim()].filter(Boolean).join(", ");
  const handleStripeCheckout = async () => {
    var _a;
    if (!validate()) return;
    try {
      const items = cart.items.map((item) => ({
        productName: item.name,
        currency: "inr",
        quantity: BigInt(item.quantity),
        priceInCents: item.price,
        productDescription: `From ${cart.restaurantName}`
      }));
      const successUrl = `${window.location.origin}/order-success`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const sessionUrl = await checkoutMutation.mutateAsync({
        items,
        successUrl,
        cancelUrl
      });
      sessionStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          deliveryAddress: fullAddress,
          restaurantId: (_a = cart.restaurantId) == null ? void 0 : _a.toString(),
          specialInstructions: instructions,
          phone,
          items: cart.items.map((i) => ({
            foodItemId: i.foodItemId.toString(),
            quantity: i.quantity
          }))
        })
      );
      window.location.href = sessionUrl;
    } catch {
      ue.error("Failed to start checkout. Please try again.");
    }
  };
  const handleCashOrder = async () => {
    if (!validate()) return;
    if (!cart.restaurantId) return;
    try {
      await placeMutation.mutateAsync({
        deliveryAddress: fullAddress,
        restaurantId: cart.restaurantId,
        specialInstructions: instructions,
        phone,
        items: cart.items.map((i) => ({
          foodItemId: i.foodItemId,
          quantity: BigInt(i.quantity)
        }))
      });
      clearCart();
      navigate({ to: "/orders" });
      ue.success("Order placed! Get ready for delicious food 🎉");
    } catch {
      ue.error("Failed to place order. Please try again.");
    }
  };
  const isProcessing = checkoutMutation.isPending || placeMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-5 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Delivery Details" })
      ] }),
      profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "name",
                className: "text-xs font-medium text-muted-foreground mb-1.5 block",
                children: "Full Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Your name",
                "data-ocid": "checkout.name.input",
                className: "h-10 text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "city",
                className: "text-xs font-medium text-muted-foreground mb-1.5 block",
                children: "City"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "city",
                value: city,
                onChange: (e) => setCity(e.target.value),
                placeholder: "City",
                "data-ocid": "checkout.city.input",
                className: "h-10 text-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "address",
              className: "text-xs font-medium text-muted-foreground mb-1.5 block",
              children: "Delivery Address *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "address",
              value: address,
              onChange: (e) => setAddress(e.target.value),
              placeholder: "House/flat number, street, landmark...",
              "data-ocid": "checkout.address.textarea",
              rows: 2,
              className: "resize-none text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "phone",
              className: "text-xs font-medium text-muted-foreground mb-1.5 block",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 11 }),
                "Phone Number *"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "+91 98765 43210",
              "data-ocid": "checkout.phone.input",
              className: "h-10 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "instructions",
              className: "text-xs font-medium text-muted-foreground mb-1.5 block",
              children: [
                "Special Instructions",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "instructions",
              value: instructions,
              onChange: (e) => setInstructions(e.target.value),
              placeholder: "e.g. Ring doorbell, extra napkins, mild spice...",
              "data-ocid": "checkout.instructions.input",
              className: "h-10 text-sm"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-5 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-3", children: [
        "Order Summary",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground ml-2", children: [
          "from ",
          cart.restaurantName
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: cart.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: deliveryFee })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST & taxes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: taxes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: total })
        ] })
      ] })
    ] }),
    (checkoutMutation.isError || placeMutation.isError) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 bg-destructive/8 border border-destructive/20 rounded-xl p-3.5 mb-4 text-sm text-destructive",
        "data-ocid": "checkout.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Something went wrong. Please check your details and try again." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl shadow-card transition-smooth",
          onClick: handleStripeCheckout,
          disabled: isProcessing,
          "data-ocid": "checkout.stripe_payment.button",
          children: checkoutMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
            "Redirecting to payment..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 16 }),
            "Pay with Card (Stripe)",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto opacity-80 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: total }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full h-12 font-semibold text-sm rounded-xl transition-smooth",
          onClick: handleCashOrder,
          disabled: isProcessing,
          "data-ocid": "checkout.cash_order.button",
          children: placeMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
            "Placing order..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 16 }),
            "Cash on Delivery"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4", children: "🔒 Payments are secure and encrypted" })
  ] }) });
}
export {
  Checkout as default
};
