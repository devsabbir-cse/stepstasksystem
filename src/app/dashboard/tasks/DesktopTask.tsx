"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import type {
  Task,
  TeamMember,
  TaskFilters,
} from "@/types/task";

interface DesktopTaskProps {
  tasks: Task[];
  members: TeamMember[];
  filters: TaskFilters;
  onFilterChange: (
    changes: Partial<TaskFilters>
  ) => void;
  onSort: (field: string) => void;
  onTaskUpdate: (task: Task) => void;
}

export default function DesktopTask({
  tasks,
  members,
  filters,
  onSort,
  onTaskUpdate,
}: DesktopTaskProps) {
  const getMemberName = (memberId: unknown) => {
    const member = members.find(
      (item) =>
        String(
          (item as any).id ??
            (item as any).MID ??
            (item as any).member_id
        ) === String(memberId)
    );

    return (
      (member as any)?.name ||
      (member as any)?.member_name ||
      "Unassigned"
    );
  };

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "backlog":
        return "bg-gray-100 text-gray-700";

      case "todo":
        return "bg-blue-50 text-blue-700";

      case "in progress":
      case "nprogress":
        return "bg-orange-50 text-orange-700";

      case "review":
        return "bg-purple-50 text-purple-700";

      case "done":
        return "bg-green-50 text-green-700";

      case "cancel":
      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600";

      case "medium":
        return "text-orange-600";

      case "low":
        return "text-green-600";

      default:
        return "text-gray-600";
    }
  };

  const SortIcon = ({
    field,
  }: {
    field: string;
  }) => {
    if (filters.sortBy !== field) {
      return (
        <ArrowUpDown
          size={14}
          className="text-gray-400"
        />
      );
    }

    return filters.sortOrder === "ASC" ? (
      <ArrowUp
        size={14}
        className="text-orange-500"
      />
    ) : (
      <ArrowDown
        size={14}
        className="text-orange-500"
      />
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-5 py-3 text-xs font-semibold text-gray-500">
              ID
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500">
              <button
                type="button"
                onClick={() =>
                  onSort("title")
                }
                className="flex items-center gap-1"
              >
                Task
                <SortIcon field="title" />
              </button>
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500">
              Member
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500">
              <button
                type="button"
                onClick={() =>
                  onSort("status")
                }
                className="flex items-center gap-1"
              >
                Status
                <SortIcon field="status" />
              </button>
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500">
              <button
                type="button"
                onClick={() =>
                  onSort("priority")
                }
                className="flex items-center gap-1"
              >
                Priority
                <SortIcon field="priority" />
              </button>
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500">
              Timeline
            </th>

            <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {tasks.map((task) => {
            const taskData = task as any;

            const title =
              taskData.title ||
              taskData.task_title ||
              taskData.name ||
              "Untitled Task";

            const status =
              taskData.status || "Todo";

            const priority =
              taskData.priority || "Medium";

            const memberId =
              taskData.member_id ??
              taskData.member ??
              taskData.assigned_to;

            const timeline =
              taskData.timeline ||
              taskData.due_date ||
              taskData.deadline ||
              "-";

            return (
              <tr
                key={task.TID}
                className="
                  transition
                  hover:bg-gray-50
                "
              >
                {/* ID */}
                <td className="whitespace-nowrap px-5 py-4">
                  <span className="text-xs font-medium text-gray-500">
                    #{task.TID}
                  </span>
                </td>

                {/* Task */}
                <td className="max-w-[280px] px-5 py-4">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {title}
                  </p>
                </td>

                {/* Member */}
                <td className="whitespace-nowrap px-5 py-4">
                  <span className="text-sm text-gray-700">
                    {getMemberName(
                      memberId
                    )}
                  </span>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-2.5
                      py-1
                      text-[11px]
                      font-medium
                      ${getStatusClass(
                        status
                      )}
                    `}
                  >
                    {status}
                  </span>
                </td>

                {/* Priority */}
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`
                      text-xs
                      font-semibold
                      capitalize
                      ${getPriorityClass(
                        priority
                      )}
                    `}
                  >
                    {priority}
                  </span>
                </td>

                {/* Timeline */}
                <td className="whitespace-nowrap px-5 py-4">
                  <span className="text-xs text-gray-600">
                    {timeline}
                  </span>
                </td>

                {/* Action */}
                <td className="whitespace-nowrap px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      onTaskUpdate(task)
                    }
                    className="
                      rounded-lg
                      bg-orange-50
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-orange-600
                      transition
                      hover:bg-orange-100
                    "
                  >
                    View / Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}