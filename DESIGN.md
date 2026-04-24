# Design Brief

## Tone & Differentiation
Warm, accessible, trustworthy food marketplace. Swiggy/Zomato-inspired card-based design with premium polish. Emphasis on discovery (restaurants), speed (order tracking), and delight (visual hierarchy through color and imagery).

## Palette

| Token | OKLCH | Usage |
|---|---|---|
| primary | 0.55 0.24 29 | Warm orange CTAs, status badges, interactive states |
| secondary | 0.95 0 0 | Subtle backgrounds, dividers |
| muted | 0.92 0 0 | Secondary backgrounds, disabled states |
| destructive | 0.55 0.22 25 | Cancel, remove, critical actions |
| background | 0.98 0 0 | Page canvas |
| card | 1.0 0 0 | Restaurant/item cards, modals |
| foreground | 0.12 0 0 | Body text, high contrast |

## Typography

Display: Space Grotesk (bold headlines, restaurant names, hero text)
Body: DM Sans (UI labels, descriptions, body copy)
Mono: Geist Mono (order IDs, tracking codes)

## Elevation & Depth

Card hover: `shadow-hover` (0 4px 16px rgba(0,0,0,0.12))
Card rest: `shadow-card` (0 2px 8px rgba(0,0,0,0.08))
Sticky headers use `z-10` with `bg-background/95 backdrop-blur`

## Structural Zones

| Zone | Treatment | Usage |
|---|---|---|
| Header | sticky, bg-card, border-b border-border | Navigation, search, logo |
| Hero | full-width image with overlay gradient | Restaurant detail, promo banners |
| Cards | bg-card rounded-lg shadow-card | Restaurants, food items, orders |
| Modals | bg-card rounded-lg shadow-hover | Cart, checkout, confirmations |
| Footer | bg-muted/40 border-t border-border | Links, branding |

## Component Patterns

**Restaurant Cards**: Image + name + rating (⭐) + delivery time + cuisine tags
**Food Items**: Image + name + price + add-to-cart button
**Order Tracking**: Status badge (color-coded) + timeline + ETA + contact support link
**CTAs**: Primary (warm orange), secondary (muted), destructive (red)

## Motion

Smooth transitions (0.3s cubic-bezier) on hover/focus. No animations on first load. Status badge updates fade-in gracefully.

## Constraints

No full-page animations. Max 2 custom shadows. Radio buttons instead of checkboxes for single selections. Orange accent used sparingly for CTAs and active states only.

## Signature Detail

Warm orange accent (0.55 0.24 29) applied strategically: star icons, delivery badges, "Add to Cart" buttons, and status updates. Creates visual thread connecting discovery → action → confirmation.
