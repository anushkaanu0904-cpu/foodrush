import { i as useActor, k as useQuery, l as useQueryClient } from "./index-BOLlBpkj.js";
import { u as useMutation } from "./useMutation-I4pzC6GI.js";
function useRestaurants(filters = null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["restaurants", filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRestaurants(filters);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useRestaurant(restaurantId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["restaurant", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return null;
      return actor.getRestaurant(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null
  });
}
function useFoodItems(restaurantId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["foodItems", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.listFoodItems(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null
  });
}
function useRestaurantReviews(restaurantId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["restaurantReviews", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.listRestaurantReviews(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null
  });
}
function useRestaurantRatingStats(restaurantId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["ratingStats", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return null;
      return actor.getRestaurantRatingStats(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null
  });
}
function useCreateRestaurant() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createRestaurant(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurants"] })
  });
}
function useUpdateRestaurant() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateRestaurant(id, input);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["restaurants"] });
      qc.invalidateQueries({ queryKey: ["restaurant", id.toString()] });
    }
  });
}
function useDeleteRestaurant() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (restaurantId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteRestaurant(restaurantId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurants"] })
  });
}
function useCreateFoodItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createFoodItem(input);
    },
    onSuccess: (_, input) => qc.invalidateQueries({
      queryKey: ["foodItems", input.restaurantId.toString()]
    })
  });
}
function useUpdateFoodItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFoodItem(id, input);
    },
    onSuccess: (_, { input }) => qc.invalidateQueries({
      queryKey: ["foodItems", input.restaurantId.toString()]
    })
  });
}
function useDeleteFoodItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      foodItemId
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFoodItem(foodItemId);
    },
    onSuccess: (_, { restaurantId }) => qc.invalidateQueries({
      queryKey: ["foodItems", restaurantId.toString()]
    })
  });
}
function usePostReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.postReview(input);
    },
    onSuccess: (_, input) => {
      qc.invalidateQueries({
        queryKey: ["restaurantReviews", input.restaurantId.toString()]
      });
      qc.invalidateQueries({
        queryKey: ["ratingStats", input.restaurantId.toString()]
      });
    }
  });
}
export {
  useRestaurant as a,
  useFoodItems as b,
  useRestaurantReviews as c,
  useRestaurantRatingStats as d,
  usePostReview as e,
  useDeleteRestaurant as f,
  useCreateFoodItem as g,
  useUpdateFoodItem as h,
  useDeleteFoodItem as i,
  useCreateRestaurant as j,
  useUpdateRestaurant as k,
  useRestaurants as u
};
