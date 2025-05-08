import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, CloudUpload, Loader2 } from "lucide-react";
import ReturnIcon from "@/components/ui/return-icon";
import { useCreateCategory } from "@/features/category/api/create-category";
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
});

const defaultValues = {
  name: "",
  description: "",
  thumbnailImg: undefined,
};

export const AddCategoryPage: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [imagesCount, setImagesCount] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const createCategoryMutation = useCreateCategory({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
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
    formData.append("description", data.description);
    formData.append("thumbnailImg", data.thumbnailImg);
    createCategoryMutation.mutate(formData);
    setShowConfirm(false);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      form.setValue("thumbnailImg", files[0]);
      setImagesCount((prev) => ++prev);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("thumbnailImg", undefined as unknown as File);
    setImagesCount((prev) => --prev);
  };

  return (
    <div className="relative container mx-auto py-6">
      {createCategoryMutation.isPending && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
      <ReturnIcon />
      <h1 className="text-3xl font-bold mb-10 mt-4">Add new category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <Button type="submit" className="text-md">
              Create
            </Button>
          </div>
          <div className="grid grid-cols-2 grid-rows-4 gap-4">
            {/* Name Field */}
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description Field */}
            <div className="row-span-3 col-start-1 row-start-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="h-fit">Description</FormLabel>
                    <FormControl className="flex-grow">
                      <Textarea
                        placeholder="Category description"
                        className="max-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Thumbnail Field */}
            <div className="row-span-4 col-start-2 row-start-1">
              <FormField
                name="thumbnailImg"
                control={form.control}
                render={({ field }) => (
                  <div className="w-2/3 p-2">
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
                            onClick={handleRemoveImage}
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
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
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
