// import { PaginationResponse, ProductCardDto, ProductFilter } from "@/types/api";
// import { api } from "@/lib/api-client";
// import { queryOptions, useQuery } from "@tanstack/react-query";
// import { QueryConfig } from "@/lib/react-query";

// type UseProductsOptions = {
//   filter?: ProductFilter;
//   page?: number;
//   size?: number;
//   queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
// };

// type GetProductsOptions = Omit<UseProductsOptions, "queryConfig">;

// export const getProducts = ({
//   filter,
//   page = 1,
//   size = 12,
// }: GetProductsOptions): Promise<PaginationResponse<ProductCardDto>> => {
//   return api.get(`${import.meta.env.VITE_BASE_URL}/products`, {
//     params: {
//       page,
//       size,
//       ...filter,
//     },
//   });
// };

// export const getProductsQueryOptions = (options: GetProductsOptions) => {
//   const { page, size, filter } = options;
//   return queryOptions({
//     queryKey: ["products", filter, page, size],
//     queryFn: () => {
//       const apiResponse = getProducts(options);
//       return apiResponse;
//     },
//     refetchOnWindowFocus: false,
//     retry: false,
//   });
// };

// export const useProducts = ({
//   filter,
//   queryConfig,
//   page = 1,
//   size = 12,
// }: UseProductsOptions) => {
//   return useQuery({
//     ...getProductsQueryOptions({ filter, page, size }),
//     ...queryConfig,
//   });
// };
