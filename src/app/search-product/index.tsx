"use client";

import ProductCardList from "@/features/product/components/product-card-list";
import ProductFilterSection from "@/features/product/components/product-filter";
import { ProductFilter } from "@/types/api";
import { useState } from "react";

export default function SearchProductPage() {

  const [filter, setFilter] = useState<ProductFilter>({
    sortBy: "createdOn",
    sortOrder: "desc",
  });

  return (
    <div className="min-h-svh py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
        </div>

        {/* Filter section */}
        <ProductFilterSection setField={setFilter}/>

        <ProductCardList filter={filter} />
      </div>
    </div>
  );
}
