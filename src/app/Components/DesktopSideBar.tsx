"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DesktopSideBar = () => {
    
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleCollapse = () => {
  const newValue = !collapsed;

  setCollapsed(newValue);

  localStorage.setItem("wAdjust", String(newValue));

  window.dispatchEvent(new Event("wAdjustChange"));
};

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Team",
      icon: Users,
      href: "/dashboard/team",
    },
    {
      name: "Add Task",
      icon: PlusSquare,
      href: "/dashboard/tasks/add-task",
    },
  ];


useEffect(() => {
  const savedValue = localStorage.getItem("wAdjust");

  if (savedValue !== null) {
    setCollapsed(savedValue === "true");
  }
}, []);

// const handleCollapse = () => {
//   const newValue = !collapsed;

//   setCollapsed(newValue);
//   localStorage.setItem("wAdjust", String(newValue));
// };

  return (
    <aside
      className={`
        hidden lg:flex
    fixed
    left-0
    top-0
    bottom-0
    z-40
    flex-col
    bg-white
    border-r border-gray-200
    shadow-[4px_0_20px_rgba(0,0,0,0.04)]
    transition-all
    duration-500
    ease-in-out
    ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* ================= HEADER ================= */}

      <div
        className="
        mt-10
          relative
          h-20
          shrink-0
          border-b
          border-gray-100
          flex
          items-center
          justify-center
        "
      >
        {!collapsed ? (
          <div className="group cursor-pointer select-none ">
            <h1
              className="
                text-2xl
                font-extrabold
                tracking-tight
                text-gray-800
              "
            >
              Steps
              <span className="text-orange-600">
                TaskFlow
              </span>
            </h1>

            <div
              className="
                mx-auto
                mt-1
                h-1
                w-7
                rounded-full
                bg-orange-600
                transition-all
                duration-500
                group-hover:w-14
              "
            />
          </div>
        ) : (
          <div
            className="
              w-15
              h-10
              rounded-xl
              bg-orange-600
              text-white
              flex
              items-center
              justify-center
              font-extrabold
              text-lg
              shadow-lg
              shadow-orange-600/25
              transition-all
              duration-300
              hover:scale-110
              hover:rotate-3
              cursor-pointer
             
            "
          >
            Logo
          </div>
        )}

        {/* Collapse */}

        <button
          onClick={handleCollapse}
          className="
            absolute
            -top-5
            right-2
            w-8
            h-8
            rounded-lg
            bg-gray-50
            border
            border-gray-200
            flex
            items-center
            justify-center
            text-gray-500
            hover:bg-orange-600
            hover:text-white
            hover:border-orange-600
            hover:shadow-md
            transition-all
            duration-300
            hover:scale-105
          "
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* ================= MENU ================= */}

      {/* ================= MENU ================= */}
      <nav className="p-3 mt-7 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + "/dashboard");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group
                relative
                overflow-hidden

                flex
                items-center

                rounded-2xl
                py-3

                transition-all
                duration-300

                ${
                  collapsed
                    ? "w-full justify-center px-0"
                    : "w-full px-4"
                }

                ${
                  isActive
                    ? `
                      text-white
                      shadow-lg
                      shadow-orange-600/20
                    `
                    : "text-gray-600"
                }
              `}
            >
              {/* =================================================
                  WATER / 3 ROUND BLOB ANIMATION
              ================================================= */}

              {/* Main Round Blob */}
              <span
                className={`
                  absolute

                  w-32
                  h-32

                  rounded-full

                  bg-orange-600

                  -bottom-20
                  left-1/2
                  -translate-x-1/2

                  transition-all
                  duration-500
                  ease-out

                  ${
                    isActive
                      ? `
                        scale-[2.5]
                        opacity-100
                      `
                      : `
                        scale-0
                        opacity-0

                        group-hover:scale-[2.5]
                        group-hover:opacity-100
                      `
                  }
                `}
              />

              {/* Left Round Blob */}
              <span
                className={`
                  absolute

                  w-20
                  h-20

                  rounded-full

                  bg-orange-600

                  -bottom-12
                  -left-6

                  transition-all
                  duration-500
                  ease-out

                  ${
                    isActive
                      ? `
                        scale-[2]
                        opacity-100
                      `
                      : `
                        scale-0
                        opacity-0

                        group-hover:scale-[2]
                        group-hover:opacity-100
                      `
                  }
                `}
              />

              {/* Right Round Blob */}
              <span
                className={`
                  absolute

                  w-20
                  h-20

                  rounded-full

                  bg-orange-600

                  -bottom-12
                  -right-6

                  transition-all
                  duration-500
                  ease-out

                  ${
                    isActive
                      ? `
                        scale-[2]
                        opacity-100
                      `
                      : `
                        scale-0
                        opacity-0

                        group-hover:scale-[2]
                        group-hover:opacity-100
                      `
                  }
                `}
              />

              {/* =================================================
                  SMALL WATER DROP
              ================================================= */}

              <span
                className="
                  absolute

                  w-4
                  h-4

                  rounded-full

                  bg-orange-500

                  bottom-1
                  left-8

                  opacity-0
                  scale-0

                  transition-all
                  duration-500

                  group-hover:opacity-60
                  group-hover:scale-100
                "
              />

              {/* =================================================
                  ICON
              ================================================= */}

              <span
                className={`
                  relative
                  z-10

                  flex-shrink-0

                  transition-all
                  duration-400

                  ${
                    isActive
                      ? `
                        text-white
                        scale-105
                      `
                      : `
                        group-hover:text-white
                        group-hover:-translate-y-1
                        group-hover:scale-105
                      `
                  }
                `}
              >
                <Icon
                  size={21}
                  strokeWidth={2}
                />
              </span>

              {/* =================================================
                  TEXT
              ================================================= */}

              {!collapsed && (
                <span
                  className={`
                    relative
                    z-10

                    ml-3

                    whitespace-nowrap

                    text-sm
                    font-semibold

                    transition-all
                    duration-400

                    ${
                      isActive
                        ? `
                          text-white
                        `
                        : `
                          group-hover:text-white
                          group-hover:translate-x-1
                        `
                    }
                  `}
                >
                  {item.name}
                </span>
              )}

              {/* =================================================
                  RIGHT ARROW
              ================================================= */}

              {!collapsed && (
                <ChevronRight
                  size={16}
                  className={`
                    relative
                    z-10

                    ml-auto

                    transition-all
                    duration-400

                    ${
                      isActive
                        ? `
                          opacity-100
                          translate-x-0
                          text-white
                        `
                        : `
                          opacity-0
                          -translate-x-3

                          group-hover:opacity-100
                          group-hover:translate-x-0
                          group-hover:text-white
                        `
                    }
                  `}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DesktopSideBar;