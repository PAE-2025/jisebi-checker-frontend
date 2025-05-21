"use client";

import { useDocumentProcessingService } from "@/features/document_processing/hooks/useService";
import { useDashboard } from "./DashboardContext";
import { FileText, LogOut, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTopLoader } from "nextjs-toploader";
import { UploadHistoryItem } from "@/features/document_processing/types";

export default function SideBar() {
  const { isSidebarOpen, closeSidebar } = useDashboard();
  const loader = useTopLoader();

  const {
    isLoadingUploadHistory: isLoading,
    uploadHistory: data,
    uploadHistoryError: error,
  } = useDocumentProcessingService({ queryParams: { limit: 10 } });

  const uploadedFiles: UploadHistoryItem[] = data?.data || [];

  const handleLogout = async () => {
    loader.start();
    await signOut();
    loader.done();
  };

  return (
    <>
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-white text-gray-800 z-40 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200">
          <Link href="/upload">
            <div className="flex items-center gap-2 font-semibold text-gray-700 text-base">
              <FileText className="text-blue-600" />
              JISEBI Checker
            </div>
          </Link>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={closeSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File List */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="flex justify-between items-baseline">
            <p className="text-xs text-gray-500 mb-2 px-2">Riwayat Upload</p>
            <Link
              href={"/upload/history"}
              className="text-xs text-blue-500 hover:text-blue-400 mb-2 px-2"
            >
              View All
            </Link>
          </div>
          {isLoading ? (
            <p className="text-sm text-gray-500 px-2">Memuat data...</p>
          ) : error ? (
            <p className="text-sm text-red-500 px-2">Gagal memuat data</p>
          ) : uploadedFiles.length === 0 ? (
            <p className="text-sm text-gray-500 px-2">Belum ada file</p>
          ) : (
            <ul className="space-y-1">
              {uploadedFiles.map((file) => (
                <li key={file.task_id}>
                  <Link
                    href={`/download/${file.task_id}`}
                    className="flex flex-col px-3 py-2 rounded-md hover:bg-gray-200 transition-colors break-all"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <FileText size={20} className="text-blue-400 shrink-0" />
                      <p className="truncate">{file.title || "Tanpa Judul"}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          file.status === "processed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {file.status === "processed" ? "Selesai" : "Menunggu"}
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Footer with Logout */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-100 px-3 py-2 rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            &copy; 2025 JISEBI Checker
          </p>
        </div>
      </aside>

      {/* Backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black opacity-20"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
