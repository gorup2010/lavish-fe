import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StarRatingBasic from "@/components/ui/star-rating";
import { useState } from "react";

function ProductInformationPage() {
  const [rating, setRating] = useState(3);
  return (
    <div className="min-h-svh">
      <nav className="h-20 flex items-center justify-center">
        <Breadcrumb>
          <BreadcrumbList className="text-[16px]">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <div>
        {/* Mobile layout (stacked) */}
        <div className="flex flex-col md:hidden gap-6 px-4">
          <div className="w-full">
            <Carousel>
              <CarouselContent className="w-full aspect-square">
                <CarouselItem className="overflow-hidden">
                  <img
                    src="https://picsum.photos/400/400"
                    alt="Product image"
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
                <CarouselItem className="overflow-hidden">
                  <img
                    src="https://picsum.photos/400/400"
                    alt="Product image"
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            <img
              src="https://picsum.photos/400/400"
              alt="Thumbnail"
              className="w-14 h-14 opacity-80 hover:opacity-100 cursor-pointer"
            />
            <img
              src="https://picsum.photos/800/800"
              alt="Thumbnail"
              className="w-14 h-14 opacity-80 hover:opacity-100 cursor-pointer"
            />
          </div>
          <div className="w-full">
            <div className="text-xl font-bold">NAME</div>
            <div className="text-lg font-semibold">Price</div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex px-4 lg:px-28">
          <div className="space-y-2 flex-shrink-0">
            <img
              src="https://picsum.photos/800/800"
              className="opacity-80 hover:opacity-100 size-15"
            />
          </div>
          <div className="relative mx-24 flex-1">
            <Carousel>
              <CarouselContent className="aspect-square">
                {/**TODO: revisit */}
                <CarouselItem className="overflow-hidden">
                  <img
                    src="https://picsum.photos/400/900"
                    className="w-full h-full object-cover" // TODO: revisit
                  />
                </CarouselItem>
                <CarouselItem className="overflow-hidden">
                  <img
                    src="https://picsum.photos/400/400"
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="size-14 -left-16" />
              <CarouselNext className="size-14 -right-16" />
            </Carousel>
          </div>
          <div className="flex-1">
            <div className="text-5xl font-bold mb-4">320.000đ</div>
            <div className="text-2xl font-medium mt-2">
              Đồng Hồ Rolex Datejust 31 178273 Mặt Số Xanh Lá Cọc La Mã
            </div>
            <div className="flex flex-row items-center gap-4 mt-4">
              <StarRatingBasic
                value={rating}
                onChange={setRating}
                maxStars={5}
              />
              <p className="text-lg">({rating})</p>
            </div>
            <div className="mt-6">
              <p className="text-lg text-gray-700 font-sans">
                Product description and details would go here. This section will
                grow with content while maintaining equal width with the
                carousel.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>COMMENT SECTION</div>
    </div>
  );
}

export default ProductInformationPage;
