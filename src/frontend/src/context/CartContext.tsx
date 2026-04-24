import { type ReactNode, createContext, useContext, useReducer } from "react";
import type { CartItem, CartState, FoodItemId } from "../types";

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: FoodItemId }
  | {
      type: "UPDATE_QTY";
      payload: { foodItemId: FoodItemId; quantity: number };
    }
  | { type: "CLEAR_CART" };

interface CartContextValue {
  cart: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (foodItemId: FoodItemId) => void;
  updateQuantity: (foodItemId: FoodItemId, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: bigint;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = {
  items: [],
  restaurantId: null,
  restaurantName: "",
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.foodItemId === action.payload.foodItemId,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.foodItemId === action.payload.foodItemId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }
      return {
        ...state,
        restaurantId: action.payload.restaurantId,
        restaurantName: action.payload.restaurantName,
        items: [...state.items, action.payload],
      };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.foodItemId !== action.payload);
      return {
        ...state,
        items,
        restaurantId: items.length === 0 ? null : state.restaurantId,
        restaurantName: items.length === 0 ? "" : state.restaurantName,
      };
    }
    case "UPDATE_QTY": {
      if (action.payload.quantity <= 0) {
        const items = state.items.filter(
          (i) => i.foodItemId !== action.payload.foodItemId,
        );
        return {
          ...state,
          items,
          restaurantId: items.length === 0 ? null : state.restaurantId,
          restaurantName: items.length === 0 ? "" : state.restaurantName,
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.foodItemId === action.payload.foodItemId
            ? { ...i, quantity: action.payload.quantity }
            : i,
        ),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (foodItemId: FoodItemId) =>
    dispatch({ type: "REMOVE_ITEM", payload: foodItemId });
  const updateQuantity = (foodItemId: FoodItemId, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { foodItemId, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.price * BigInt(i.quantity),
    BigInt(0),
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be inside CartProvider");
  return ctx;
}
