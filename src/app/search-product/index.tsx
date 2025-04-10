import ProductCard from "../../features/product/components/product-card";

function SearchProductPage() {
  return (
    <div className="flex items-center justify-center min-h-svh lg:grid-cols-2">
      <div>
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default SearchProductPage;
