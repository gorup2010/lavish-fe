import ProductCardList from "@/features/product/components/product-card-list";
import ProductFilterSection from "@/features/product/components/product-filter";
import { useLocation } from "react-router-dom";
import qs from "qs";

export default function SearchProductPage() {
  const location = useLocation();
  const parseParams = qs.parse(location.search.slice(1));
  const filter = {
    name: parseParams.name?.toString(),
    minPrice: parseParams.minPrice
      ? Number.parseInt(parseParams.minPrice.toString())
      : undefined,
    maxPrice: parseParams.maxPrice
      ? Number.parseInt(parseParams.maxPrice.toString())
      : undefined,
    sortBy: parseParams.sortBy?.toString() || "createdOn",
    sortOrder: parseParams.sortOrder?.toString() || "desc",
    categoryIds: parseParams.categoryIds
      ? parseParams.categoryIds.toString().split(",").map(Number)
      : [],
  };

  return (
    <div className="min-h-svh py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
        </div>

        {/* Filter section */}
        <ProductFilterSection
          filter={{
            ...filter,
          }}
        />

        <ProductCardList
          filter={{
            ...filter,
          }}
        />
      </div>
    </div>
  );
}
