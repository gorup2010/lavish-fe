import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { AddCartDto } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Options = {
  mutationConfig?: MutationConfig<typeof addCart>;
};

export const addCart = (dto: AddCartDto): Promise<void> => {
  return api.post(`${import.meta.env.VITE_BASE_URL}/carts/self`, dto);
};

export const useAddCart = ({ mutationConfig }: Options = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: addCart,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      toast.success("Add product to cart successfully");
      onSuccess?.(...args);
    },
  });
};
