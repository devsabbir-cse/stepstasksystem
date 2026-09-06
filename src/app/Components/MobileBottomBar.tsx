"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutList,
  LayoutDashboard,
  Users,
  Plus,
} from "lucide-react";

const MobileBottomBar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return (
      pathname === href ||
      pathname.startsWith(href + "/")
    );
  };

  return (
    <>
      {/* =====================================================
          FLOATING ADD TASK BUTTON
          ===================================================== */}

      <Link
        href="/dashboard/tasks/add-task"
        className="
          lg:hidden
          fixed
          right-5
          bottom-24
          z-50

          w-14
          h-14

          rounded-full

          bg-orange-600
          text-white

          flex
          items-center
          justify-center

          shadow-xl
          shadow-orange-600/30

          border-4
          border-white

          transition-all
          duration-300

          hover:scale-110
          active:scale-95
        "
        aria-label="Add Task"
      >
        <Plus
          size={27}
          strokeWidth={2.5}
        />
      </Link>

      {/* =====================================================
          MOBILE / TABLET BOTTOM BAR
          ===================================================== */}

      <nav
        className="
          lg:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-40

          h-[76px]

          bg-white
          border-t
          border-gray-200

          shadow-[0_-8px_30px_rgba(0,0,0,0.08)]

          px-3
          pb-safe
        "
      >
        <div
          className="
            relative
            h-full
            max-w-xl
            mx-auto

            grid
            grid-cols-3
            items-center
          "
        >
          {/* =================================================
              LEFT - DUMMY TASK
              ================================================= */}

          <Link
            href="/dashboard/tasks"
            className={`
              flex
              flex-col
              items-center
              justify-center
              gap-1
              transition-all
              duration-300

              ${
                isActive("/dashboard/tasks")
                  ? "text-orange-600"
                  : "text-gray-400"
              }
            `}
          >
            <div
              className={`
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                transition-all

                ${
                  isActive("/dashboard/tasks")
                    ? "bg-orange-100 scale-105"
                    : "bg-gray-50"
                }
              `}
            >
              <LayoutList size={20} />
            </div>

            <span className="text-[10px] font-semibold">
              Tasks
            </span>
          </Link>

          {/* =================================================
              CENTER - DASHBOARD
              ================================================= */}

          <Link
            href="/dashboard"
            className={`
              flex
              flex-col
              items-center
              justify-center
              gap-1
              transition-all
              duration-300

              ${
                isActive("/dashboard") &&
                pathname === "/dashboard"
                  ? "text-orange-600"
                  : "text-gray-400"
              }
            `}
          >
            <div
              className={`
                w-11
                h-11
                rounded-2xl
                flex
                items-center
                justify-center
                transition-all
                duration-300

                ${
                  pathname === "/dashboard"
                    ? `
                      bg-orange-600
                      text-white
                      shadow-lg
                      shadow-orange-600/30
                      -translate-y-1
                    `
                    : `
                      bg-gray-50
                    `
                }
              `}
            >
              <LayoutDashboard size={21} />
            </div>

            <span
              className="
                text-[10px]
                font-bold
              "
            >
              Dashboard
            </span>
          </Link>

          {/* =================================================
              RIGHT - DUMMY TEAM
              ================================================= */}

          <Link
            href="/dashboard/TeamMember"
            className={`
              flex
              flex-col
              items-center
              justify-center
              gap-1
              transition-all
              duration-300

              ${
                isActive("/dashboard/TeamMember")
                  ? "text-orange-600"
                  : "text-gray-400"
              }
            `}
          >
            <div
              className={`
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                transition-all

                ${
                  isActive("/dashboard/TeamMember")
                    ? "bg-orange-100 scale-105"
                    : "bg-gray-50"
                }
              `}
            >
              <Users size={20} />
            </div>

            <span className="text-[10px] font-semibold">
              Team
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomBar;