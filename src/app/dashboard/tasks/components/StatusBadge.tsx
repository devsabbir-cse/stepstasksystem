"use client";

import React from "react";

interface StatusBadgeProps {
  status: number;
  statusName: string;
}

const StatusBadge = ({
  status,
  statusName,
}: StatusBadgeProps) => {
  const styles: Record<number, string> = {
    1: "bg-gray-100 text-gray-700",
    2: "bg-yellow-100 text-yellow-700",
    3: "bg-blue-100 text-blue-700",
    4: "bg-purple-100 text-purple-700",
    5: "bg-green-100 text-green-700",
    6: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {statusName}
    </span>
  );
};

export default StatusBadge;