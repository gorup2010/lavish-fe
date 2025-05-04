import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { CategoryDetailsDto } from "@/types/api";

type UseCategoryOptions = {
  id: string | undefined;
  queryConfig?: QueryConfig<typeof getCategoryQueryOptions>;
};

type GetCategoryOptions = Omit<UseCategoryOptions, "queryConfig">;

export const getCategory = ({
  id,
}: GetCategoryOptions): Promise<CategoryDetailsDto> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/categories/${id}`);
};

export const getCategoryQueryOptions = (options: GetCategoryOptions) => {
  return queryOptions({
    queryKey: ["categories", options.id],
    queryFn: () => {
      const apiResponse = getCategory(options);
      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCategory = ({ id, queryConfig }: UseCategoryOptions) => {
  return useQuery({
    ...getCategoryQueryOptions({ id }),
    ...queryConfig,
  });
};
