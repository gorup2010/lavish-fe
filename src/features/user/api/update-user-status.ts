import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { UpdateUserStatusDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUserQueryOptions } from "./get-user";

type Options = {
  mutationConfig?: MutationConfig<typeof updateUserStatus>;
};

export const updateUserStatus = (
  updateUser: UpdateUserStatusDto
): Promise<void> => {
  const { id, ...body } = updateUser;

  return api.patch(`${import.meta.env.VITE_BASE_URL}/users/${id}/is-active`, body);
};

export const useUpdateUserStatus = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateUserStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions({ id: args[1].id.toString() }).queryKey,
      });
      toast.success("User status updated successfully");
      onSuccess?.(...args);
    },
  });
};
