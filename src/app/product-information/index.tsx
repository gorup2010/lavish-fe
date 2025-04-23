import { RequestFail } from "@/components/error/error-message";
import { LoadingBlock } from "@/components/loading/loading-block";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StarRating from "@/components/ui/star-rating";
import { useProduct } from "@/features/product/api/get-product";
import { formatVND } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductInformationPage() {
  const { id } = useParams();
  const productQuery = useProduct({ id });

  // State for tracking the current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Set up carousel API event listener
  useEffect(() => {
    if (!carouselApi) return;

    const onChange = (api: CarouselApi) => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    carouselApi.on("select", onChange);

    // Get initial position
    setCurrentSlide(carouselApi.selectedScrollSnap());

    return () => {
      carouselApi.off("select", onChange);
    };
  }, [carouselApi]);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
    setCurrentSlide(index);
  };

  if (productQuery.isLoading) return <LoadingBlock />;

  if (productQuery.isError)
    return (
      <RequestFail
        retryRequest={productQuery.refetch}
        error={productQuery.error}
      />
    );

  const product = productQuery.data ?? {
    id: 0,
    name: "Something wrong",
    price: 0,
    rating: 0,
    description: "",
    thumbnailImg: "",
    isFeatured: false,
    quantity: 0,
    categories: [],
    images: [],
  };

  const imagesInPage = [
    { id: 0, url: product.thumbnailImg, type: "image" },
    ...product.images,
  ];

  return (
    <div className="min-h-svh">
      <div className="h-20" />
      <div>
        {/* Desktop layout */}
        <div className="hidden md:flex px-4 lg:px-28">
          <div className="space-y-2 flex-shrink-0">
            {imagesInPage.map((image, index) => (
              <img
                src={image.url}
                key={image.id}
                alt={"img-" + image.id}
                className={`size-15 cursor-pointer transition-all ${
                  currentSlide === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-80"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <div className="relative mx-24 flex-1">
            <Carousel setApi={setCarouselApi}>
              <CarouselContent className="aspect-square">
                {imagesInPage.map((image) => (
                  <CarouselItem key={image.id} className="overflow-hidden">
                    <img
                      src={image.url}
                      alt={"img-" + image.id}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="size-14 -left-16" />
              <CarouselNext className="size-14 -right-16" />
            </Carousel>
          </div>
          <div className="flex-1">
            <div className="text-5xl font-bold mb-4">{product.name}</div>
            <div className="text-2xl font-medium mt-2">
              {formatVND(product.price)}
            </div>
            <div className="flex flex-row items-center gap-4 mt-4">
              <StarRating value={product.rating} readOnly={true} />
              <p className="text-lg">({product.rating})</p>
            </div>
            <div className="mt-6">
              <p className="text-lg text-gray-700 font-sans">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="">COMMENT SECTION</div>
    </div>
  );
}

export default ProductInformationPage;
