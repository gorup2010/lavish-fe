import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { ProductDetailsDto } from "@/types/api";

type UseProductOptions = {
  id: string | undefined;
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

type GetProductOptions = Omit<UseProductOptions, "queryConfig">;

export const getProduct = ({
  id,
}: GetProductOptions): Promise<ProductDetailsDto> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
};

export const getProductQueryOptions = (options: GetProductOptions) => {
  return queryOptions({
    queryKey: ["products", options.id],
    queryFn: () => {
      const apiResponse = getProduct(options);
      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useProduct = ({ id, queryConfig }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions({ id }),
    ...queryConfig,
  });
};
