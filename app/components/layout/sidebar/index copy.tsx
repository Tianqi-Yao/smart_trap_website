"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

export default function SideBar() {
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setActiveLink(pathname)
  }, [pathname]);

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white sidebar">
      <div className="px-4 py-6">
        <div className="relative w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
          <Image
            src="/images/swdThumb.png"
            alt="swd Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <ul className="mt-6 space-y-1">
          <li>
            <Link href="/dashboard" className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  activeLink === '/dashboard' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                Dashboard
            </Link>
          </li>
          <li>
            <Link href="/gallery" className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  activeLink === '/gallery' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                Gallery
            </Link>
          </li>
          <li>
            <Link href="/chart" className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  activeLink === '/chart' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                Chart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
