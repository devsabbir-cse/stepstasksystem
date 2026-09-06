"use client";

import {
  Calendar,
  Flag,
  ChevronRight,
  Mail,
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
  loading,
  error,
}: Props) => {

  // ======================================================
  // STATUS STYLE
  // ======================================================

  const getStatusStyle = (
    status: string
  ) => {

    switch (
      status?.toLowerCase()
    ) {

      case "done":
        return "bg-green-100 text-green-700";

      case "review":
        return "bg-purple-100 text-purple-700";

      case "in progress":
        return "bg-blue-100 text-blue-700";

      case "to do":
        return "bg-orange-100 text-orange-700";

      case "cancel":
        return "bg-red-100 text-red-700";

      case "backlog":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";

    }
  };


  // ======================================================
  // PRIORITY STYLE
  // ======================================================

  const getPriorityStyle = (
    priority: string
  ) => {

    switch (
      priority?.toLowerCase()
    ) {

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


  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatTimeline = (
    date: string | null | undefined
  ) => {

    if (!date) {
      return "No deadline";
    }

    const parsedDate =
      new Date(
        date.replace(
          " ",
          "T"
        )
      );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (
      <div className="space-y-3">

        {[1, 2, 3, 4].map(
          (item) => (

            <div
              key={item}
              className="
                h-44
                animate-pulse
                rounded-2xl
                bg-gray-100
              "
            />

          )
        )}

      </div>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error) {

    return (
      <div className="
        flex
        h-80
        items-center
        justify-center
        px-5
        text-center
        text-red-500
      ">
        {error}
      </div>
    );
  }


  // ======================================================
  // EMPTY
  // ======================================================

  if (!tasks.length) {

    return (
      <div className="
        flex
        h-80
        items-center
        justify-center
        text-gray-500
      ">
        No task found
      </div>
    );
  }


  // ======================================================
  // TASK LIST
  // ======================================================

  return (
    <div className="space-y-3">

      {tasks.map((task) => {

        const memberName =
          task.MEMBER_NAME ||
          "Unassigned";

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


            {/* ================= TITLE ================= */}

            <div className="
              flex
              items-start
              justify-between
              gap-3
            ">

              <div className="min-w-0">

                <h3 className="
                  truncate
                  text-base
                  font-semibold
                  text-gray-900
                ">
                  {task.TASK_TITLE}
                </h3>


                <p className="
                  mt-1
                  line-clamp-2
                  text-sm
                  text-gray-500
                ">
                  {task.TASK_DESC}
                </p>

              </div>


              <ChevronRight
                size={18}
                className="
                  mt-1
                  shrink-0
                  text-gray-400
                "
              />

            </div>


            {/* ================= STATUS + PRIORITY ================= */}

            <div className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-3
            ">

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium

                  ${getStatusStyle(
                    task.STATUS_NAME
                  )}
                `}
              >
                {task.STATUS_NAME}
              </span>


              <div
                className={`
                  flex
                  items-center
                  gap-1
                  text-xs
                  font-semibold

                  ${getPriorityStyle(
                    task.PRIORITY_NAME
                  )}
                `}
              >

                <Flag size={14} />

                {task.PRIORITY_NAME}

              </div>

            </div>


            {/* ================= DIVIDER ================= */}

            <div className="
              my-4
              h-px
              bg-gray-100
            " />


            {/* ================= MEMBER ================= */}

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-orange-100
                text-sm
                font-semibold
                text-orange-600
              ">

                {memberName
                  .charAt(0)
                  .toUpperCase()}

              </div>


              <div className="min-w-0">

                <p className="
                  truncate
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  {memberName}
                </p>


                <p className="
                  truncate
                  text-xs
                  text-gray-400
                ">
                  {task.MEMBER_POSITION ||
                    task.MEMBER_EMAIL ||
                    "Team Member"}
                </p>

              </div>

            </div>


            {/* ================= TIMELINE ================= */}

            <div className="
              mt-4
              flex
              items-center
              gap-2
              border-t
              border-gray-100
              pt-3
              text-sm
              text-gray-500
            ">

              <Calendar
                size={16}
                className="text-gray-400"
              />

              <span>
                {formatTimeline(
                  task.TIMELINE
                )}
              </span>

            </div>

          </div>
        );

      })}

    </div>
  );
};

export default MobileTaskDashboard;