"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  CalendarDays,
  UserRound,
  Flag,
  ListTodo,
} from "lucide-react";

import {
  Task,
  TeamMember,
} from "@/types/task";

interface EditTaskModalProps {
  task: Task | null;
  members: TeamMember[];
  open: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const statuses = [
  { id: 1, name: "Back Log" },
  { id: 2, name: "To Do" },
  { id: 3, name: "In Progress" },
  { id: 4, name: "Review" },
  { id: 5, name: "Done" },
  { id: 6, name: "Cancel" },
];

const priorities = [
  { id: 1, name: "HIGH" },
  { id: 2, name: "MEDIUM" },
  { id: 3, name: "LOW" },
];

const EditTaskModal = ({
  task,
  members,
  open,
  onClose,
  onSave,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [priority, setPriority] = useState(1);
  const [timeline, setTimeline] = useState("");
  const [memberId, setMemberId] = useState(1);

  useEffect(() => {
    if (!task) return;

    setTitle(task.TASK_TITLE);
    setDescription(task.TASK_DESC || "");
    setStatus(task.STATUS);
    setPriority(task.PRIORITY);
    setMemberId(task.TMID);

    if (task.TIMELINE) {
      setTimeline(
        new Date(task.TIMELINE)
          .toISOString()
          .slice(0, 16)
      );
    }
  }, [task]);

  if (!open || !task) {
    return null;
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const selectedStatus = statuses.find(
      (item) => item.id === status
    );

    const selectedPriority = priorities.find(
      (item) => item.id === priority
    );

    const selectedMember = members.find(
      (item) => item.TMID === memberId
    );

    const updatedTask: Task = {
      ...task,

      TASK_TITLE: title,
      TASK_DESC: description,

      STATUS: status,
      STATUS_NAME:
        selectedStatus?.name || "",

      PRIORITY: priority,
      PRIORITY_NAME:
        selectedPriority?.name || "",

      TMID: memberId,

      MEMBER_NAME:
        selectedMember?.NAME ||
        task.MEMBER_NAME,

      MEMBER_EMAIL:
        selectedMember?.EMAIL ||
        task.MEMBER_EMAIL,

      MEMBER_POSITION:
        selectedMember?.Positions ||
        task.MEMBER_POSITION,

      TIMELINE: timeline
        ? new Date(timeline).toISOString()
        : task.TIMELINE,
    };

    onSave(updatedTask);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Edit Task
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Update task information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* TITLE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Task Title
            </label>

            <div className="relative">
              <ListTodo
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* STATUS + PRIORITY */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(Number(e.target.value))
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-500"
              >
                {statuses.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Priority
              </label>

              <div className="relative">
                <Flag
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      Number(e.target.value)
                    )
                  }
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-orange-500"
                >
                  {priorities.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* MEMBER + TIMELINE */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* MEMBER */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Assign Member
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={memberId}
                  onChange={(e) =>
                    setMemberId(
                      Number(e.target.value)
                    )
                  }
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-orange-500"
                >
                  {members.map((member) => (
                    <option
                      key={member.TMID}
                      value={member.TMID}
                    >
                      {member.NAME}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TIMELINE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Timeline
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="datetime-local"
                  value={timeline}
                  onChange={(e) =>
                    setTimeline(e.target.value)
                  }
                  className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-orange-500"
                />
              </div>
            </div>

          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              <Save size={17} />
              Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;