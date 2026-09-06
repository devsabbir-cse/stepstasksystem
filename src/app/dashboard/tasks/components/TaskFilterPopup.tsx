"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface TaskFilterPopupProps {
  title: string;
  options?: FilterOption[];

  selectedValues?: string[];

  from?: string;
  to?: string;

  type: "multi" | "date";

  onChange: (values: string[]) => void;

  onDateChange?: (
    field: "from" | "to",
    value: string
  ) => void;

  onClose: () => void;
  onClear: () => void;
}

const TaskFilterPopup = ({
  title,
  options = [],
  selectedValues = [],
  from = "",
  to = "",
  type,
  onChange,
  onDateChange,
  onClose,
  onClear,
}: TaskFilterPopupProps) => {

  const toggleValue = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(
        selectedValues.filter(
          (value) => value !== id
        )
      );
    } else {
      onChange([
        ...selectedValues,
        id,
      ]);
    }
  };

  return (
    <div className="absolute right-0 top-10 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">

      {/* Header */}

      <div className="mb-3 flex items-center justify-between">

        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>

        <button
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={16} />
        </button>

      </div>

      {/* Multi Select */}

      {type === "multi" && (
        <div className="max-h-56 space-y-1 overflow-y-auto">

          {options.map((option) => {

            const selected =
              selectedValues.includes(option.id);

            return (
              <button
                key={option.id}
                onClick={() =>
                  toggleValue(option.id)
                }
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                  selected
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >

                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border ${
                    selected
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {selected && (
                    <Check size={12} />
                  )}
                </span>

                {option.label}

              </button>
            );
          })}

        </div>
      )}

      {/* Date */}

      {type === "date" && (
        <div className="space-y-3">

          <div>
            <label className="mb-1 block text-xs text-gray-500">
              From
            </label>

            <input
              type="date"
              value={from}
              onChange={(e) =>
                onDateChange?.(
                  "from",
                  e.target.value
                )
              }
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-500">
              To
            </label>

            <input
              type="date"
              value={to}
              onChange={(e) =>
                onDateChange?.(
                  "to",
                  e.target.value
                )
              }
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-orange-500"
            />
          </div>

        </div>
      )}

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">

        <button
          onClick={onClear}
          className="text-xs font-medium text-gray-500 hover:text-red-500"
        >
          Clear
        </button>

        <button
          onClick={onClose}
          className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700"
        >
          Apply
        </button>

      </div>

    </div>
  );
};

export default TaskFilterPopup;