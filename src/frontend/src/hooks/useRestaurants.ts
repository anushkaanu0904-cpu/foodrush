import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FoodItem,
  FoodItemId,
  FoodItemInput,
  Restaurant,
  RestaurantId,
  RestaurantInput,
  RestaurantRatingStats,
  RestaurantSummary,
  Review,
  ReviewInput,
  SearchFilters,
} from "../types";
import { useActor } from "./useBackend";

export function useRestaurants(filters: SearchFilters | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<RestaurantSummary[]>({
    queryKey: ["restaurants", filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRestaurants(filters);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useRestaurant(restaurantId: RestaurantId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant | null>({
    queryKey: ["restaurant", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return null;
      return actor.getRestaurant(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
  });
}

export function useFoodItems(restaurantId: RestaurantId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<FoodItem[]>({
    queryKey: ["foodItems", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.listFoodItems(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
  });
}

export function useFoodItem(foodItemId: FoodItemId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<FoodItem | null>({
    queryKey: ["foodItem", foodItemId?.toString()],
    queryFn: async () => {
      if (!actor || foodItemId === null) return null;
      return actor.getFoodItem(foodItemId);
    },
    enabled: !!actor && !isFetching && foodItemId !== null,
  });
}

export function useSearchFoodItems(filters: SearchFilters) {
  const { actor, isFetching } = useActor();
  return useQuery<FoodItem[]>({
    queryKey: ["searchFoodItems", filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchFoodItems(filters);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRestaurantReviews(restaurantId: RestaurantId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["restaurantReviews", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.listRestaurantReviews(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
  });
}

export function useRestaurantRatingStats(restaurantId: RestaurantId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<RestaurantRatingStats | null>({
    queryKey: ["ratingStats", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return null;
      return actor.getRestaurantRatingStats(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
  });
}

export function useCreateRestaurant() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: RestaurantInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.createRestaurant(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurants"] }),
  });
}

export function useUpdateRestaurant() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: RestaurantId; input: RestaurantInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateRestaurant(id, input);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["restaurants"] });
      qc.invalidateQueries({ queryKey: ["restaurant", id.toString()] });
    },
  });
}

export function useDeleteRestaurant() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (restaurantId: RestaurantId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteRestaurant(restaurantId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurants"] }),
  });
}

export function useCreateFoodItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: FoodItemInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.createFoodItem(input);
    },
    onSuccess: (_, input) =>
      qc.invalidateQueries({
        queryKey: ["foodItems", input.restaurantId.toString()],
      }),
  });
}

export function useUpdateFoodItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: FoodItemId; input: FoodItemInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFoodItem(id, input);
    },
    onSuccess: (_, { input }) =>
      qc.invalidateQueries({
        queryKey: ["foodItems", input.restaurantId.toString()],
      }),
  });
}

export function useDeleteFoodItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      foodItemId,
    }: {
      foodItemId: FoodItemId;
      restaurantId: RestaurantId;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFoodItem(foodItemId);
    },
    onSuccess: (_, { restaurantId }) =>
      qc.invalidateQueries({
        queryKey: ["foodItems", restaurantId.toString()],
      }),
  });
}

export function usePostReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ReviewInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.postReview(input);
    },
    onSuccess: (_, input) => {
      qc.invalidateQueries({
        queryKey: ["restaurantReviews", input.restaurantId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["ratingStats", input.restaurantId.toString()],
      });
    },
  });
}
