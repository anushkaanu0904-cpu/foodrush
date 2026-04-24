import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { PriceDisplay } from "../components/PriceDisplay";
import { useCart } from "../hooks/useCart";
import { useCreateCheckoutSession, usePlaceOrder } from "../hooks/useOrders";
import { useProfile } from "../hooks/useProfile";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const placeMutation = usePlaceOrder();
  const checkoutMutation = useCreateCheckoutSession();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [instructions, setInstructions] = useState("");
  const profileInitialized = useRef(false);

  // Pre-fill from profile once loaded
  useEffect(() => {
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
      toast.error("Please enter a delivery address");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return false;
    }
    return true;
  };

  const fullAddress = [address.trim(), city.trim()].filter(Boolean).join(", ");

  const handleStripeCheckout = async () => {
    if (!validate()) return;
    try {
      const items = cart.items.map((item) => ({
        productName: item.name,
        currency: "inr",
        quantity: BigInt(item.quantity),
        priceInCents: item.price,
        productDescription: `From ${cart.restaurantName}`,
      }));
      const successUrl = `${window.location.origin}/order-success`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const sessionUrl = await checkoutMutation.mutateAsync({
        items,
        successUrl,
        cancelUrl,
      });

      sessionStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          deliveryAddress: fullAddress,
          restaurantId: cart.restaurantId?.toString(),
          specialInstructions: instructions,
          phone,
          items: cart.items.map((i) => ({
            foodItemId: i.foodItemId.toString(),
            quantity: i.quantity,
          })),
        }),
      );
      window.location.href = sessionUrl;
    } catch {
      toast.error("Failed to start checkout. Please try again.");
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
          quantity: BigInt(i.quantity),
        })),
      });
      clearCart();
      navigate({ to: "/orders" });
      toast.success("Order placed! Get ready for delicious food 🎉");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const isProcessing = checkoutMutation.isPending || placeMutation.isPending;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Checkout
        </h1>

        {/* Delivery details */}
        <div className="bg-card rounded-2xl shadow-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin size={15} className="text-primary" />
            </div>
            <h2 className="font-display font-semibold text-base text-foreground">
              Delivery Details
            </h2>
          </div>

          {profileLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-xs font-medium text-muted-foreground mb-1.5 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    data-ocid="checkout.name.input"
                    className="h-10 text-sm"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="city"
                    className="text-xs font-medium text-muted-foreground mb-1.5 block"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    data-ocid="checkout.city.input"
                    className="h-10 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/flat number, street, landmark..."
                  data-ocid="checkout.address.textarea"
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone size={11} />
                    Phone Number *
                  </span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  data-ocid="checkout.phone.input"
                  className="h-10 text-sm"
                />
              </div>

              <div>
                <Label
                  htmlFor="instructions"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Special Instructions{" "}
                  <span className="text-muted-foreground/60">(optional)</span>
                </Label>
                <Input
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Ring doorbell, extra napkins, mild spice..."
                  data-ocid="checkout.instructions.input"
                  className="h-10 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-2xl shadow-card p-5 mb-6">
          <h2 className="font-display font-semibold text-base text-foreground mb-3">
            Order Summary
            <span className="text-xs font-normal text-muted-foreground ml-2">
              from {cart.restaurantName}
            </span>
          </h2>

          <div className="space-y-2">
            {cart.items.map((item) => (
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
            ))}
          </div>

          <Separator className="my-3" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery fee</span>
              <PriceDisplay paisa={deliveryFee} />
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST &amp; taxes</span>
              <PriceDisplay paisa={taxes} />
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-foreground text-base">
              <span>Total</span>
              <PriceDisplay paisa={total} />
            </div>
          </div>
        </div>

        {/* Payment error */}
        {(checkoutMutation.isError || placeMutation.isError) && (
          <div
            className="flex items-start gap-3 bg-destructive/8 border border-destructive/20 rounded-xl p-3.5 mb-4 text-sm text-destructive"
            data-ocid="checkout.error_state"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>
              Something went wrong. Please check your details and try again.
            </span>
          </div>
        )}

        {/* Payment actions */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl shadow-card transition-smooth"
            onClick={handleStripeCheckout}
            disabled={isProcessing}
            data-ocid="checkout.stripe_payment.button"
          >
            {checkoutMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Redirecting to payment...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard size={16} />
                Pay with Card (Stripe)
                <span className="ml-auto opacity-80 text-xs">
                  <PriceDisplay paisa={total} />
                </span>
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 font-semibold text-sm rounded-xl transition-smooth"
            onClick={handleCashOrder}
            disabled={isProcessing}
            data-ocid="checkout.cash_order.button"
          >
            {placeMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Placing order...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wallet size={16} />
                Cash on Delivery
              </span>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          🔒 Payments are secure and encrypted
        </p>
      </div>
    </Layout>
  );
}
