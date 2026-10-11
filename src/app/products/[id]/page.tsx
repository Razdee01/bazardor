import { Product } from "@/type/Type";



const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    { next: { revalidate: 60 } },
  );
  const product: Product = await res.json();

  const diffFromYesterday = product.today - product.yesterday;

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-5 text-sm text-gray-500">
          হোম &gt; {product.categoryNameBn} &gt;{" "}
          <span className="text-gray-800">{product.nameBn}</span>
        </div>

        {/* Product Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500">
                প্রতি {product.unit} • {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                বাজারের তুলনায় আজকের দাম{" "}
                {diffFromYesterday > 0
                  ? "বেড়েছে"
                  : diffFromYesterday < 0
                    ? "কমেছে"
                    : "অপরিবর্তিত"}{" "}
                - {Math.abs(diffFromYesterday)} টাকা
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">
              {product.today}
              <span className="ml-1 text-base font-medium text-gray-600">
                টাকা / {product.unit}
              </span>
            </p>
            <div
              className={`mt-1 flex items-center justify-end gap-1 text-sm font-medium ${
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

        {/* Price Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">গতকালের দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {product.yesterday} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              আজকের দাম থেকে {Math.abs(diffFromYesterday)} টাকা{" "}
              {diffFromYesterday > 0 ? "কম" : "বেশি"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">গত সপ্তাহের দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-500">
              {product.lastWeek} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              আজকের দাম থেকে {Math.abs(product.today - product.lastWeek)} টাকা{" "}
              {product.today > product.lastWeek ? "বেশি" : "কম"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">গত মাসের দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {product.lastMonth} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              আজকের দাম থেকে {Math.abs(product.today - product.lastMonth)} টাকা{" "}
              {product.today > product.lastMonth ? "বেশি" : "কম"}
            </p>
          </div>
        </div>

        {/* Markets Table */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="pb-3 font-medium">বাজার</th>
                  <th className="pb-3 font-medium">বিভাগ</th>
                  <th className="pb-3 font-medium">সর্বনিম্ন</th>
                  <th className="pb-3 font-medium">সর্বোচ্চ</th>
                  <th className="pb-3 font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((item, index) => {
                  const avg = ((item.min + item.max) / 2).toFixed(1);
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-3 font-medium text-gray-800">
                        {item.market}
                      </td>
                      <td className="py-3 text-gray-600">{item.division}</td>
                      <td className="py-3 text-gray-600">{item.min} টাকা</td>
                      <td className="py-3 text-gray-600">{item.max} টাকা</td>
                      <td className="py-3 font-medium text-gray-800">
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
