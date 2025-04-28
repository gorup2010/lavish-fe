import { PaginationResponse, ProductCardDto, ProductFilter } from "@/types/api";
import { api } from "@/lib/api-client";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import qs from "qs";

type UseInfiniteProductsOptions = {
  filter?: ProductFilter;
  size?: number;
  queryConfig?: QueryConfig<typeof getInfiniteProductsQueryOptions>;
};

type GetInfiniteProductsOptions = Omit<
  UseInfiniteProductsOptions,
  "queryConfig"
>;

export const getProducts = ({
  filter,
  page = 1,
  size = 12,
}: {
  filter?: ProductFilter;
  page?: number;
  size?: number;
}): Promise<PaginationResponse<ProductCardDto>> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/products`, {
    params: {
      page,
      size,
      ...filter,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const getInfiniteProductsQueryOptions = (
  options: GetInfiniteProductsOptions
) => {
  const { size, filter } = options;

  return infiniteQueryOptions({
    queryKey: ["products", filter],
    queryFn: ({ pageParam = 0 }) => {
      return getProducts({ filter, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.page === lastPage?.totalPages) return undefined;
      const nextPage = lastPage.page + 1;
      return nextPage;
    },
    initialPageParam: 0,
  });
};

export const useInfiniteProducts = ({
  filter,
  queryConfig,
}: UseInfiniteProductsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteProductsQueryOptions({ filter }),
    ...queryConfig,
  });
};
