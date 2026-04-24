import { i as useActor, k as useQuery, l as useQueryClient } from "./index-BOLlBpkj.js";
import { u as useMutation } from "./useMutation-I4pzC6GI.js";
function useMyOrders(statusFilter = null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myOrders", statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders(statusFilter);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15e3
  });
}
function useAllOrders(restaurantFilter = null, statusFilter = null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allOrders", restaurantFilter == null ? void 0 : restaurantFilter.toString(), statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders(restaurantFilter, statusFilter);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15e3
  });
}
function usePlaceOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myOrders"] })
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: (_, { orderId }) => {
      qc.invalidateQueries({ queryKey: ["order", orderId.toString()] });
      qc.invalidateQueries({ queryKey: ["allOrders"] });
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    }
  });
}
function useConfirmOrderPayment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId) => {
      if (!actor) throw new Error("Not connected");
      return actor.confirmOrderPayment(sessionId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myOrders"] })
  });
}
function useCreateCheckoutSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    }
  });
}
function useStripeSessionStatus(sessionId) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 3e3
  });
}
export {
  usePlaceOrder as a,
  useCreateCheckoutSession as b,
  useStripeSessionStatus as c,
  useConfirmOrderPayment as d,
  useAllOrders as e,
  useUpdateOrderStatus as f,
  useMyOrders as u
};
