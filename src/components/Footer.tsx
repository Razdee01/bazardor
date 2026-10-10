const Footer = () => {
  return (
    <footer className="w-full border-t border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:py-6 sm:text-left lg:px-8">
        {/* Left Text */}
        <p className="text-xs text-[#4B554D]">
          বাজার দর — প্রতিদিনের পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-xs text-[#4B554D]">
          সকল দাম স্থানভেদে; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;