import { useActor as useActorBase } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend.d.ts";

/** Typed wrapper around useActor that provides the backend createActor function */
export function useActor() {
  return useActorBase<backendInterface>(createActor);
}
