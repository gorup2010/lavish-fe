import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { ProductFilter } from "@/types/api";
import { useCategories } from "@/features/category/api/get-categories";
import { LoadingBlock } from "@/components/loading/loading-block";
import { RequestFail } from "@/components/error/error-message";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

// Remove the isFeatured field from the schema
const formSchema = z
  .object({
    name: z.string().trim().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
    categoryIds: z.array(z.number()).optional(),
  })
  .refine(
    (data) => {
      // Skip validation if either price is not provided
      if (data.minPrice === undefined || data.maxPrice === undefined) {
        return true;
      }
      return data.minPrice < data.maxPrice;
    },
    {
      message: "Minimum price must be less than maximum price",
      path: ["minPrice"],
    }
  );

const defaultFilter = {
  name: "",
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: "createdOn",
  sortOrder: "desc",
  categoryIds: [],
};

interface ProductFilterSectionProps {
  filter: ProductFilter;
}

const ProductFilterSection: FC<ProductFilterSectionProps> = ({ filter }) => {
  const navigate = useNavigate();
  // Update the defaultValues to remove isFeatured
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultFilter,
      ...filter,
    },
  });

  const categoriesQuery = useCategories({});

  useEffect(() => {
    form.reset({
      ...defaultFilter,
      ...filter,
    });
  }, [filter, form]);

  if (categoriesQuery.isLoading) return <LoadingBlock />;

  if (categoriesQuery.isError)
    return (
      <RequestFail
        retryRequest={categoriesQuery.refetch}
        error={categoriesQuery.error}
      />
    );

  const categories = categoriesQuery.data;

  if (!categories || categories.length === 0) return <div>No data</div>;

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert the form values to match ProductFilter type
    const filter: ProductFilter = {
      ...values,
      categoryIds: values.categoryIds?.length ? values.categoryIds : undefined,
    };
    navigate(`/search?${qs.stringify(filter, { arrayFormat: "repeat" })}`);
  }

  return (
    <div className="py-6 px-20 mb-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-4">
            {/* Product Name - spans 2 columns in row 1 */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Search by name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category - spans 2 columns, starts at column 3 in row 1 */}
            <div className="col-span-2 col-start-3 row-start-1">
              <FormField
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange([Number.parseInt(value)])
                      }
                      defaultValue={
                        field.value?.length ? String(field.value[0]) : undefined
                      }
                      value={field.value?.length ? String(field.value[0]) : ""}
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
                            value={String(category.id)}
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

            {/* Min Price - column 1, row 2 */}
            <div className="col-start-1 row-start-2">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Max Price - column 2, row 2 */}
            <div className="col-start-2 row-start-2">
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sort By - column 3, row 2 */}
            <div className="col-start-3 row-start-2">
              <FormField
                control={form.control}
                name="sortBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort By</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="createdOn">Date</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sort Order - column 4, row 2 */}
            <div className="col-start-4 row-start-2">
              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-1.5">
            <Button type="reset" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductFilterSection;
