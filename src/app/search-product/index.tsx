import ProductCardList from "@/features/product/components/product-card-list";
import ProductFilterSection from "@/features/product/components/product-filter";
import { useLocation } from "react-router-dom";
import qs from "qs";

export default function SearchProductPage() {
  const location = useLocation();
  const filter = qs.parse(location.search.slice(1));
  if (filter.categoryIds && !Array.isArray(filter.categoryIds)) {
    filter.categoryIds = [filter.categoryIds];
  }

  return (
    <div className="min-h-svh py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
        </div>

        {/* Filter section */}
        <ProductFilterSection
          filter={{
            sortBy: "createdOn",
            sortOrder: "desc",
            ...filter,
          }}
        />

        <ProductCardList
          filter={{
            sortBy: "createdOn",
            sortOrder: "desc",
            ...filter,
          }}
        />
      </div>
    </div>
  );
}
