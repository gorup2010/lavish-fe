import { api } from "@/lib/api-client";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { CategoryFilter, CategoryInAdminDto, PaginationResponse,  } from "@/types/api";

type UseAdminCategoriesOptions = {
  filter: CategoryFilter;
  queryConfig?: QueryConfig<typeof getAdminCategoriesQueryOptions>;
};

type GetAdminCategoriesOptions = Omit<UseAdminCategoriesOptions, "queryConfig">;

export const getAdminCategories = ({
  filter,
}: GetAdminCategoriesOptions): Promise<PaginationResponse<CategoryInAdminDto>> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/categories/admin`, {
    params: {
      ...filter,
    }
  });
};

export const getAdminCategoriesQueryOptions = (options: GetAdminCategoriesOptions) => {
  return queryOptions({
    queryKey: ["admin-categories", options.filter],
    queryFn: () => {
      const apiResponse = getAdminCategories(options);
      return apiResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useAdminCategories = ({ filter, queryConfig }: UseAdminCategoriesOptions) => {
  return useQuery({
    ...getAdminCategoriesQueryOptions({ filter }),
    ...queryConfig,
  });
};
