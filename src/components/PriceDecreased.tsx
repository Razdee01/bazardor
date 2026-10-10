import { Product } from "@/type/Type";
import ProductCard from "./ProductCard";
import { FaArrowDown} from "react-icons/fa";

const PriceDecreased = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  const data: Product[] = await res.json();

  const increased = data.filter(
    (item) => item.change?.dir === "down"
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-4 flex items-center gap-2">
        <FaArrowDown  className="text-sm text-green-600" />

        <h2 className="text-lg font-bold text-[#202B23] sm:text-xl">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {increased.slice(0,6).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default PriceDecreased;