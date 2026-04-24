import { Link } from "@tanstack/react-router";
import { Bike, ChefHat, Clock, Star } from "lucide-react";
import type { RestaurantSummary } from "../types";
import { PriceDisplay } from "./PriceDisplay";

interface RestaurantCardProps {
  restaurant: RestaurantSummary;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  const imageUrl =
    restaurant.image?.getDirectURL?.() ??
    "/assets/images/placeholder-restaurant.jpg";

  return (
    <Link
      to="/restaurant/$id"
      params={{ id: restaurant.id.toString() }}
      data-ocid={`restaurant.item.${index + 1}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder-restaurant.jpg";
          }}
        />
        {!restaurant.isActive && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-primary-foreground font-medium text-sm bg-foreground/80 px-3 py-1 rounded-full">
              Currently Closed
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-card text-foreground text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 shadow-card">
          <Star size={11} className="fill-primary text-primary" />
          {restaurant.averageRating.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-base truncate mb-1">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3 min-w-0">
          <ChefHat size={12} className="shrink-0" />
          <span className="truncate">{restaurant.cuisineType}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{restaurant.deliveryTimeMinutes.toString()} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Bike size={12} />
            <PriceDisplay paisa={restaurant.deliveryFee} className="text-xs" />
            <span>delivery</span>
          </div>
          <div className="text-muted-foreground">
            Min{" "}
            <PriceDisplay paisa={restaurant.minimumOrder} className="text-xs" />
          </div>
        </div>
      </div>
    </Link>
  );
}
