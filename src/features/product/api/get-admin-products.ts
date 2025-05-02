import { api } from "@/lib/api-client";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { PaginationResponse, ProductCardInAdminDto, ProductFilter } from "@/types/api";

type UseAdminProductsOptions = {
  filter: ProductFilter;
  queryConfig?: QueryConfig<typeof getAdminProductsQueryOptions>;
};

type GetAdminProductsOptions = Omit<UseAdminProductsOptions, "queryConfig">;

export const getAdminProducts = ({
  filter,
}: GetAdminProductsOptions): Promise<PaginationResponse<ProductCardInAdminDto>> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/admin/products`, {
    params: {
      ...filter,
    }
  });
};

export const getAdminProductsQueryOptions = (options: GetAdminProductsOptions) => {
  return queryOptions({
    queryKey: ["admin-products", options.filter],
    queryFn: () => {
      const apiResponse = getAdminProducts(options);
      return apiResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useAdminProducts = ({ filter, queryConfig }: UseAdminProductsOptions) => {
  return useQuery({
    ...getAdminProductsQueryOptions({ filter }),
    ...queryConfig,
  });
};
