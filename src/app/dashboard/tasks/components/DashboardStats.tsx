"use client";

import React from "react";

import {
  ListTodo,
  Clock3,
  CheckCircle2,
  Ban,
  ClipboardList,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DashboardStatsProps {
  total: number;
  backlog: number;
  todo: number;
  inProgress: number;
  review: number;
  done: number;
  cancelled: number;
  overdue: number;

  collapsed: boolean;

  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const DashboardStats = ({
  total,
  backlog,
  todo,
  inProgress,
  review,
  done,
  cancelled,
  overdue,
  collapsed,
  setCollapsed,
}: DashboardStatsProps) => {
  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: ListTodo,
      className:
        "bg-orange-100 text-orange-600",
    },
    {
      title: "Backlog",
      value: backlog,
      icon: ClipboardList,
      className:
        "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Todo",
      value: todo,
      icon: ListTodo,
      className:
        "bg-cyan-100 text-cyan-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Clock3,
      className:
        "bg-blue-100 text-blue-600",
    },
    {
      title: "Review",
      value: review,
      icon: Clock3,
      className:
        "bg-purple-100 text-purple-600",
    },
    {
      title: "Done",
      value: done,
      icon: CheckCircle2,
      className:
        "bg-green-100 text-green-600",
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: Ban,
      className:
        "bg-red-100 text-red-600",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertCircle,
      className:
        "bg-red-100 text-red-600",
    },
  ];

  return (
    <aside
      className="
        relative
        h-full
        w-full
        min-w-0
        bg-gray-50
        overflow-visible
      "
    >
      {/* =========================
          TOGGLE BUTTON
      ========================= */}

      <button
        type="button"
        onClick={() =>
          setCollapsed((prev) => !prev)
        }
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
        className="
          absolute
          -left-3
          top-7
          z-[100]
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          border-gray-300
          bg-white
          text-gray-600
          shadow-md
          transition-all
          duration-200
          hover:bg-gray-100
          hover:text-gray-900
          cursor-pointer
        "
      >
        {collapsed ? (
          <ChevronLeft size={16} />
        ) : (
          <ChevronRight size={16} />
        )}
      </button>

      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div
        className="
          flex
          h-full
          w-full
          min-w-0
          flex-col
          overflow-hidden
        "
      >
        {/* =========================
            HEADER
        ========================= */}

        <div
          className={`
            flex
            h-[70px]
            w-full
            shrink-0
            items-center
            border-b
            border-gray-200
            transition-all
            duration-300
            ease-in-out
            overflow-hidden

            ${
              collapsed
                ? "justify-center px-0"
                : "justify-start px-4"
            }
          `}
        >
          {/* HEADER ICON */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-orange-100
            "
          >
            <ListTodo
              size={22}
              className="text-orange-600"
            />
          </div>

          {/* HEADER TEXT */}

          <div
            className={`
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-300
              ease-in-out

              ${
                collapsed
                  ? "w-0 ml-0 opacity-0"
                  : "w-auto ml-3 opacity-100"
              }
            `}
          >
            <h2 className="font-bold text-gray-800">
              Task Overview
            </h2>

            <p className="text-xs text-gray-500">
              Dashboard Statistics
            </p>
          </div>
        </div>

        {/* =========================
            SCROLLABLE STATS
        ========================= */}

        <div
          className={`
            flex-1
            min-h-0
            w-full
            min-w-0
            overflow-y-auto
            overflow-x-hidden
            transition-all
            duration-300
            ease-in-out

            ${
              collapsed
                ? "px-0 py-3"
                : "px-3 py-3"
            }
          `}
        >
          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              gap-2
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`
                    group
                    relative
                    box-border
                    flex
                    h-[60px]
                    w-full
                    min-w-0
                    shrink-0
                    items-center
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    ease-in-out
                    hover:shadow-md

                    ${
                      collapsed
                        ? `
                          justify-center
                          rounded-none
                          border-l-0
                          border-r-0
                          px-0
                        `
                        : `
                          rounded-xl
                          px-2
                        `
                    }
                  `}
                >
                  {/* =========================
                      COLLAPSED CONTENT
                  ========================= */}

                  <div
                    className={`
                      absolute
                      inset-0
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      transition-all
                      duration-200

                      ${
                        collapsed
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      {/* NUMBER */}

                      <span
                        className={`
                          text-base
                          font-bold
                          leading-none

                          ${
                            stat.value > 0
                              ? "text-gray-900"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {stat.value}
                      </span>

                      {/* ICON */}

                      <div
                        className={`
                          rounded-lg
                          p-1.5
                          ${stat.className}
                        `}
                      >
                        <Icon size={18} />
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      EXPANDED CONTENT
                  ========================= */}

                  <div
                    className={`
                      flex
                      w-full
                      min-w-0
                      items-center
                      gap-3
                      transition-all
                      duration-200

                      ${
                        collapsed
                          ? "opacity-0 scale-95 pointer-events-none"
                          : "opacity-100 scale-100"
                      }
                    `}
                  >
                    {/* NUMBER */}

                    <div
                      className="
                        w-9
                        shrink-0
                        text-center
                      "
                    >
                      <span
                        className={`
                          text-xl
                          font-bold
                          leading-none

                          ${
                            stat.value > 0
                              ? "text-gray-900"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {stat.value}
                      </span>
                    </div>

                    {/* ICON */}

                    <div
                      className={`
                        shrink-0
                        rounded-lg
                        p-2
                        ${stat.className}
                      `}
                    >
                      <Icon size={19} />
                    </div>

                    {/* TITLE */}

                    <p
                      className="
                        flex-1
                        min-w-0
                        truncate
                        text-sm
                        font-medium
                        text-gray-700
                      "
                    >
                      {stat.title}
                    </p>
                  </div>

                  {/* =========================
                      TOOLTIP
                  ========================= */}

                  {collapsed && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        right-[110px]
                        top-1/2
                        z-[999]
                        -translate-y-1/2
                        whitespace-nowrap
                        opacity-0
                        transition-opacity
                        duration-150
                        group-hover:opacity-100
                      "
                    >
                      <div
                        className="
                          rounded-lg
                          bg-gray-900
                          px-3
                          py-2
                          text-xs
                          text-white
                          shadow-lg
                        "
                      >
                        {stat.title}: {stat.value}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardStats;