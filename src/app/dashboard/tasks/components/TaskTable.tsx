"use client";

import { useState } from "react";

import {
  Pencil,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  X,
  Check,
} from "lucide-react";

import type {
  Task,
  TeamMember,
  TaskFilters,
} from "@/types/task";

import StatusBadge from "./StatusBadge";
import EditTaskModal from "./EditTaskModal";

interface TaskTableProps {
  tasks: Task[];
  members: TeamMember[];
  filters: TaskFilters;
  onFilterChange: (
    changes: Partial<TaskFilters>
  ) => void;
  onSort: (field: string) => void;
  onTaskUpdate: (task: Task) => void;
}

const STATUS_OPTIONS = [
  { id: "1", name: "Back Log" },
  { id: "2", name: "To Do" },
  { id: "3", name: "In Progress" },
  { id: "4", name: "Review" },
  { id: "5", name: "Done" },
  { id: "6", name: "Cancel" },
];

const PRIORITY_OPTIONS = [
  { id: "1", name: "HIGH" },
  { id: "2", name: "MEDIUM" },
  { id: "3", name: "LOW" },
];

const TaskTable = ({
  tasks,
  members,
  filters,
  onFilterChange,
  onSort,
  onTaskUpdate,
}: TaskTableProps) => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ======================================================
  // PRIORITY CLASS
  // ======================================================

  const getPriorityClass = (priority: number) => {
    if (priority === 1) {
      return "text-red-600 bg-red-50";
    }

    if (priority === 2) {
      return "text-orange-600 bg-orange-50";
    }

    return "text-green-600 bg-green-50";
  };

  // ======================================================
  // OVERDUE
  // ======================================================

  const isOverdue = (task: Task) => {
    if (!task.TIMELINE) return false;

    if (task.STATUS === 5 || task.STATUS === 6) {
      return false;
    }

    return (
      new Date(task.TIMELINE).getTime() <
      Date.now()
    );
  };

  // ======================================================
  // UPDATE TASK
  // ======================================================

  const handleUpdate = (task: Task) => {
    onTaskUpdate(task);
    setEditTask(null);
  };

  // ======================================================
  // MULTI SELECT
  // ======================================================

  const toggleValue = (
    field: "status" | "priority" | "member",
    value: string
  ) => {
    const current = filters[field] || [];

    const exists = current.includes(value);

    const updated = exists
      ? current.filter((item) => item !== value)
      : [...current, value];

    onFilterChange({
      [field]: updated,
    });
  };

  // ======================================================
  // CLEAR FILTER
  // ======================================================

  const clearFilter = (
    field: "status" | "priority" | "member"
  ) => {
    onFilterChange({
      [field]: [],
    });
  };

  // ======================================================
  // FILTER BUTTON
  // ======================================================

  const FilterButton = ({
    column,
    active,
  }: {
    column: string;
    active: boolean;
  }) => {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          setOpenFilter(
            openFilter === column
              ? null
              : column
          );
        }}
        className={`ml-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition ${
          active
            ? "bg-orange-100 text-orange-600"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        <SlidersHorizontal size={13} />
      </button>
    );
  };

  // ======================================================
  // SORT BUTTON
  // ======================================================

  const SortButton = ({
    field,
  }: {
    field: string;
  }) => {
    const active = filters.sortBy === field;

    return (
      <button
        type="button"
        onClick={() => onSort(field)}
        className="ml-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
      >
        {active &&
        filters.sortOrder === "ASC" ? (
          <ArrowUp size={13} />
        ) : (
          <ArrowDown size={13} />
        )}
      </button>
    );
  };

  return (
    <>
      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="w-full">
        <table className="w-full table-fixed text-left">
          {/* ==================================================
              HEADER
          ================================================== */}

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {/* TASK */}

              <th className="w-[24%] px-3 py-4 sm:px-4">
                <div className="flex items-center text-xs font-semibold uppercase text-gray-500">
                  <span>Task</span>

                  <SortButton field="task" />
                </div>
              </th>

              {/* MEMBER */}

              <th className="w-[18%] px-3 py-4 sm:px-4">
                <div className="flex items-center text-xs font-semibold uppercase text-gray-500">
                  <span>Member</span>

                  <FilterButton
                    column="member"
                    active={
                      filters.member.length > 0
                    }
                  />

                  <SortButton field="member" />
                </div>

                {/* MEMBER FILTER */}

                {openFilter === "member" && (
                  <div className="absolute z-50 mt-1 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">
                        Filter Member
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenFilter(null)
                        }
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                      {members.map((member) => {
                        const id = String(
                          member.TMID
                        );

                        const checked =
                          filters.member.includes(id);

                        return (
                          <button
                            key={member.TMID}
                            type="button"
                            onClick={() =>
                              toggleValue(
                                "member",
                                id
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                checked
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {checked && (
                                <Check size={12} />
                              )}
                            </span>

                            <span className="truncate">
                              {member.NAME}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {filters.member.length >
                      0 && (
                      <button
                        type="button"
                        onClick={() =>
                          clearFilter("member")
                        }
                        className="mt-2 w-full border-t border-gray-100 pt-2 text-xs font-medium text-red-500"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}
              </th>

              {/* STATUS */}

              <th className="w-[14%] px-3 py-4 sm:px-4">
                <div className="flex items-center text-xs font-semibold uppercase text-gray-500">
                  <span>Status</span>

                  <FilterButton
                    column="status"
                    active={
                      filters.status.length > 0
                    }
                  />

                  <SortButton field="status" />
                </div>

                {/* STATUS FILTER */}

                {openFilter === "status" && (
                  <div className="absolute z-50 mt-1 w-52 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">
                        Filter Status
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenFilter(null)
                        }
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {STATUS_OPTIONS.map(
                      (status) => {
                        const checked =
                          filters.status.includes(
                            status.id
                          );

                        return (
                          <button
                            key={status.id}
                            type="button"
                            onClick={() =>
                              toggleValue(
                                "status",
                                status.id
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                checked
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {checked && (
                                <Check size={12} />
                              )}
                            </span>

                            <span>
                              {status.name}
                            </span>
                          </button>
                        );
                      }
                    )}

                    {filters.status.length >
                      0 && (
                      <button
                        type="button"
                        onClick={() =>
                          clearFilter("status")
                        }
                        className="mt-2 w-full border-t border-gray-100 pt-2 text-xs font-medium text-red-500"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}
              </th>

              {/* PRIORITY */}

              <th className="w-[12%] px-3 py-4 sm:px-4">
                <div className="flex items-center text-xs font-semibold uppercase text-gray-500">
                  <span>Priority</span>

                  <FilterButton
                    column="priority"
                    active={
                      filters.priority.length >
                      0
                    }
                  />

                  <SortButton field="priority" />
                </div>

                {/* PRIORITY FILTER */}

                {openFilter === "priority" && (
                  <div className="absolute z-50 mt-1 w-48 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">
                        Filter Priority
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenFilter(null)
                        }
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {PRIORITY_OPTIONS.map(
                      (priority) => {
                        const checked =
                          filters.priority.includes(
                            priority.id
                          );

                        return (
                          <button
                            key={priority.id}
                            type="button"
                            onClick={() =>
                              toggleValue(
                                "priority",
                                priority.id
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                checked
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {checked && (
                                <Check size={12} />
                              )}
                            </span>

                            <span>
                              {priority.name}
                            </span>
                          </button>
                        );
                      }
                    )}

                    {filters.priority.length >
                      0 && (
                      <button
                        type="button"
                        onClick={() =>
                          clearFilter("priority")
                        }
                        className="mt-2 w-full border-t border-gray-100 pt-2 text-xs font-medium text-red-500"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}
              </th>

              {/* TIMELINE */}

              <th className="w-[19%] px-3 py-4 sm:px-4">
                <div className="flex items-center text-xs font-semibold uppercase text-gray-500">
                  <span>Timeline</span>

                  <FilterButton
                    column="timeline"
                    active={
                      Boolean(
                        filters.timelineFrom
                      ) ||
                      Boolean(
                        filters.timelineTo
                      )
                    }
                  />

                  <SortButton field="timeline" />
                </div>

                {/* TIMELINE FILTER */}

                {openFilter === "timeline" && (
                  <div className="absolute right-0 z-50 mt-1 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        Timeline Range
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenFilter(null)
                        }
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <label className="mb-1 block text-xs text-gray-500">
                      From
                    </label>

                    <input
                      type="date"
                      value={
                        filters.timelineFrom
                      }
                      onChange={(e) =>
                        onFilterChange({
                          timelineFrom:
                            e.target.value,
                        })
                      }
                      className="mb-3 h-9 w-full rounded-lg border border-gray-200 px-2 text-sm outline-none focus:border-orange-500"
                    />

                    <label className="mb-1 block text-xs text-gray-500">
                      To
                    </label>

                    <input
                      type="date"
                      value={
                        filters.timelineTo
                      }
                      onChange={(e) =>
                        onFilterChange({
                          timelineTo:
                            e.target.value,
                        })
                      }
                      className="h-9 w-full rounded-lg border border-gray-200 px-2 text-sm outline-none focus:border-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        onFilterChange({
                          timelineFrom: "",
                          timelineTo: "",
                        });

                        setOpenFilter(null);
                      }}
                      className="mt-3 w-full text-xs font-medium text-red-500"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </th>

              {/* ACTION */}

              <th className="w-[5%] px-3 py-4 text-right text-xs font-semibold uppercase text-gray-500 sm:px-4">
                Action
              </th>
            </tr>
          </thead>

          {/* ==================================================
              BODY
          ================================================== */}

          <tbody className="divide-y divide-gray-100">
            {tasks.map((task) => {
              const overdue = isOverdue(task);

              return (
                <tr
                  key={task.TID}
                  className="transition hover:bg-orange-50/40"
                >
                  {/* TASK */}

                  <td className="px-3 py-4 sm:px-4">
                    <div className="w-full min-w-0">
                      <p className="break-words text-sm font-semibold text-gray-900">
                        {task.TASK_TITLE}
                      </p>

                      <p className="mt-1 break-words text-xs text-gray-500">
                        {task.TASK_DESC}
                      </p>
                    </div>
                  </td>

                  {/* MEMBER */}

                  <td className="px-3 py-4 sm:px-4">
                    <div className="min-w-0">
                      <p className="break-words text-sm font-medium text-gray-800">
                        {task.MEMBER_NAME}
                      </p>

                      <p className="break-words text-xs text-gray-400">
                        {task.MEMBER_POSITION}
                      </p>
                    </div>
                  </td>

                  {/* STATUS */}

                  <td className="px-3 py-4 sm:px-4">
                    <div className="max-w-full">
                      <StatusBadge
                        status={task.STATUS}
                        statusName={
                          task.STATUS_NAME
                        }
                      />
                    </div>
                  </td>

                  {/* PRIORITY */}

                  <td className="px-3 py-4 sm:px-4">
                    <span
                      className={`inline-block max-w-full break-words rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                        task.PRIORITY
                      )}`}
                    >
                      {task.PRIORITY_NAME}
                    </span>
                  </td>

                  {/* TIMELINE */}

                  <td className="px-3 py-4 sm:px-4">
                    <div className="min-w-0">
                      <p
                        className={`break-words text-sm font-medium ${
                          overdue
                            ? "text-red-600"
                            : "text-gray-700"
                        }`}
                      >
                        {formatDate(
                          task.TIMELINE
                        )}
                      </p>

                      {overdue && (
                        <span className="text-xs font-semibold text-red-500">
                          Overdue
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ACTION */}

                  <td className="px-3 py-4 sm:px-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setEditTask(task)
                        }
                        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold text-gray-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:gap-2 sm:px-3"
                      >
                        <Pencil size={14} />

                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ==================================================
          EDIT MODAL
      ================================================== */}

      <EditTaskModal
        task={editTask}
        members={members}
        open={Boolean(editTask)}
        onClose={() => setEditTask(null)}
        onSave={handleUpdate}
      />
    </>
  );
};

export default TaskTable;