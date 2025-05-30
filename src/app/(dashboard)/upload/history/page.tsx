"use client";
import { Column, Table } from "@/components/table/Table";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  UploadHistoryItem,
  UploadHistoryResponse,
} from "@/features/document_processing/types";
import { useDocumentProcessingService } from "@/features/document_processing/hooks/useService";

export default function FileTablePage() {
  const queryParams = {};
  const {
    isLoadingUploadHistory: isLoading,
    uploadHistory: data,
    uploadHistoryError: error,
  } = useDocumentProcessingService({ queryParams: queryParams });

  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(
    null
  );
  const { downloadResult, isLoadingDownload, downloadError } =
    useDocumentProcessingService({
      taskId: selectedTaskId ?? undefined,
    });

  useEffect(() => {
    if (downloadResult.data) {
      const blob = new Blob([downloadResult.data], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedTaskId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setSelectedTaskId(null);
    }
  }, [downloadResult.data]);

  const columns: Column<UploadHistoryItem>[] = [
    {
      key: "task_id",
      label: "File",
      render: (task_id: string) => (
        <button
          className="text-blue-600 underline cursor-pointer"
          onClick={() => setSelectedTaskId(task_id)}
          disabled={isLoadingDownload && selectedTaskId === task_id}
        >
          {isLoadingDownload && selectedTaskId === task_id
            ? "Mengunduh..."
            : "Lihat File"}
        </button>
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
      render: (status: "queued" | "processed" | "awaiting") => (
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            status === "processed"
              ? "bg-green-500"
              : status === "awaiting"
              ? "bg-yellow-500"
              : "bg-blue-400"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

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
