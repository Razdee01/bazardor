import { Product } from "@/type/Type";
import { FaArrowUp } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-2xl border border-[#DFE8E0] bg-[#FAFCFA] p-3 sm:p-4">
      {/* Product Information */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#202B23]">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-[#303A32]">
            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
          </p>
        </div>
      </div>

      {/* Price Information */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-[#303A32]">
            আজকের দাম
          </p>

          <p className="mt-1 text-lg font-bold text-[#202B23]">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <div className="mb-0.5 flex shrink-0 items-center gap-1 rounded-full bg-[#F0F5F0] px-2 py-1 text-[10px] font-semibold text-red-600">
          <FaArrowUp className="text-[9px]" />

          <span>
            {product.change?.pct.toLocaleString("bn-BD")}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;