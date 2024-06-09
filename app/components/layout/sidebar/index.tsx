"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SideBar() {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div>
      <div className="px-4 py-6">
        <div className="relative w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
          <Image
            src="/images/swdThumb.png"
            alt="swd Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 transform ${
                activeLink === "/dashboard"
                  ? "bg-gray-200 text-gray-700 shadow-lg scale-105"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:shadow-md hover:scale-105"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 transform ${
                activeLink === "/gallery"
                  ? "bg-blue-200 text-blue-700 shadow-lg"
                  : "text-gray-500 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md"
              }`}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/chart"
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 transform ${
                activeLink === "/chart"
                  ? "bg-green-200 text-green-700 shadow-lg"
                  : "text-gray-500 hover:bg-green-100 hover:text-green-700 hover:shadow-md"
              }`}
            >
              Chart
            </Link>
          </li>
          {/* <li>
            <Link
              href="/reports"
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 transform ${
                activeLink === "/reports"
                  ? "bg-red-200 text-red-700 shadow-lg translate-x-2"
                  : "text-gray-500 hover:bg-red-100 hover:text-red-700 hover:shadow-md hover:translate-x-2"
              }`}
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 transform ${
                activeLink === "/settings"
                  ? "bg-purple-200 text-purple-700 shadow-lg translate-y-2"
                  : "text-gray-500 hover:bg-purple-100 hover:text-purple-700 hover:shadow-md hover:translate-y-2"
              }`}
            >
              Settings
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
