import { DeleteImageDto, FileImageDto, ProductDetailsDto } from "@/types/api";
import { FC } from "react";
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";

interface ImageSectionProps {
  product: ProductDetailsDto;
  addImageMutation: UseMutationResult<void, Error, FileImageDto, unknown>;
  deleteImageMutation: UseMutationResult<void, Error, DeleteImageDto, unknown>;
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

const fileSchema = z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
  message: `Max file size is 5MB.`,
}).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
  message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
});

export const ImageSection: FC<ImageSectionProps> = ({
  product,
  addImageMutation,
  deleteImageMutation,
  updateThumbnailMutation,
}) => {
  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const parsedFile = await fileSchema.safeParseAsync(files[0]);
      if (!parsedFile.success) {
        toast.error(parsedFile.error.message);
        return;
      };
      addImageMutation.mutate({ id: product.id, image: files[0]});
    }
  };

  const handleDeleteImage = (imageId: number) => {
    deleteImageMutation.mutate({ productId: product.id, imageId: imageId });
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
      };
      updateThumbnailMutation.mutate({ id: product.id, image: files[0] });
    }
  };

  return (
    <div className="flex">
      {/* Thumbnail Field */}
      <div className="w-2/6 p-2">
        <Label className="mb-4">Thumbnail</Label>
        {product.thumbnailImg !== undefined ? (
          <div className="w-full relative group">
            <img
              src={product.thumbnailImg}
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
                  />
                  {" "}
                  Change
                </label>
              </Button>
            </div>
          </div>
        ) : (
          <div>WHAT!? NO THUMBNAIL?</div>
        )}
      </div>

      {/* Images Field */}
      <div className="h-full p-2 w-3/4">
        <Label className="mb-4">Images</Label>
        <div className="flex gap-4">
          {product.images?.map((image, index) => (
            <div key={image.id + index} className="relative group w-1/3">
              <img
                src={image.url}
                alt={"img" + index}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {product.images?.length !== undefined &&
            product.images.length < 2 && (
              <label className="w-1/3 flex flex-col items-center justify-center aspect-square border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <CloudUpload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                <div>Add new image</div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleAddImage}
                />
              </label>
            )}
          <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
