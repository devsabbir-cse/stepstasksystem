"use client";

import React from "react";
import {
  ListTodo,
  Clock3,
  CheckCircle2,
  Ban,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

export interface DashboardStatsData {
  total: number;
  backlog: number;
  todo: number;
  inProgress: number;
  review: number;
  done: number;
  cancelled: number;
  overdue: number;
}

interface DashboardStatsProps {
  stats: DashboardStatsData;
}

const DashboardStats = ({
  stats,
}: DashboardStatsProps) => {
  const items = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      className:
        "bg-orange-100 text-orange-600",
    },
    {
      title: "Backlog",
      value: stats.backlog,
      icon: ClipboardList,
      className:
        "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Todo",
      value: stats.todo,
      icon: ListTodo,
      className:
        "bg-cyan-100 text-cyan-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock3,
      className:
        "bg-blue-100 text-blue-600",
    },
    {
      title: "Review",
      value: stats.review,
      icon: Clock3,
      className:
        "bg-purple-100 text-purple-600",
    },
    {
      title: "Done",
      value: stats.done,
      icon: CheckCircle2,
      className:
        "bg-green-100 text-green-600",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: Ban,
      className:
        "bg-red-100 text-red-600",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: AlertCircle,
      className:
        "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div className="relative flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-gray-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${item.className}
                `}
              >
                <Icon size={22} />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default DashboardStats;