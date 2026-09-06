"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TaskPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;

  onPageChange: (page: number) => void;
}

const TaskPagination = ({
  page,
  totalPages,
  total,
  limit,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: TaskPaginationProps) => {

  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end =
    Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

      <p className="text-sm text-gray-500">
        Showing{" "}
        <b className="text-gray-800">
          {start}
        </b>
        {" - "}
        <b className="text-gray-800">
          {end}
        </b>
        {" of "}
        <b className="text-gray-800">
          {total}
        </b>
      </p>

      <div className="flex items-center gap-1">

        <button
          disabled={!hasPreviousPage}
          onClick={() =>
            onPageChange(page - 1)
          }
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        )
          .filter(
            (number) =>
              number === 1 ||
              number === totalPages ||
              Math.abs(number - page) <= 1
          )
          .map((number, index, array) => {

            const previous =
              array[index - 1];

            const dots =
              previous &&
              number - previous > 1;

            return (
              <React.Fragment
                key={number}
              >

                {dots && (
                  <span className="px-1 text-gray-400">
                    ...
                  </span>
                )}

                <button
                  onClick={() =>
                    onPageChange(number)
                  }
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
                    page === number
                      ? "bg-orange-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {number}
                </button>

              </React.Fragment>
            );
          })}

        <button
          disabled={!hasNextPage}
          onClick={() =>
            onPageChange(page + 1)
          }
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
};

export default TaskPagination;