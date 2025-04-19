import { Heart } from "lucide-react";
import { FC } from "react";

const ProductCard: FC = () => {
  return (
    <div className="flex flex-col group cursor-pointer w-full">
      <div className="relative flex border-3 rounded-sm border-transparent hover:border-slate-200/35 bg-accent/10 items-center w-full h-[355px] overflow-hidden">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.H6W_BNVmOmlBjMGwNXtdpgHaHa&pid=Api"
          className="m-auto"
          alt="Super Watch"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-6 w-6 text-rose-500 fill-white hover:fill-rose-500 transition-colors" />
        </div>
      </div>
      <div className="px-1">
        <p className="truncate">Nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
        <p>Star</p>
        <p>Price</p>
      </div>
    </div>
  );
};

export default ProductCard;
