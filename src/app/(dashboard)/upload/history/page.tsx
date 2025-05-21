"use client";
import { Column, Table } from "@/components/table/Table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  UploadHistoryItem,
  UploadHistoryResponse,
} from "@/features/document_processing/types";
import { useDocumentProcessingService } from "@/features/document_processing/hooks/useService";

const columns: Column<UploadHistoryItem>[] = [
  {
    key: "task_id",
    label: "File",
    render: (task_id: string) => (
      <a
        href={`/download/${task_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Lihat File
      </a>
    ),
  },
  { key: "authors", label: "Author" },
  {
    key: "created_at",
    label: "Tanggal Upload",
    render: (created_at: string) =>
      new Date(created_at).toLocaleDateString("id-ID"),
  },
  {
    key: "status",
    label: "Status",
    render: (status: "queued" | "processed") => (
      <span
        className={`px-2 py-1 rounded text-white text-xs ${
          status === "processed" ? "bg-green-500" : "bg-yellow-500"
        }`}
      >
        {status}
      </span>
    ),
  },
];

export default function FileTablePage() {
  const queryParams = {};
  const {
    isLoadingUploadHistory: isLoading,
    uploadHistory: data,
    uploadHistoryError: error,
  } = useDocumentProcessingService({ queryParams: queryParams });

  const fileData = data?.data;

  return (
    <div className="px-4 py-4 md:px-8 md:py-8 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
      <h1 className="text-xl font-bold mb-4">Riwayat</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Gagal memuat data</p>
      ) : (
        <Table<UploadHistoryItem>
          columns={columns}
          data={fileData}
          currentPage={1}
          rowsPerPage={10}
        />
      )}
    </div>
  );
}
