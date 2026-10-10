import { Product } from "@/type/Type";
import ProductCard from "./ProductCard";
import { FaArrowUp } from "react-icons/fa";

const AllProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  const data: Product[] = await res.json();

  

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-4 flex flex-col  gap-2">
       

        <h2 className="text-lg font-bold text-[#202B23] sm:text-xl">
          সব পণ্য
        </h2>
         <p className="text-sm font-light text-grey-300">মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
      </div>
     

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {data.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;