import { FC, useEffect, useMemo, useState } from "react";
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
import ReturnIcon from "@/components/ui/return-icon";
import {
  CategoryDetailsDto,
  FileImageDto,
  UpdateDetailsCategoryDto,
} from "@/types/api";
import { UseMutationResult } from "@tanstack/react-query";
import _ from "lodash";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

interface DetailsSectionProps {
  category: CategoryDetailsDto;
  updateCategoryMutation: UseMutationResult<
    void,
    Error,
    UpdateDetailsCategoryDto,
    unknown
  >;
  updateThumbnailMutation: UseMutationResult<
    void,
    Error,
    FileImageDto,
    unknown
  >;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `Max file size is 5MB.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
  });

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(10).max(200).trim(),
  description: z.string().max(255).trim(),
});

export const DetailsSection: FC<DetailsSectionProps> = ({
  category,
  updateCategoryMutation,
  updateThumbnailMutation,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const initialValues = useMemo(
    () => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }),
    [category]
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
        updateCategoryMutation.mutate(data as UpdateDetailsCategoryDto);
      }
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const handleUpdateThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const parsedFile = await fileSchema.safeParseAsync(files[0]);
      if (!parsedFile.success) {
        toast.error(parsedFile.error.message);
        return;
      }
      updateThumbnailMutation.mutate({ id: category.id, image: files[0] });
    }
  };

  useEffect(() => {
    if (!isEditable) {
      form.reset(initialValues);
    }
  }, [isEditable, form, initialValues]);

  return (
    <div className="container mx-auto py-6">
      <ReturnIcon />
      <h1 className="text-3xl font-bold mb-10 mt-4">Add new category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <Button type="submit" className="text-md">
              {isEditable ? "Confirm" : "Change"}
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
                      <Input
                        placeholder="Category name"
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
                        disabled={!isEditable}
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
              <div className="w-2/3 p-2">
                <Label>Thumbnail</Label>
                {category.thumbnailImg !== undefined && (
                  <div className="w-full relative group">
                    <img
                      src={category.thumbnailImg}
                      alt="thumbnail"
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        className="bg-white/80 hover:bg-white"
                      >
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            multiple
                            onChange={handleUpdateThumbnail}
                          />{" "}
                          Change
                        </label>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
