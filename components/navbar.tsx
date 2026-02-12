"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, User, Users } from "lucide-react";

const AVATAR_COLORS = [
  "#E53E3E", "#DD6B20", "#D69E2E", "#38A169",
  "#319795", "#38B2AC", "#805AD5",
  "#D53F8C", "#E53E3E", "#ED8936",
];

function getColorFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarColor = useMemo(() => {
    return session?.user?.name ? getColorFromName(session.user.name) : "#38A169";
  }, [session?.user?.name]);

  const initial = session?.user?.name?.charAt(0).toUpperCase() ?? "?";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#001f3f] text-white h-14 flex items-center px-6 justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Club Falcon" width={32} height={32} unoptimized />
          <span className="font-semibold text-lg">Club Falcon</span>
        </Link>
      </div>

      {/* Right: Nav Links + Auth */}
      <div className="flex items-center gap-4">
        <Link href="/calendar" className="text-sm hover:text-[#89CFF0] transition-colors">
          Calendar
        </Link>
        <Link href="/clubs" className="text-sm hover:text-[#89CFF0] transition-colors">
          Clubs
        </Link>
        {session?.user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                style={{ backgroundColor: avatarColor }}
              >
                {initial}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="w-4 h-4" />
                  My Account
                </Link>
                <Link
                  href="/my-clubs"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  My Clubs
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-[#89CFF0] text-[#001f3f] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#a8dcf5] transition-colors"
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}
