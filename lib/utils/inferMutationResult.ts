import { UseMutationResult } from "@tanstack/react-query";

export type InferMutationResult<T> = T extends (
  ...args: any[]
) => UseMutationResult<
  infer TData,
  infer TError,
  infer TVariables,
  infer TContext
>
  ? NonNullable<UseMutationResult<TData, TError, TVariables, TContext>["data"]>
  : never;
