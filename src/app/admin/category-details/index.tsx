import { RequestFail } from "@/components/error/error-message";
import { LoadingBlock } from "@/components/loading/loading-block";
import { useCategory } from "@/features/category/api/get-category";
import { useUpdateCategory } from "@/features/category/api/update-category";
import { useUpdateThumbnail } from "@/features/category/api/update-thumbnail";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { DetailsSection } from "./details-section";
import { FC } from "react";
import { useDeleteCategory } from "@/features/category/api/delete-category";

export const AdminCategoryDetails: FC = () => {
  const { id } = useParams();
  const categoryQuery = useCategory({ id });
  const updateCategoryMutation = useUpdateCategory();
  const updateThumbnailMutation = useUpdateThumbnail();
  const deleteCategoryMutation = useDeleteCategory();

  const isPending =
    updateCategoryMutation.isPending ||
    updateThumbnailMutation.isPending ||
    deleteCategoryMutation.isPending;

  if (categoryQuery.isLoading) return <LoadingBlock />;

  if (categoryQuery.isError)
    return (
      <RequestFail
        retryRequest={categoryQuery.refetch}
        error={categoryQuery.error}
      />
    );

  if (categoryQuery.data === undefined) return <div>No data</div>;

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
      <DetailsSection
        category={categoryQuery.data}
        updateCategoryMutation={updateCategoryMutation}
        updateThumbnailMutation={updateThumbnailMutation}
        deleteMutation={deleteCategoryMutation}
      />
    </div>
  );
};
