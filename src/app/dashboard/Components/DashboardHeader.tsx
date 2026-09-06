"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

      <div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your team today.
        </p>

      </div>

      <Link
        href="/dashboard/AddTask"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          px-5
          py-3
          rounded-xl
          bg-orange-600
          text-white
          text-sm
          font-semibold
          shadow-lg
          shadow-orange-600/20
          hover:bg-orange-700
          hover:-translate-y-0.5
          transition-all
          duration-200
        "
      >
        <Plus size={18} />
        Add Task
      </Link>

    </div>
  );
};

export default DashboardHeader;