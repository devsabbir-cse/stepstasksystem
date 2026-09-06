"use client";

import React from "react";
import Link from "next/link";
import {
  Plus,
  Users,
  ArrowUpRight,
} from "lucide-react";

const QuickActions = () => {
  return (
    <div className="mt-5">

      <div className="mb-4">

        <h2 className="font-bold text-gray-800">
          Quick Actions
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Manage your team faster
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Add Task */}

        <Link
          href="/dashboard/AddTask"
          className="
            group
            flex
            items-center
            gap-4
            p-4
            rounded-2xl
            bg-white
            border
            border-gray-100
            shadow-sm
            hover:shadow-md
            hover:border-orange-200
            transition-all
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-orange-50
              text-orange-600
              flex
              items-center
              justify-center
              group-hover:bg-orange-600
              group-hover:text-white
              transition-all
            "
          >
            <Plus size={22} />
          </div>

          <div className="flex-1">

            <h3 className="text-sm font-bold text-gray-800">
              Create New Task
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Assign a new task to your team
            </p>

          </div>

          <ArrowUpRight
            size={18}
            className="
              text-gray-300
              group-hover:text-orange-600
              group-hover:translate-x-1
              group-hover:-translate-y-1
              transition-all
            "
          />

        </Link>

        {/* Team */}

        <Link
          href="/dashboard/TeamMember"
          className="
            group
            flex
            items-center
            gap-4
            p-4
            rounded-2xl
            bg-white
            border
            border-gray-100
            shadow-sm
            hover:shadow-md
            hover:border-orange-200
            transition-all
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
              group-hover:bg-blue-600
              group-hover:text-white
              transition-all
            "
          >
            <Users size={22} />
          </div>

          <div className="flex-1">

            <h3 className="text-sm font-bold text-gray-800">
              Manage Team
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              View and manage your team members
            </p>

          </div>

          <ArrowUpRight
            size={18}
            className="
              text-gray-300
              group-hover:text-blue-600
              group-hover:translate-x-1
              group-hover:-translate-y-1
              transition-all
            "
          />

        </Link>

      </div>

    </div>
  );
};

export default QuickActions;