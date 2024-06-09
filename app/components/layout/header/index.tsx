"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-2 py-4 sm:px-3 sm:py-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Hello, Welcome to the SWD Project Website!
            </h1>
            {/* <p className="mt-1.5 text-sm text-gray-500">
              🎉
            </p> */}
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
              type="button"
            > 
              <Link href="https://darec.missouri.edu/">
                <span className="text-sm font-medium"> DAREC </span>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
            <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
