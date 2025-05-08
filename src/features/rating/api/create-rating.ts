import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { CreateRatingDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getInfiniteRatingsQueryOptions } from "./get-ratings";

type Options = {
  mutationConfig?: MutationConfig<typeof createRating>;
};

export const createRating = (rating: CreateRatingDto): Promise<void> => {
  return api.post(`${import.meta.env.VITE_BASE_URL}/ratings`, rating);
};

export const useCreateRating = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createRating,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteRatingsQueryOptions({
          productId: args[1].productId,
        }).queryKey,
      });
      onSuccess?.(...args);
    },
  });
};
