import { FC } from "react";
import ProductCard from "./product-card";
import { ProductFilter } from "@/types/api";
import { useInfiniteProducts } from "../api/get-products";
import { LoadingBlock } from "@/components/loading/loading-block";
import { RequestFail } from "@/components/error/error-message";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProductCardListProps {
  filter: ProductFilter;
}

const ProductCardList: FC<ProductCardListProps> = ({ filter }) => {
  const productsQuery = useInfiniteProducts({ filter });
  console.log(productsQuery.data);
  console.log(productsQuery.error);
  if (productsQuery.isLoading) return <LoadingBlock />;

  if (productsQuery.isError) return <RequestFail retryRequest={productsQuery.refetch} error={productsQuery.error} />;

  const products = productsQuery.data?.pages.flatMap((page) => page.data);
  
  if (products === undefined || products?.length === 0)
    return <div>No data</div>;

  return (
    <>
      <div className="grid md:grid-cols-4 gap-10 px-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {productsQuery.hasNextPage && (
        <div className="flex items-center justify-center pt-18">
          <Button onClick={() => productsQuery.fetchNextPage()}>
            {productsQuery.isFetchingNextPage ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductCardList;
