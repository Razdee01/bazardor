import { Product } from "@/type/Type";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
  );
  const product: Product = await res.json();

  const diffFromYesterday = product.today - product.yesterday;
  const diffFromLastWeek = product.today - product.lastWeek;

  // Calculate overall lowest and highest prices from markets array
  const allMinPrices = product.markets.map((m) => m.min);
  const allMaxPrices = product.markets.map((m) => m.max);
  const lowestMarketPrice = Math.min(...allMinPrices);
  const highestMarketPrice = Math.max(...allMaxPrices);
  const avaragePrice = (highestMarketPrice + lowestMarketPrice) / 2;

  return (
    <div className="min-h-screen bg-[#F4F6F9] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-500">
          হোম &gt; {product.categoryNameBn} &gt;{" "}
          <span className="text-gray-800">{product.nameBn}</span>
        </div>

        {/* ========== Product Header ========== */}
        <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500">
                প্রতি কেজি - {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                গতকালের তুলনার আজ দাম{" "}
                {diffFromYesterday > 0
                  ? "বেড়েছে"
                  : diffFromYesterday < 0
                    ? "কমেছে"
                    : "অপরিবর্তিত"}{" "}
                - {Math.abs(diffFromYesterday)} টাকা
              </p>
            </div>
          </div>

          {/* Price Box (right side) */}
          <div className=" flex flex-col  items-center rounded-xl border border-gray-100 bg-gray-50 px-5 py-3 text-right">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900">
              {product.today}
              <span className="ml-1 text-sm font-medium text-gray-600">
                টাকা / কেজি
              </span>
            </p>
            <div
              className={`mt-0.5 flex items-center justify-end gap-1 text-sm font-medium ${
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

        {/* ========== Price Summary Cards (দামের সারসংক্ষেপ) ========== */}
        <div className="mb-6">
          <h2 className="mb-3 text-base font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Lowest Price Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-600">
                {lowestMarketPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-400">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Highest Price Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-2xl font-bold text-red-500">
                {highestMarketPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-400">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Last Week Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {avaragePrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-400">প্রতি কেজি-র হিসাব</p>
            </div>
          </div>
        </div>

        {/* ========== Markets Table ========== */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-semibold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="pb-3 font-medium">বাজার</th>
                  <th className="pb-3 font-medium">বিভাগ</th>
                  <th className="pb-3 font-medium">সর্বনিম্ন</th>
                  <th className="pb-3 font-medium">সর্বোচ্চ</th>
                  <th className="pb-3 font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((item, index) => {
                  const avg = ((item.min + item.max) / 2).toLocaleString(
                    "bn-BD",
                    {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    },
                  );
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-3.5 font-medium text-gray-800">
                        {item.market}
                      </td>
                      <td className="py-3.5 text-gray-600">{item.division}</td>
                      <td className="py-3.5 text-gray-600">
                        {item.min.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="py-3.5 text-gray-600">
                        {item.max.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="py-3.5 font-medium text-gray-800">
                        {avg} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
