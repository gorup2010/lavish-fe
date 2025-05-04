import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/star-rating";
import { formatVND } from "@/lib/utils";
import { ProductCardDto } from "@/types/api";
import { ShoppingBag } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductCardDto;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, rating, thumbnailImg } = product;

  return (
    <div className="flex flex-col group cursor-pointer w-full">
      <div className="relative flex border-3 rounded-sm border-transparent hover:border-slate-200/35 bg-accent/10 items-center w-full h-[355px] overflow-hidden">
        <Link to={`/products/${id}`} className="w-full h-full flex items-center justify-center">
          <img src={thumbnailImg} className="w-full aspect-square object-cover" alt="Super Watch" />
        </Link>
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            Add to cart
          </Button>
        </div>
      </div>
      <div className="relative px-1 space-y-2.5">
        <Link to={`/products/${id}`} className="truncate text-xl font-bold">
          {name}
        </Link>
        <StarRating value={rating} readOnly={true} />
        <p className="font-semibold text-lg">{formatVND(price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
