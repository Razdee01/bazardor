import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();
  console.log(data);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
;

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Top Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        {/* Logo and Website Name */}
        <div className="flex items-center gap-3 ">
          <Image
            src="/logo-icon.png"
            alt="Website logo"
            width={55}
            height={55}
            className="h-12 w-12 p-3 bg-[#05893E] rounded-2xl"
          />

          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Bazar Dor
            </h1>

            <p className="text-xs text-gray-500 sm:text-sm">{formattedDate}</p>
          </div>
        </div>

        {/* Login and Logout */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:px-4">
            Log In
          </button>

          <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:px-4">
            Log Out
          </button>
        </div>
      </div>

      {/* Navigation Links */}
     {/* Navigation Links */}
<nav className="mx-auto max-w-7xl px-4 pb-4">
  <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
    {data.map((item: {
      id: string;
      slug: string;
      nameBn: string;
      icon: string;
    }) => (
      <Link
        key={item.id}
        href={`/category/${item.id}`}
        className="flex  items-center gap-2 rounded-lg p-3 text-center transition hover:bg-gray-100"
      >
        <p className="text-xl">{item.icon}</p>

        <p className="text-xs font-medium text-gray-700 sm:text-sm">
          {item.nameBn}
        </p>
      </Link>
    ))}
  </div>
</nav>
    </header>
  );
};

export default Header;
