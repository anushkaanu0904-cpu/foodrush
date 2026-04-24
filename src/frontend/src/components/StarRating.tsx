import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export function StarRating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  className = "",
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const px = sizeMap[size];
  const display = hovered ?? value;
  const stars = Array.from({ length: max }, (_, i) => `star-${i + 1}`);

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {stars.map((starId, i) => {
        const filled = i < display;
        return (
          <button
            key={starId}
            type="button"
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? i < value : undefined}
            aria-label={interactive ? `${i + 1} star` : `${i + 1} of ${max}`}
            onClick={
              interactive && onChange ? () => onChange(i + 1) : undefined
            }
            onMouseEnter={interactive ? () => setHovered(i + 1) : undefined}
            onMouseLeave={interactive ? () => setHovered(null) : undefined}
            className={
              interactive
                ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                : "cursor-default pointer-events-none"
            }
            tabIndex={interactive ? 0 : -1}
          >
            <Star
              size={px}
              className={
                filled
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground/40"
              }
            />
          </button>
        );
      })}
    </div>
  );
}
