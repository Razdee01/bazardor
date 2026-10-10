import Marquee from "react-fast-marquee";

const Marque = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();

  return (
    <div className="mt-4">
      <Marquee speed={80}>
        {data.slice(0, 10).map((d) => (
          <div className="ml-10 flex items-center gap-1.5" key={d.id}>
            <span>{d.nameBn}</span>
            <span className="font-medium">{d.today} taka</span>
            <span className="text-sm text-gray-500">/{d.unit}</span>

            {d.change && (
              <span
                className={`text-sm font-medium ${
                  d.change.dir === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {d.change.dir === "up" ? "↑" : "↓"} {d.change.pct}%
              </span>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Marque;