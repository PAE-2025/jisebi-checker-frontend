import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  downloadReport,
  getUploadHistory,
  uploadFile,
  processFile, // 🆕 Tambahkan ini
  UploadHistoryQueryParams,
} from "../service/service";
import {
  UploadHistoryResponse,
  UploadPayload,
  UploadResponse,
  ProcessDocumentResponse,
  ProcessDocumentPayload,
  ProcessDocumentParams,
} from "../types";

export const useDocumentProcessingService = ({
  queryParams,
  taskId,
}: {
  queryParams?: UploadHistoryQueryParams;
  taskId?: string;
} = {}) => {
  const queryClient = useQueryClient();

  // Query: Upload history
  const uploadHistoryQuery = useQuery<UploadHistoryResponse, Error>({
    queryKey: ["uploadHistory", queryParams],
    queryFn: () => getUploadHistory(queryParams!),
    enabled: Boolean(queryParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  // Query: Download report
  const downloadReportQuery = useQuery<Blob, Error>({
    queryKey: ["downloadReport", taskId],
    queryFn: () => downloadReport(taskId!),
    enabled: Boolean(taskId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  // Mutation: Upload File
  const uploadFileMutation = useMutation<UploadResponse, Error, UploadPayload>({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadHistory"] });
      queryClient.refetchQueries({ queryKey: ["uploadHistory"] });
    },
  });

  // 🆕 Mutation: Process File
  const processFileMutation = useMutation<
    ProcessDocumentResponse,
    Error,
    ProcessDocumentParams,
    string
  >({
    mutationFn: processFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadHistory"] });
      queryClient.refetchQueries({ queryKey: ["uploadHistory"] });
    },
  });

  return {
    // Upload
    uploadFile: uploadFileMutation.mutate,
    uploadFileAsync: uploadFileMutation.mutateAsync,
    isUploading: uploadFileMutation.isPending,
    uploadError: uploadFileMutation.error,

    // History
    uploadHistory: uploadHistoryQuery.data,
    isLoadingUploadHistory: uploadHistoryQuery.isLoading,
    uploadHistoryError: uploadHistoryQuery.error,

    // Download
    downloadResult: downloadReportQuery,
    isLoadingDownload: downloadReportQuery.isLoading,
    downloadError: downloadReportQuery.error,

    // 🆕 Process
    processFile: processFileMutation.mutate,
    processFileAsync: processFileMutation.mutateAsync,
    isProcessing: processFileMutation.isPending,
    processError: processFileMutation.error,
  };
};
