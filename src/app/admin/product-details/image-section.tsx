import { ProductDetailsDto } from "@/types/api";
import { FC } from "react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";

interface ImageSectionProps {
  product: ProductDetailsDto;
}

export const ImageSection: FC<ImageSectionProps> = ({ product }) => {
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
          </div>
        ) : (
          <div>No thumbnail</div>
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
            </div>
          ))}
          {product.images?.length !== undefined &&
            product.images.length < 2 && (
              <label className="w-1/3 flex items-center justify-center aspect-square border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <CloudUpload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                />
              </label>
            )}
          <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
