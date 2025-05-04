import { FC } from "react";
import { RequestFail } from "@/components/error/error-message";
import { LoadingBlock } from "@/components/loading/loading-block";
import { useParams } from "react-router-dom";
import { useProduct } from "@/features/product/api/get-product";
import { InformationSection } from "./information-section";
import { ImageSection } from "./image-section";
import { Loader2 } from "lucide-react";
import { useUpdateProduct } from "@/features/product/api/update-product";
import { useAddImage } from "@/features/product/api/add-image";
import { useUpdateThumbnail } from "@/features/product/api/update-thumbnail";
import { useDeleteImage } from "@/features/product/api/delete-image";

export const AdminProductDetails: FC = () => {
  const { id } = useParams();
  const productQuery = useProduct({ id });
  const updateProductMutation = useUpdateProduct();
  const addImageMutation = useAddImage();
  const deleteImageMutation = useDeleteImage();
  const updateThumbnailMutation = useUpdateThumbnail();

  const isPending =
    updateProductMutation.isPending ||
    addImageMutation.isPending ||
    deleteImageMutation.isPending ||
    updateThumbnailMutation.isPending;

  if (productQuery.isLoading) return <LoadingBlock />;

  if (productQuery.isError)
    return (
      <RequestFail
        retryRequest={productQuery.refetch}
        error={productQuery.error}
      />
    );

  if (productQuery.data === undefined) return <div>No data</div>;

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
      <InformationSection
        product={productQuery.data}
        updateProductMutation={updateProductMutation}
      />
      <ImageSection
        product={productQuery.data}
        addImageMutation={addImageMutation}
        deleteImageMutation={deleteImageMutation}
        updateThumbnailMutation={updateThumbnailMutation}
      />
    </div>
  );
};
