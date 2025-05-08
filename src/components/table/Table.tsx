"use client";
import React, { useState } from "react";
import MainButton from "../buttons/MainButton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
};
type TableProps<T> = {
  columns: Column<T>[];
  currentPage: number;
  rowsPerPage: number;
  data?: T[];
  isLoading?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export function Table<T extends object>({
  columns,
  data,
  currentPage = 1,
  rowsPerPage = 10,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: TableProps<T>) {
  const searchParams = useSearchParams();

  const defaultSortBy = searchParams.get("sort_by") as keyof T | null;
  const defaultSortDirection = searchParams.get("sort_direction") as
    | "asc"
    | "desc"
    | null;

  const [sortColumn, setSortColumn] = useState<keyof T | null>(defaultSortBy);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    defaultSortDirection
  );

  //   const handleSort = (column: keyof T) => {
  //     const params = new URLSearchParams(searchParams.toString());

  //     if (sortColumn === column) {
  //       if (sortDirection === "asc") {
  //         setSortDirection("desc");
  //         params.set("sort_direction", "desc");
  //       } else if (sortDirection === "desc") {
  //         setSortColumn(null);
  //         setSortDirection(null);
  //         params.delete("sort_by");
  //         params.delete("sort_direction");
  //       } else {
  //         setSortDirection("asc");
  //         params.set("sort_direction", "asc");
  //       }
  //     } else {
  //       setSortColumn(column);
  //       setSortDirection("asc");
  //       params.set("sort_by", column.toString());
  //       params.set("sort_direction", "asc");
  //     }

  //     if (sortColumn !== column) {
  //       params.set("sort_by", column.toString());
  //     }

  //     router.push(`?${params.toString()}`);
  //   };

  return (
    <div className="w-full overflow-x-auto relative">
      <table className="w-full border-separate border-spacing-y-2 table-auto">
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left font-medium rounded-l-lg w-fit">
              No
            </th>

            {columns.map((column) => (
              <th key={String(column.key)} className="text-left font-medium">
                <button
                  className={`px-4 py-2 ${
                    column.sortable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {column.label}
                  {sortColumn === column.key && (
                    <span>
                      {sortDirection === "asc"
                        ? " ↑"
                        : sortDirection === "desc"
                        ? " ↓"
                        : ""}
                    </span>
                  )}
                </button>
              </th>
            ))}

            <th className="px-4 py-2 text-left font-medium rounded-r-lg w-fit">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white hover:bg-gray-50 transition rounded-lg w-fit"
              >
                <td className="px-4 py-3 text-gray-800 rounded-l-lg  w-fit border-y border-l border-gray-200">
                  {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                </td>

                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-4 py-2 text-gray-800 border-y border-gray-200"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}

                <td className="px-4 py-2 space-x-2 text-gray-800 rounded-r-lg border-y border-r border-gray-200 w-fit">
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="p-2  hover:bg-blue-400 bg-blue-500 rounded-md transition cursor-pointer"
                    >
                      <Eye className="text-blue-100" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md transition cursor-pointer"
                    >
                      <Pencil className="text-blue-600" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-md transition cursor-pointer"
                    >
                      <Trash2 className="text-red-600" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="text-center py-4 text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
