import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { Layout } from "../components/Layout";
import { PriceDisplay } from "../components/PriceDisplay";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cart, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const deliveryFee = cart.items.length > 0 ? BigInt(4900) : BigInt(0);
  const taxes = BigInt(Math.round(Number(subtotal) * 0.05));
  const total = subtotal + deliveryFee + taxes;

  const handleApplyPromo = () => {
    if (promoCode.trim()) setPromoApplied(true);
  };

  if (cart.items.length === 0) {
    return (
      <Layout>
        <EmptyState
          icon={<ShoppingBag size={56} />}
          title="Your cart is empty"
          description="Add items from a restaurant to start your order"
          action={{
            label: "Browse restaurants",
            onClick: () => navigate({ to: "/" }),
          }}
          className="py-28"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Your Cart
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            data-ocid="cart.clear_button"
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-destructive/5"
          >
            <Trash2 size={13} />
            Clear all
          </button>
        </div>

        {/* Restaurant banner */}
        <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 mb-5 flex items-center gap-2.5">
          <ShoppingBag size={15} className="text-primary shrink-0" />
          <span className="text-sm text-foreground">
            Ordering from{" "}
            <Link
              to="/restaurant/$id"
              params={{ id: cart.restaurantId?.toString() ?? "0" }}
              className="font-semibold text-primary hover:underline"
              data-ocid="cart.restaurant.link"
            >
              {cart.restaurantName}
            </Link>
          </span>
        </div>

        {/* Items list */}
        <div
          className="bg-card rounded-2xl shadow-card overflow-hidden mb-5"
          data-ocid="cart.items.list"
        >
          <AnimatePresence initial={false}>
            {cart.items.map((item, i) => (
              <motion.div
                key={item.foodItemId.toString()}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                data-ocid={`cart.item.${i + 1}`}
              >
                <div className="flex items-center gap-4 px-4 py-4 border-b border-border last:border-b-0">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/placeholder-food.jpg";
                      }}
                    />
                  </div>

                  {/* Name + price */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate leading-tight">
                      {item.name}
                    </p>
                    <PriceDisplay
                      paisa={item.price}
                      className="text-xs text-muted-foreground mt-0.5"
                    />
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-primary rounded-lg overflow-hidden shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.foodItemId, item.quantity - 1)
                      }
                      data-ocid={`cart.decrease_button.${i + 1}`}
                      className="w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-black/10 transition-colors"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      {item.quantity === 1 ? (
                        <X size={12} />
                      ) : (
                        <Minus size={12} />
                      )}
                    </button>
                    <span className="text-primary-foreground font-bold text-sm w-6 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.foodItemId, item.quantity + 1)
                      }
                      data-ocid={`cart.increase_button.${i + 1}`}
                      className="w-8 h-8 flex items-center justify-center text-primary-foreground hover:bg-black/10 transition-colors"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right shrink-0 w-16">
                    <PriceDisplay
                      paisa={item.price * BigInt(item.quantity)}
                      className="font-semibold text-sm text-foreground"
                    />
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.foodItemId)}
                    data-ocid={`cart.delete_button.${i + 1}`}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Promo code */}
        <div className="bg-card rounded-2xl shadow-card p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={14} className="text-primary" />
            <span className="font-display font-semibold text-sm">
              Promo Code
            </span>
          </div>
          <div className="flex gap-2">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              data-ocid="cart.promo_code.input"
              className="flex-1 text-sm h-9"
              disabled={promoApplied}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || promoApplied}
              data-ocid="cart.promo_apply.button"
              className="shrink-0 text-xs px-4"
            >
              {promoApplied ? "Applied!" : "Apply"}
            </Button>
          </div>
          {promoApplied && (
            <div className="flex items-center gap-1.5 mt-2">
              <Badge variant="secondary" className="text-xs">
                {promoCode.toUpperCase()} applied
              </Badge>
            </div>
          )}
        </div>

        {/* Bill details */}
        <div className="bg-card rounded-2xl shadow-card p-4 mb-6">
          <h3 className="font-display font-semibold text-sm mb-3 text-foreground">
            Bill Details
          </h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Item total</span>
              <PriceDisplay paisa={subtotal} />
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery fee</span>
              <PriceDisplay paisa={deliveryFee} />
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST &amp; taxes (5%)</span>
              <PriceDisplay paisa={taxes} />
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-foreground text-base">
              <span>Total</span>
              <PriceDisplay paisa={total} />
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl shadow-card transition-smooth flex items-center gap-2"
          onClick={() => navigate({ to: "/checkout" })}
          data-ocid="cart.checkout_button"
        >
          Proceed to Checkout
          <span className="ml-auto flex items-center gap-1.5 opacity-90">
            <PriceDisplay paisa={total} />
            <ArrowRight size={16} />
          </span>
        </Button>
      </div>
    </Layout>
  );
}
