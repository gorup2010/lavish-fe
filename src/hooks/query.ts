import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getsomething = () => {
  return api.get("/test");
};

// Use this way you can get the queryKey in other hook to invalidate the query.
export const getFriendsInvitationQueryOptions = () => {
  return queryOptions({
    queryKey: ["test"],
    queryFn: async () => {
      const apiResponse = await getsomething();

      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// You can import and use it by:
// const somethingsQuery = usesomethings 
export const useSomethings = () => {
  return useQuery({
    ...getFriendsInvitationQueryOptions()
  });
};

