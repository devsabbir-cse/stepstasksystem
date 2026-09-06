"use client";

import {
  Calendar,
  User,
  Flag,
  ChevronRight,
} from "lucide-react";

import type {
  Task,
  TeamMember,
} from "@/types/task";

interface Props {
  tasks: Task[];
  members: TeamMember[];
  loading: boolean;
  error: string;
}

const MobileTaskDashboard = ({
  tasks,
  members,
  loading,
  error,
}: Props) => {
  const getMember = (memberId: string | number) => {
    return members.find(
      (member) =>
        String(member.id) === String(memberId)
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "bg-green-100 text-green-700";

      case "review":
        return "bg-purple-100 text-purple-700";

      case "inprogress":
        return "bg-blue-100 text-blue-700";

      case "todo":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityStyle = (
    priority: string
  ) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600";

      case "medium":
        return "text-orange-500";

      case "low":
        return "text-green-600";

      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="space-y-3 px-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-80 items-center justify-center px-5 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="flex h-80 items-center justify-center text-gray-500">
        No task found
      </div>
    );
  }

  return (
    <div className="space-y-3 px-3">
      {tasks.map((task) => {
        const member = getMember(
          task.assign_team_member_id
        );

        return (
          <div
            key={task.TID}
            className="
              group
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-4
              shadow-sm
              transition
              active:scale-[0.99]
            "
          >
            {/* TOP */}

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-gray-900">
                  {task.work_title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {task.work_description}
                </p>
              </div>

              <ChevronRight
                size={18}
                className="mt-1 shrink-0 text-gray-400"
              />
            </div>

            {/* STATUS */}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getStatusStyle(
                    task.status
                  )}
                `}
              >
                {task.status}
              </span>

              <div
                className={`
                  flex
                  items-center
                  gap-1
                  text-xs
                  font-medium
                  ${getPriorityStyle(
                    task.importance
                  )}
                `}
              >
                <Flag size={14} />

                {task.importance}
              </div>
            </div>

            {/* DIVIDER */}

            <div className="my-4 h-px bg-gray-100" />

            {/* INFO */}

            <div className="space-y-3">
              {/* MEMBER */}

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
                  {member?.username?.charAt(
                    0
                  ) || "U"}
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Assigned to
                  </p>

                  <p className="text-sm font-medium text-gray-700">
                    {member?.username ||
                      "Unassigned"}
                  </p>
                </div>
              </div>

              {/* TIMELINE */}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar
                  size={16}
                  className="text-gray-400"
                />

                <span>
                  {task.timeline ||
                    "No deadline"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileTaskDashboard;