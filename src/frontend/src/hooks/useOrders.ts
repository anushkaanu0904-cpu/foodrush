import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Order,
  OrderId,
  OrderInput,
  OrderStatus,
  RestaurantId,
} from "../types";
import { useActor } from "./useBackend";

export function useMyOrders(statusFilter: OrderStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["myOrders", statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders(statusFilter);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });
}

export function useOrder(orderId: OrderId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Order | null>({
    queryKey: ["order", orderId?.toString()],
    queryFn: async () => {
      if (!actor || orderId === null) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== null,
    refetchInterval: 10_000,
  });
}

export function useAllOrders(
  restaurantFilter: RestaurantId | null = null,
  statusFilter: OrderStatus | null = null,
) {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["allOrders", restaurantFilter?.toString(), statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders(restaurantFilter, statusFilter);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: OrderInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myOrders"] }),
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: OrderId; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: (_, { orderId }) => {
      qc.invalidateQueries({ queryKey: ["order", orderId.toString()] });
      qc.invalidateQueries({ queryKey: ["allOrders"] });
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useConfirmOrderPayment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.confirmOrderPayment(sessionId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myOrders"] }),
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: Array<{
        productName: string;
        currency: string;
        quantity: bigint;
        priceInCents: bigint;
        productDescription: string;
      }>;
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

export function useStripeSessionStatus(sessionId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 3_000,
  });
}
