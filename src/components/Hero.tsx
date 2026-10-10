import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#E1EAE2] bg-white px-5 py-7 sm:px-8 sm:py-9 md:flex-row md:px-10 lg:px-12">
        {/* Hero Content */}
        <div className="w-full flex-1">
          <span className="inline-flex rounded-full bg-[#E0F2E6] px-3 py-1.5 text-xs font-medium text-[#05893E] sm:text-sm">
            {formattedDate}
          </span>

          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#202B23] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#69736B] sm:text-base sm:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-[#05893E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047532] focus:outline-none focus:ring-2 focus:ring-[#05893E] focus:ring-offset-2"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Fruit Basket Illustration */}
        <div className="flex w-full shrink-0 items-center justify-center md:w-60 lg:w-75">
            <Image src="/bazar-hero.png" alt="" height={300} width={300}/>
        </div>
      </div>
    </section>
  );
};

export default Hero;