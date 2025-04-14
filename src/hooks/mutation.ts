import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";


export const create = ({
  userId,
}: {  // Declare the parameter type directly without adding an extra type for this API
  userId: number;
}): Promise<void> => {
  return api.post("/api/v1/products", { userId });
};

// Add a mutationConfig so that we can provide onSuccess callback to the hook
type Options = {
  mutationConfig?: MutationConfig<typeof create>;
};

export const useX = ({
  mutationConfig
}: Options = {}) => {

  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: create,
    onError: (error) => {
      console.log("Error in useCreateFriendInvitation " + error);
    },
    ...restConfig,
    onSuccess: (...args) => {
      //queryClient.invalidateQueries();
      onSuccess?.(...args)
    },
  });
};
