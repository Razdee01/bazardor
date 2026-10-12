import { Product } from "@/type/Type";
import Link from "next/link";

const CategoriesPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string }>;
}) => {
  const { id } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${id}`,
    { next: { revalidate: 60 } },
  );
  const products: Product[] = await res.json();

  const categoryName = products[0]?.categoryNameBn || id;
  const categoryIcon = products[0]?.categoryIcon || "🍚";

  // Sorting logic based on query parameter
  const sortedProducts = [...products];
  if (sort === "high-to-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  } else if (sort === "low-to-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Category Header */}
        <div className="mb-5 flex items-center gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-sm text-gray-500">
              হাট গঞ্জের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort bar dropdown options */}
        <div className="mb-5 flex items-center justify-end rounded-xl bg-white px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>সাজান</span>
            <div className="relative group">
              <button className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 transition">
                {sort === "high-to-low"
                  ? "দাম: বেশি থেকে কম"
                  : sort === "low-to-high"
                    ? "দাম: কম থেকে বেশি"
                    : "ডিফল্ট"}{" "}
                ▾
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 hidden group-hover:flex flex-col w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-1 z-20 group-focus-within:flex">
                <Link
                  href={`/categories/${id}`}
                  className={`px-4 py-2 text-xs hover:bg-gray-50 text-gray-700 ${!sort ? "font-bold text-emerald-600 bg-gray-50" : ""}`}
                >
                  ডিফল্ট
                </Link>
                <Link
                  href={`/categories/${id}?sort=low-to-high`}
                  className={`px-4 py-2 text-xs hover:bg-gray-50 text-gray-700 ${sort === "low-to-high" ? "font-bold text-emerald-600 bg-gray-50" : ""}`}
                >
                  দাম: কম থেকে বেশি
                </Link>
                <Link
                  href={`/categories/${id}?sort=high-to-low`}
                  className={`px-4 py-2 text-xs hover:bg-gray-50 text-gray-700 ${sort === "high-to-low" ? "font-bold text-emerald-600 bg-gray-50" : ""}`}
                >
                  দাম: বেশি থেকে কম
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product count */}
        <p className="mb-4 text-sm text-gray-600">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl">
                  {product.image}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">
                  {product.today.toLocaleString("bn-BD")}
                  <span className="ml-1 text-base font-medium text-gray-600">
                    টাকা
                  </span>
                </p>

                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    product.change.dir === "up"
                      ? "text-red-500"
                      : product.change.dir === "down"
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {product.change.dir === "up" && <span>▲</span>}
                  {product.change.dir === "down" && <span>▼</span>}
                  {product.change.dir === "flat" && <span>—</span>}
                  <span>{Math.abs(product.change.pct).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
