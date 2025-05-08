import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/features/category/api/get-categories";
import ReturnIcon from "@/components/ui/return-icon";
import {
  DeleteProductDto,
  ProductDetailsDto,
  UpdateDetailsProductDto,
} from "@/types/api";
import _ from "lodash";
import { UseMutationResult } from "@tanstack/react-query";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { deleteProduct } from "@/features/product/api/delete-product";

interface InformationSectionProps {
  product: ProductDetailsDto;
  updateProductMutation: UseMutationResult<
    void,
    Error,
    UpdateDetailsProductDto,
    unknown
  >;
  deleteMutation: UseMutationResult<void, Error, DeleteProductDto, unknown>;
}

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(200).trim(),
  price: z.number().min(1),
  description: z.string().min(1).max(255).trim(),
  isFeatured: z.boolean(),
  categoryId: z.number(),
  quantity: z.number().min(0),
});

export const InformationSection: FC<InformationSectionProps> = ({
  product,
  updateProductMutation,
  deleteMutation,
}) => {
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const initialValues = useMemo(
    () => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      isFeatured: product.isFeatured,
      categoryId: product.categories.length > 0 ? product.categories[0].id : 0,
      quantity: product.quantity,
    }),
    [product]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isEditable) {
      if (!_.isEqual(data, initialValues)) {
        setShowUpdateConfirm(true);
      } else {
        setIsEditable(false);
      }
    } else {
      setIsEditable(true);
    }
  };

  const onDelete = () => {
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirm = () => {
    deleteMutation.mutate({ id: product.id });
    setShowDeleteConfirm(false);
  }

  const onUpdateConfirm = () => {
    updateProductMutation.mutate(form.getValues() as UpdateDetailsProductDto);
    setShowUpdateConfirm(false);
    setIsEditable(false);
  };

  const categoriesQuery = useCategories({});
  const categories = categoriesQuery.data ?? product.categories;

  return (
    <div className="container mx-auto py-6">
      <ReturnIcon />
      <h1 className="text-3xl font-bold mb-10 mt-4">Product Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
            <Button type="submit" className="text-md">
              {isEditable ? "Confirm" : "Change"}
            </Button>
          </div>
          <div className="grid grid-cols-4 grid-rows-5 gap-4">
            {/* Name Field */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product name"
                        {...field}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description Field */}
            <div className="col-span-2 row-span-4 col-start-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="h-fit">Description</FormLabel>
                    <FormControl className="flex-grow">
                      <Textarea
                        placeholder="Product description"
                        className="max-h-[200px] resize-none"
                        {...field}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Field */}
            <div className="col-span-2 row-start-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(Number.parseInt(value))
                      }
                      defaultValue={field.value?.toString()}
                      disabled={!isEditable}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Price Field */}
            <div className="row-start-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="1"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            ? Math.max(1, Number(e.target.value))
                            : 1;
                          field.onChange(value);
                        }}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Is Featured Field */}
            <div className="row-start-4">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Product</FormLabel>
                      <FormDescription>
                        Display this product on the homepage
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity Field */}
            <div className="row-start-3">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="1"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            ? Math.max(0, Number(e.target.value))
                            : 0;
                          field.onChange(value);
                        }}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <ConfirmDialog
        showConfirmDialog={showUpdateConfirm}
        setShowConfirmDialog={setShowUpdateConfirm}
        handleConfirm={onUpdateConfirm}
      />
      <ConfirmDialog
        showConfirmDialog={showDeleteConfirm}
        setShowConfirmDialog={setShowDeleteConfirm}
        handleConfirm={onDeleteConfirm}
      />
    </div>
  );
};
