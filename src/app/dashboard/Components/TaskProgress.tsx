"use client";

import React from "react";
import { CircleCheck } from "lucide-react";
import { DashboardStatsData } from "./DashboardStats";

interface TaskProgressProps {
  stats: DashboardStatsData;
}

const TaskProgress = ({
  stats,
}: TaskProgressProps) => {
  const percentage =
    stats.total > 0
      ? Math.round(
          (stats.done / stats.total) * 100
        )
      : 0;

  const remaining =
    stats.total -
    stats.done -
    stats.cancelled;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="font-bold text-gray-800">
            Task Progress
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Overall team performance
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
          <CircleCheck size={20} />
        </div>

      </div>

      {/* Progress Circle */}

      <div className="flex justify-center py-3">

        <div
          className="
            relative
            w-40
            h-40
            rounded-full
            flex
            items-center
            justify-center
          "
          style={{
            background: `conic-gradient(
              #ea580c 0% ${percentage}%,
              #f3f4f6 ${percentage}% 100%
            )`,
          }}
        >

          <div className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center">

            <span className="text-3xl font-extrabold text-gray-800">
              {percentage}%
            </span>

            <span className="text-xs text-gray-400">
              Completed
            </span>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="mt-5 space-y-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />

            <span className="text-sm text-gray-600">
              Completed
            </span>

          </div>

          <span className="text-sm font-semibold text-gray-800">
            {stats.done}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />

            <span className="text-sm text-gray-600">
              In Progress
            </span>

          </div>

          <span className="text-sm font-semibold text-gray-800">
            {stats.inProgress}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />

            <span className="text-sm text-gray-600">
              Remaining
            </span>

          </div>

          <span className="text-sm font-semibold text-gray-800">
            {remaining}
          </span>

        </div>

      </div>

    </div>
  );
};

export default TaskProgress;