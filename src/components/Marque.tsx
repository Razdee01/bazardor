import { Product } from "@/type/Type";
import Marquee from "react-fast-marquee";

const Marque = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();

  return (
    <div className="mt-4">
      <Marquee speed={80}>
        {data.slice(0, 10).map((d :Product) => (
          <div className="ml-10 flex items-center gap-1.5" key={d.id}>
            <span>{d.nameBn}</span>
            <span className="font-medium">{d.today.toLocaleString("bn-BD")} টাকা</span>
            <span className="text-sm text-gray-500">/{d.unit === "kg" ? "কেজি" : d.unit}</span>

            {d.change && (
              <span
                className={`text-sm font-medium ${
                  d.change.dir === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {d.change.dir === "up" ? "↑" : "↓"} {d.change.pct.toLocaleString("bn-BD")}%
              </span>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Marque;