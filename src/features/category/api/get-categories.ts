import { CategoryDto } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

type UseCategoriesOptions = {
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

type GetCategoriesOptions = Omit<UseCategoriesOptions, "queryConfig">;

export const getCategories = ({
  page = 1,
  size = 12,
}: GetCategoriesOptions): Promise<CategoryDto[]> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/categories`, {
    params: {
      page,
      size,
    },
  });
};

export const getCategoriesQueryOptions = (options: GetCategoriesOptions) => {
  const { page, size } = options;
  return queryOptions({
    queryKey: ["categories", page, size],
    queryFn: () => {
      const apiResponse = getCategories(options);
      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCategories = ({
  queryConfig,
  page = 1,
  size = 12,
}: UseCategoriesOptions) => {
  return useQuery({
    ...getCategoriesQueryOptions({ page, size }),
    ...queryConfig,
  });
};
