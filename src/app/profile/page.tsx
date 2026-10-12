"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { LogOut } from "lucide-react";

import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;



  const handleUpdate = async (e: React.SubmitEvent<HTMLElement>) => {
    
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData.entries());

    await authClient.updateUser({
      ...newUser,
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/sign-in");
  };
  return (
    <div className="min-h-screen bg-[#F4F6F9] px-4 py-8 md:px-12">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Top Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Card Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xl font-semibold">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {user?.name || "লোড হচ্ছে..."}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Update Form Section */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                name="name"
              
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#05893E] hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-sm text-sm"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
