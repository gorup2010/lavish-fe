import type React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCategories } from "@/features/category/api/get-categories";
import { LoadingBlock } from "@/components/loading/loading-block";
import { RequestFail } from "@/components/error/error-message";

export const CategoryList: React.FC = () => {
  const categoriesQuery = useCategories({});

  if (categoriesQuery.isLoading) return <LoadingBlock />;

  if (categoriesQuery.isError) return <RequestFail retryRequest={categoriesQuery.refetch} error={categoriesQuery.error} />;

  const categories = categoriesQuery.data;

  if (!categories || categories.length === 0) return <div>No data</div>;

  return (
    <div className="grid grid-cols-5 gap-2">
      {categories.map((category) => (
        <DropdownMenuItem
          key={category.id}
          className="p-0 focus:bg-transparent"
        >
          <div className="w-full cursor-pointer rounded-md overflow-hidden hover:opacity-90 transition-opacity">
            <div
              className="relative aspect-square w-full"
              style={{
                backgroundImage: `url(${category.thumbnailImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {category.name}
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      ))}
    </div>
  );
};
