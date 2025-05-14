import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { CartDto } from "@/types/api";

type UseCartOptions = {
  id: string | undefined;
  queryConfig?: QueryConfig<typeof getCartQueryOptions>;
};

type GetCartOptions = Omit<UseCartOptions, "queryConfig">;

export const getCarts = (): Promise<CartDto> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/carts/self`);
};

export const getCartQueryOptions = (options: GetCartOptions) => {
  return queryOptions({
    queryKey: ["cart", options.id],
    queryFn: () => {
      const apiResponse = getCarts();
      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCarts = ({ id, queryConfig }: UseCartOptions) => {
  return useQuery({
    ...getCartQueryOptions({ id }),
    ...queryConfig,
  });
};
