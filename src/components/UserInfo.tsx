"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react"; 
import { redirect } from "next/navigation";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
   await authClient.signOut();
   redirect("/sign-in")
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <div>
          {/* Trigger button (Avatar, Name, and Chevron) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full py-1.5 px-2 transition hover:bg-gray-100 focus:outline-none"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
            <span className="text-sm font-medium text-gray-800">
              {user.name}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              onMouseLeave={() => setIsOpen(false)}
              className="absolute right-0 mt-2 w-72 rounded-2xl bg-white p-4 shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              {/* User Info Header */}
              <div className="border-b border-gray-100 pb-3 mb-2">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <User className="h-4 w-4 text-gray-600" />
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 text-left"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href={"/sign-in"}
            className="rounded-lg border border-gray-300 px-2.5 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 sm:px-4 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href={"/sign-up"}
            className="rounded-lg bg-[#05893E] px-2.5 py-2 text-xs font-medium text-white transition hover:bg-green-700 sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
