import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = async () => {
  interface Icategory {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
  }
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  const data = await res.json();

  const today = new Date();

  const formattedDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo and Website Name wrapped safely in a single Link */}
        <Link href={"/"} className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/logo-icon.png"
            alt="Website logo"
            width={55}
            height={55}
            className="h-10 w-10 shrink-0 rounded-xl bg-[#05893E] p-2 sm:h-12 sm:w-12 sm:rounded-2xl sm:p-3"
          />

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
              বাজার দর 
            </h1>

            <p className="text-[10px] text-gray-500 sm:text-sm">
              {formattedDate}
            </p>
          </div>
        </Link>

        {/* Login and Logout Buttons (Independent, no nested links) */}
        <UserInfo></UserInfo>
      </div>

      {/* Navigation Links */}
      <nav className="rounded-lg border border-gray-100">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-4 sm:gap-3 sm:px-6 sm:pb-4 lg:grid-cols-8 lg:px-8">
          {data.map((item: Icategory) => (
            <Link
              key={item.id}
              href={`/categories/${item.id}`}
              className="flex min-w-0 items-center justify-center gap-2 p-2 transition hover:bg-green-50 sm:justify-start sm:p-3"
            >
              <span className="shrink-0 text-lg sm:text-xl">{item.icon}</span>

              <span className="truncate text-xs font-medium text-gray-700 sm:text-sm">
                {item.nameBn}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
