"use client";

import type {
  Task,
  TeamMember,
  TaskFilters,
} from "@/types/task";

interface Props {
  tasks: Task[];
  members: TeamMember[];
  filters: TaskFilters;

  onTaskUpdate: (
    task: Task
  ) => void;
}

const getStatusStyle = (
  status: string
) => {
  switch (status?.toLowerCase()) {
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

const getPriorityStyle = (
  priority: string
) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-600";

    case "medium":
      return "bg-orange-50 text-orange-600";

    case "low":
      return "bg-green-50 text-green-600";

    default:
      return "bg-gray-50 text-gray-600";
  }
};

const TabletTaskDashboard = ({
  tasks,
}: Props) => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[750px]">

        <thead>
          <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">

            <th className="px-4 py-3">
              Task
            </th>

            <th className="px-4 py-3">
              Member
            </th>

            <th className="px-4 py-3">
              Status
            </th>

            <th className="px-4 py-3">
              Priority
            </th>

            <th className="px-4 py-3">
              Timeline
            </th>

          </tr>
        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr
              key={task.TID}
              className="
                border-b
                border-gray-100
                transition
                hover:bg-gray-50
              "
            >

              {/* TASK */}

              <td className="max-w-[260px] px-4 py-4">

                <p className="
                  truncate
                  font-semibold
                  text-gray-800
                ">
                  {task.TASK_TITLE}
                </p>

                <p className="
                  mt-1
                  truncate
                  text-xs
                  text-gray-400
                ">
                  {task.TASK_DESC}
                </p>

              </td>


              {/* MEMBER */}

              <td className="px-4 py-4">

                <p className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  {task.MEMBER_NAME ||
                    "Unassigned"}
                </p>

                <p className="
                  mt-0.5
                  text-xs
                  text-gray-400
                ">
                  {task.MEMBER_POSITION ||
                    "-"}
                </p>

              </td>


              {/* STATUS */}

              <td className="px-4 py-4">

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

              </td>


              {/* PRIORITY */}

              <td className="px-4 py-4">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                    ${getPriorityStyle(
                      task.PRIORITY_NAME
                    )}
                  `}
                >
                  {task.PRIORITY_NAME}
                </span>

              </td>


              {/* TIMELINE */}

              <td className="
                whitespace-nowrap
                px-4
                py-4
                text-sm
                text-gray-500
              ">
                {task.TIMELINE ||
                  "No deadline"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TabletTaskDashboard;