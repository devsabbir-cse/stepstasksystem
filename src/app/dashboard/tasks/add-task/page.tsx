"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  User,
  Calendar,
  Flag,
  AlignLeft,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  description: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: string;
}

const AddTask = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    assignedTo: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Task Data:", formData);

      // পরে API এখানে call করবে

      /*
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      */

      await new Promise<void>((resolve) =>
        setTimeout(resolve, 800)
      );
      toast.success("Task created successfully!",{  progressClassName: "bg-orange-600", icon: <CheckCircle2 className="text-orange-600" size={20} />,
      });

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "",
        status: "",
        dueDate: "",
      });

      // router.push("/dashboard");
    } catch (error) {
      console.error("Create task error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-4 mb-6">

          

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Add New Task
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create and assign a new task to your team
            </p>
          </div>

        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            {/* ================= FORM HEADER ================= */}
            <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-orange-50
                    text-orange-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Plus size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-800">
                    Task Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Fill in the details below
                  </p>
                </div>

              </div>

            </div>

            {/* ================= FORM BODY ================= */}
            <div className="p-5 sm:p-7 space-y-6">

              {/* ================= TITLE ================= */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-800
                    outline-none
                    focus:bg-white
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/10
                    transition-all
                  "
                />

              </div>

              {/* ================= DESCRIPTION ================= */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <AlignLeft size={16} />
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task..."
                  rows={5}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-800
                    outline-none
                    resize-none
                    focus:bg-white
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/10
                    transition-all
                  "
                />

              </div>

              {/* ================= ASSIGN + PRIORITY ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* ================= ASSIGN ================= */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} />
                    Assign To
                  </label>

                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      text-sm
                      text-gray-700
                      outline-none
                      focus:bg-white
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-500/10
                      transition-all
                    "
                  >
                    <option value="">
                      Select team member
                    </option>

                    <option value="1">
                      Alice Johnson
                    </option>

                    <option value="2">
                      Bob Martin
                    </option>

                    <option value="3">
                      Charlie Davis
                    </option>

                    <option value="4">
                      Daniel Miller
                    </option>
                  </select>

                </div>

                {/* ================= PRIORITY ================= */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Flag size={16} />
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      text-sm
                      text-gray-700
                      outline-none
                      focus:bg-white
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-500/10
                      transition-all
                    "
                  >
                    <option value="Low">
                      Select priority
                    </option>
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Urgent">
                      Urgent
                    </option>
                  </select>

                </div>

              </div>

              {/* ================= STATUS + DUE DATE ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* ================= STATUS ================= */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <CheckCircle2 size={16} />
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      text-sm
                      text-gray-700
                      outline-none
                      focus:bg-white
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-500/10
                      transition-all
                    "
                  >
                    <option value="Todo">
                      Todo
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Review">
                      Review
                    </option>
                  </select>

                </div>

                {/* ================= DUE DATE ================= */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} />
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      text-sm
                      text-gray-700
                      outline-none
                      focus:bg-white
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-500/10
                      transition-all
                    "
                  />

                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div
              className="
                px-5
                sm:px-7
                py-5
                border-t
                border-gray-100
                bg-gray-50/70
                flex
                flex-col-reverse
                sm:flex-row
                sm:justify-end
                gap-3
              "
            >

              {/* ================= CANCEL ================= */}
              <button
                type="button"
                onClick={() => router.back()}
                className="
                  h-11
                  px-6
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-600
                  text-sm
                  font-semibold
                  hover:bg-gray-100
                  transition-all
                "
              >
                Cancel
              </button>

              {/* ================= CREATE ================= */}
              <button
                type="submit"
                disabled={loading}
                className="
                  h-11
                  px-7
                  rounded-xl
                  bg-orange-600
                  text-white
                  text-sm
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-lg
                  shadow-orange-600/20
                  hover:bg-orange-700
                  hover:-translate-y-0.5
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                  transition-all
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        w-4
                        h-4
                        border-2
                        border-white/40
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />

                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Create Task
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddTask;