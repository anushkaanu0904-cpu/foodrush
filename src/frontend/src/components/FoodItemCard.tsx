import { Button } from "@/components/ui/button";
import { Flame, Leaf, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";
import type { FoodItem } from "../types";
import { DietaryTag } from "../types";
import { PriceDisplay } from "./PriceDisplay";

interface FoodItemCardProps {
  item: FoodItem;
  restaurantName: string;
  index?: number;
}

export function FoodItemCard({
  item,
  restaurantName,
  index = 0,
}: FoodItemCardProps) {
  const {
    addItem,
    updateQuantity,
    getItemQuantity,
    isFromDifferentRestaurant,
    cart,
  } = useCart();
  const quantity = getItemQuantity(item.id);
  const imageUrl =
    item.image?.getDirectURL?.() ?? "/assets/images/placeholder-food.jpg";

  const isVeg =
    item.dietaryTags.includes(DietaryTag.veg) ||
    item.dietaryTags.includes(DietaryTag.vegan);
  const isSpicy = item.dietaryTags.includes(DietaryTag.spicy);

  const handleAdd = () => {
    if (isFromDifferentRestaurant(item.restaurantId)) {
      toast.warning("Clear your cart first", {
        description: `Your cart has items from ${cart.restaurantName}. Clear it to add from a new restaurant.`,
        action: {
          label: "Clear cart",
          onClick: () => {
            // handled by caller
          },
        },
      });
      return;
    }
    addItem({
      foodItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: imageUrl,
      restaurantId: item.restaurantId,
      restaurantName,
    });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-smooth"
      data-ocid={`food.item.${index + 1}`}
    >
      <div className="flex gap-4 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            {isVeg ? (
              <Leaf
                size={14}
                className="text-green-600 shrink-0"
                aria-label="Vegetarian"
              />
            ) : (
              <span className="w-3.5 h-3.5 rounded-sm border-2 border-red-600 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              </span>
            )}
            {isSpicy && (
              <Flame size={13} className="text-orange-500 shrink-0" />
            )}
          </div>
          <h4 className="font-display font-semibold text-foreground text-sm truncate">
            {item.name}
          </h4>
          <p className="text-muted-foreground text-xs line-clamp-2 mt-1 mb-3">
            {item.description}
          </p>
          <PriceDisplay
            paisa={item.price}
            className="font-semibold text-foreground text-sm"
          />
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="w-24 h-20 rounded-lg overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder-food.jpg";
              }}
            />
          </div>
          {!item.isAvailable ? (
            <span className="text-xs text-muted-foreground">Unavailable</span>
          ) : quantity === 0 ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleAdd}
              data-ocid={`food.add_button.${index + 1}`}
              className="w-24 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs"
            >
              <Plus size={14} className="mr-1" />
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-1 bg-primary rounded-lg overflow-hidden w-24 h-8">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, quantity - 1)}
                data-ocid={`food.remove_button.${index + 1}`}
                className="flex-1 flex items-center justify-center h-full text-primary-foreground hover:bg-primary/80 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="text-primary-foreground font-bold text-sm min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, quantity + 1)}
                data-ocid={`food.add_more_button.${index + 1}`}
                className="flex-1 flex items-center justify-center h-full text-primary-foreground hover:bg-primary/80 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
