import { FC, useState } from "react";
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
import { CircleX, CloudUpload, Loader2 } from "lucide-react";
import { useCategories } from "@/features/category/api/get-categories";
import { LoadingBlock } from "@/components/loading/loading-block";
import { RequestFail } from "@/components/error/error-message";
import ReturnIcon from "@/components/ui/return-icon";
import { useCreateProduct } from "@/features/product/api/create-product";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  price: z.number().min(1),
  description: z.string().min(1).max(255).trim(),
  thumbnailImg: z
    .instanceof(File, { message: "Thumbnail image is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Thumbnail image size must be less than 5MB.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message:
        "Only .jpg, .jpeg, .png and .webp formats are supported for the thumbnail.",
    }),
  isFeatured: z.boolean(),
  categoryId: z.number(),
  quantity: z.number().min(1),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Each image size must be less than 5MB.",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message:
            "Only .jpg, .jpeg, .png and .webp formats are supported for images.",
        })
    )
    .max(2)
    .optional(),
});

const defaultValues = {
  name: "",
  price: 1,
  description: "",
  thumbnailImg: undefined,
  isFeatured: false,
  categoryId: undefined,
  quantity: 1,
  images: [],
};

export const AddProductPage: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [imagesCount, setImagesCount] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const createProductMutation = useCreateProduct({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        setImagesCount(0);
      },
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setShowConfirm(true);
  };

  const onConfirm = () => {
    const data = form.getValues();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("isFeatured", data.isFeatured.toString());
    formData.append("categoryId", data.categoryId.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("thumbnailImg", data.thumbnailImg);
    data.images?.forEach((image) => formData.append("images", image));
    createProductMutation.mutate(formData);
    setShowConfirm(false);
  }

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isThumbnail: boolean
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (isThumbnail) {
        form.setValue("thumbnailImg", files[0]);
      } else {
        form.setValue("images", form.getValues("images")?.concat(files[0]));
      }
      setImagesCount((prev) => ++prev);
    }
  };

  const handleRemoveImage = (thumbnail: boolean, index: number) => {
    if (thumbnail) {
      form.setValue("thumbnailImg", undefined as unknown as File);
    } else {
      form.setValue(
        "images",
        form.getValues("images")?.filter((_, i) => i !== index)
      );
    }
    setImagesCount((prev) => --prev);
  };

  const categoriesQuery = useCategories({});

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

  return (
    <div className="relative container mx-auto py-6">
      {createProductMutation.isPending && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
      <ReturnIcon />
      <h1 className="text-3xl font-bold mb-10 mt-4">Add new product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <Button type="submit" className="text-md">
              Create
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
                      <Input placeholder="Product name" {...field} />
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
                          const value = e.target.value ? Math.max(1, Number(e.target.value)) : 1
                          field.onChange(value);
                        }}
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
                        min="1"
                        step="1"
                        placeholder="1"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value ? Math.max(1, Number(e.target.value)) : 1
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex">
            {/* Thumbnail Field */}
            <FormField
              name="thumbnailImg"
              control={form.control}
              render={({ field }) => (
                <div className="w-2/6 p-2">
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    {field.value !== undefined ? (
                      <div className="w-full relative group">
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="thumbnail"
                          className="w-full aspect-square object-cover"
                        />
                        <CircleX
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 fill-red-500 text-white"
                          onClick={() => handleRemoveImage(true, 0)}
                        />
                      </div>
                    ) : (
                      <label className="flex items-center justify-center aspect-square border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <CloudUpload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          multiple
                          onChange={(e) => handleImageChange(e, true)}
                        />
                      </label>
                    )}
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* Images Field */}
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <div className="h-full p-2 w-3/4">
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <div className="flex gap-4">
                      {field.value?.map((image, index) => (
                        <div
                          key={image.name + index}
                          className="relative group w-1/3"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={"img" + index}
                            className="w-full aspect-square object-cover"
                          />
                          <CircleX
                            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 fill-red-500 text-white"
                            onClick={() => handleRemoveImage(false, index)}
                          />
                        </div>
                      ))}
                      {field.value?.length !== undefined &&
                        field.value.length < 2 && (
                          <label className="w-1/3 flex items-center justify-center aspect-square border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <CloudUpload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple
                              onChange={(e) => handleImageChange(e, false)}
                            />
                          </label>
                        )}
                      <div className="w-1/3"></div>
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
        </form>
      </Form>

      {showConfirm && (
        <ConfirmDialog
          showConfirmDialog={showConfirm}
          setShowConfirmDialog={setShowConfirm}
          handleConfirm={onConfirm}
        />
      )}
    </div>
  );
};
