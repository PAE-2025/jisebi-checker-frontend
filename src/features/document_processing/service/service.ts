import { createApi } from "@/lib/api";
import {
  ProcessDocumentParams,
  ProcessDocumentPayload,
  ProcessDocumentResponse,
  UploadHistoryResponse,
  UploadPayload,
  UploadResponse,
} from "../types";

export interface UploadHistoryQueryParams {
  status?: "queued" | "processed";
  limit?: number;
}
const api = await createApi(
  process.env.NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE ?? ""
);

export const uploadFile = async (
  payload: UploadPayload
): Promise<UploadResponse> => {
  try {
    const res = await api.post<UploadResponse>(`/api/upload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error("UPLOAD File ERROR:", error);
    throw new Error(
      error?.response?.data?.detail || "Gagal mengunggah dokumen."
    );
  }
};

export const processFile = async (payload: ProcessDocumentParams): Promise<ProcessDocumentResponse> => {
  try {
    const res = await api.put<ProcessDocumentResponse>(
      `/api/upload/${payload.taskId}`,
      payload.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error("proccess File ERROR:", error);
    throw new Error(
      error?.response?.data?.detail || "Gagal memproses dokumen."
    );
  }
};

export const getUploadHistory = async (
  queryParams: UploadHistoryQueryParams
): Promise<UploadHistoryResponse> => {
  try {
    const res = await api.get<UploadHistoryResponse>(`/api/upload`, {
      params: queryParams,
    });
    return res.data;
  } catch (error: any) {
    console.error("GET UPLOAD HISTORY ERROR:", error);
    throw new Error(
      error?.response?.data?.detail || "Gagal mengambil riwayat upload."
    );
  }
};

export const downloadReport = async (taskId: string): Promise<Blob> => {
  try {
    const res = await api.get<Blob>(`/api/download/${taskId}`, {
      responseType: "blob",
    });
    return res.data;
  } catch (error: any) {
    console.error("DOWNLOAD REPORT ERROR:", error);
    throw new Error(
      error?.response?.data?.detail || "Gagal mengunduh laporan."
    );
  }
};
