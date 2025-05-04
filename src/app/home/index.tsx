import { Button } from "@/components/ui/button";
import ProductCardList from "@/features/product/components/product-card-list";
import { ProductFilter } from "@/types/api";
import { Link } from "react-router-dom";

function HomePage() {
  const images = [
    "https://images8.alphacoders.com/403/thumb-1920-403604.jpg",
    "https://images8.alphacoders.com/463/thumb-1920-463381.jpg",
    "https://images7.alphacoders.com/411/thumb-1920-411245.jpg",
    "https://tse2.mm.bing.net/th?id=OIP.H6W_BNVmOmlBjMGwNXtdpgHaHa&pid=Api",
  ];

  const filter: ProductFilter = {
    // TODO: Remember to add this
    sortBy: "createdOn",
    sortOrder: "desc",
  };

  return (
    <div className="min-h-svh">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Luxury timepiece"
            className="object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="block">Your Time, Your Style</span>
            <span className="block mt-2">Exceptional Watches</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Browse Our Diverse Collection of Fine Watches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              <Link to="/search">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each timepiece represents the pinnacle of horological excellence,
              combining precision engineering with exquisite design.
            </p>
          </div>

          <ProductCardList filter={filter} />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
