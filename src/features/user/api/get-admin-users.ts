import { api } from "@/lib/api-client";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { PaginationResponse, UserFilter, UserInAdminDto } from "@/types/api";

type UseAdminUsersOptions = {
  filter: UserFilter;
  queryConfig?: QueryConfig<typeof getAdminUsersQueryOptions>;
};

type GetAdminUsersOptions = Omit<UseAdminUsersOptions, "queryConfig">;

export const getAdminUsers = ({
  filter,
}: GetAdminUsersOptions): Promise<PaginationResponse<UserInAdminDto>> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/admin/users`, {
    params: {
      ...filter,
    }
  });
};

export const getAdminUsersQueryOptions = (options: GetAdminUsersOptions) => {
  return queryOptions({
    queryKey: ["admin-users", options.filter],
    queryFn: () => {
      const apiResponse = getAdminUsers(options);
      return apiResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useAdminUsers = ({ filter, queryConfig }: UseAdminUsersOptions) => {
  return useQuery({
    ...getAdminUsersQueryOptions({ filter }),
    ...queryConfig,
  });
};
