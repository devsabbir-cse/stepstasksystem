"use client";

import { ArrowLeft, Home, ListTodo } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-orange-500
              flex
              items-center
              justify-center
              text-white
              shadow-md
            "
          >
            <ListTodo size={23} />
          </div>

          <div className="text-left">
            <h1 className="font-bold text-gray-900 text-xl leading-none">
              Steps<span className="text-orange-500">TaskFlow</span>
            </h1>

            <p className="text-[10px] text-gray-400 mt-1">
              Team Management
            </p>
          </div>
        </div>

        {/* 404 */}
        <div
          className="
            text-[100px]
            sm:text-[140px]
            font-extrabold
            leading-none
            text-orange-500
            tracking-tight
          "
        >
          404
        </div>

        {/* Content */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
          Sorry, the page you are looking for doesn't exist or may have
          been moved to another location.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">

          {/* Go Back */}
          <button
            onClick={() => router.back()}
            className="
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-700
              text-sm
              font-semibold
              hover:bg-gray-100
              hover:border-gray-300
              transition-all
              duration-200
            "
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          {/* Home */}
          <button
            onClick={() => router.push("/")}
            className="
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              text-sm
              font-semibold
              shadow-md
              shadow-orange-100
              hover:shadow-lg
              transition-all
              duration-200
            "
          >
            <Home size={17} />
            Back to Home
          </button>

        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-400">
          © {new Date().getFullYear()} Steps<span className="text-orange-500">TaskFlow</span>. All rights reserved.
        </p>

      </div>
    </main>
  );
}