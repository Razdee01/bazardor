const Loading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />

        {/* Text */}
        <p className="text-sm font-medium text-gray-500">লোড হচ্ছে...</p>
      </div>
    </div>
  );
};

export default Loading;
