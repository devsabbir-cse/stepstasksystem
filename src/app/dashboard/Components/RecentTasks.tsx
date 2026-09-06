"use client";

import React, { useEffect, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  ClipboardList,
  Eye,
  XCircle,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  member: string;
  memberId: number;
  status: string;
  createdAt: string;
  dueDate: string;
}

const RecentTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "/api/tasks"
        );

        const result =
          await response.json();

        if (result.success) {
          setTasks(result.data.slice(0, 5));
        }
      } catch (error) {
        console.error(
          "Failed to fetch recent tasks:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatus = (status: string) => {
    switch (status) {
      case "backlog":
        return {
          label: "Backlog",
          className:
            "bg-yellow-100 text-yellow-700",
          icon: ClipboardList,
        };

      case "todo":
        return {
          label: "Todo",
          className:
            "bg-cyan-100 text-cyan-700",
          icon: ClipboardList,
        };

      case "nprogress":
        return {
          label: "In Progress",
          className:
            "bg-blue-100 text-blue-700",
          icon: Clock3,
        };

      case "review":
        return {
          label: "Review",
          className:
            "bg-purple-100 text-purple-700",
          icon: Eye,
        };

      case "done":
        return {
          label: "Done",
          className:
            "bg-green-100 text-green-700",
          icon: CheckCircle2,
        };

      case "cancel":
        return {
          label: "Cancelled",
          className:
            "bg-red-100 text-red-700",
          icon: XCircle,
        };

      default:
        return {
          label: status,
          className:
            "bg-gray-100 text-gray-700",
          icon: ClipboardList,
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-100 rounded-xl" />
          <div className="h-12 bg-gray-100 rounded-xl" />
          <div className="h-12 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="font-bold text-gray-800">
            Recent Tasks
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Latest activities from your team
          </p>
        </div>

      </div>

      <div className="space-y-2">

        {tasks.map((task) => {
          const status =
            getStatus(task.status);

          const Icon = status.icon;

          return (
            <div
              key={task.id}
              className="
                group
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                border
                border-transparent
                hover:border-orange-100
                hover:bg-orange-50/40
                transition-all
              "
            >

              <div
                className="
                  w-10
                  h-10
                  shrink-0
                  rounded-xl
                  bg-gray-50
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  group-hover:bg-white
                  group-hover:text-orange-600
                "
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {task.title}
                </h3>

                <div className="flex items-center gap-2 mt-1">

                  <span className="text-xs text-gray-400 truncate">
                    {task.member}
                  </span>

                  <span className="text-gray-300">
                    •
                  </span>

                  <span className="text-xs text-gray-400">
                    {task.createdAt}
                  </span>

                </div>

              </div>

              <span
                className={`
                  hidden
                  sm:inline-flex
                  shrink-0
                  px-2.5
                  py-1
                  rounded-full
                  text-[10px]
                  font-bold
                  ${status.className}
                `}
              >
                {status.label}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default RecentTasks;