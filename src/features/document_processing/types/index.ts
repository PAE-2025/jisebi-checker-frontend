// types/upload.ts
export type UploadPayload = {
  // authors: string;
  // title: string;
  file: File;
};

export type UploadResponse = {
  task_id: string;
  status: "queued" | "processed";
  success: boolean;
};

export type UploadHistoryItem = {
  created_at: string;
  task_id: string;
  authors: string;
  title: string;
  user_id: string;
  status: "queued" | "processed";
  updated_at: string;
};

export type UploadHistoryResponse = {
  status: boolean;
  data: UploadHistoryItem[];
};
