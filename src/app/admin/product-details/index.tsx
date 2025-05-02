import { FC } from "react";
import { RequestFail } from "@/components/error/error-message";
import { LoadingBlock } from "@/components/loading/loading-block";
import { useParams } from "react-router-dom";
import { useProduct } from "@/features/product/api/get-product";
import { InformationSection } from "./information-section";
import { ImageSection } from "./image-section";

export const AdminProductDetails: FC = () => {
  const { id } = useParams();
  const productQuery = useProduct({ id });

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
    <div>
      <InformationSection product={productQuery.data} />
      <ImageSection product={productQuery.data} />
    </div>
  );
};
