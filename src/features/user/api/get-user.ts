import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { UserDetailsDto } from "@/types/api";

type UseUserOptions = {
  id: string | undefined;
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

type GetUserOptions = Omit<UseUserOptions, "queryConfig">;

export const getUser = ({
  id,
}: GetUserOptions): Promise<UserDetailsDto> => {
  return api.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`);
};

export const getUserQueryOptions = (options: GetUserOptions) => {
  return queryOptions({
    queryKey: ["users", options.id],
    queryFn: () => {
      const apiResponse = getUser(options);
      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useUser = ({ id, queryConfig }: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions({ id }),
    ...queryConfig,
  });
};
