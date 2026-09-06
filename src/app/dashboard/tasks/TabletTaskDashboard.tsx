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

const TabletTaskDashboard = ({
  tasks,
  members,
}: Props) => {
  const getMemberName = (
    memberId: string | number
  ) => {
    const member = members.find(
      (item) =>
        String(item.id) ===
        String(memberId)
    );

    return member?.username || "-";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
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
              className="border-b transition hover:bg-gray-50"
            >
              <td className="max-w-[250px] px-4 py-4">
                <p className="truncate font-medium text-gray-800">
                  {task.work_title}
                </p>

                <p className="mt-1 truncate text-xs text-gray-400">
                  {task.work_description}
                </p>
              </td>

              <td className="px-4 py-4 text-sm">
                {getMemberName(
                  task.assign_team_member_id
                )}
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                  {task.status}
                </span>
              </td>

              <td className="px-4 py-4 text-sm">
                {task.importance}
              </td>

              <td className="px-4 py-4 text-sm text-gray-500">
                {task.timeline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabletTaskDashboard;