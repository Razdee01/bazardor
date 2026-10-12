import React from "react";
import Link from "next/link";
import { ShoppingBag, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icon / Illustration wrapper */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-[#05893E]">
          <ShoppingBag className="h-10 w-10" />
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            পেজটি পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি
            ভুল রয়েছে।
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#05893E] hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-sm text-sm"
          >
            <Home className="h-4 w-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
