"use client";

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
import ProductCardList from "@/features/product/components/product-card-list";

// Sample categories - replace with your actual data
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Books" },
  { id: 5, name: "Toys" },
];

// Remove the isFeatured field from the schema
const formSchema = z
  .object({
    name: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    orderBy: z.string().optional(),
    sortBy: z.string().optional(),
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

export default function SearchProductPage() {
  // Update the defaultValues to remove isFeatured
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      minPrice: undefined,
      maxPrice: undefined,
      orderBy: "",
      sortBy: "",
      categoryIds: [],
    },
  });

  const filter: ProductFilter = {
    // TODO: Remember to add this
    sortBy: "createdOn",
    orderBy: "desc",
  };

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert the form values to match ProductFilter type
    const filter: ProductFilter = {
      ...values,
      categoryIds: values.categoryIds?.length ? values.categoryIds : undefined,
    };

    console.info("Filter values:", filter);
  }

  return (
    <div className="min-h-svh py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
        </div>

        {/* Filter section */}
        <div className="p-6 mb-1">
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
                            field.value?.length
                              ? String(field.value[0])
                              : undefined
                          }
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
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
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
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Order By - column 3, row 2 */}
                <div className="col-start-3 row-start-2">
                  <FormField
                    control={form.control}
                    name="orderBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order By</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="price">Price</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
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
                    name="sortBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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

              <div className="flex justify-end">
                <Button type="submit" className="">
                  Apply Filters
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <ProductCardList filter={filter} />
      </div>
    </div>
  );
}
