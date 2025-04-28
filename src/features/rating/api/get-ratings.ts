import { PaginationResponse, RatingDto } from "@/types/api";
import { api } from "@/lib/api-client";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

type UseInfiniteRatingsOptions = {
  productId: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getInfiniteRatingsQueryOptions>;
};

type GetInfiniteRatingsOptions = Omit<UseInfiniteRatingsOptions, "queryConfig">;

export const getRatings = ({
  productId = 0,
  page = 1,
  size = 12,
}: {
  productId: number;
  page?: number;
  size?: number;
}): Promise<PaginationResponse<RatingDto>> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/ratings`, {
    params: {
      productId,
      page,
      size,
    },
  });
};

export const getInfiniteRatingsQueryOptions = (
  options: GetInfiniteRatingsOptions
) => {
  const { size, productId } = options;

  return infiniteQueryOptions({
    queryKey: ["ratings", productId],
    queryFn: ({ pageParam = 0 }) => {
      return getRatings({ productId, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.page === lastPage?.totalPages) return undefined;
      const nextPage = lastPage.page + 1;
      return nextPage;
    },
    initialPageParam: 0,
  });
};

export const useInfiniteRatings = ({
  productId,
  queryConfig,
}: UseInfiniteRatingsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteRatingsQueryOptions({ productId }),
    ...queryConfig,
  });
};
