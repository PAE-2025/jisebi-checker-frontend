// types/upload.ts
export type UploadPayload = {
  // authors: string;
  // title: string;
  file: File;
};
export type UploadResponse = {
  status: boolean;
  data: {
    user_id: string;
    task_id: string;
    title: string;
    authors: {
      text: string;
      first_author: {
        first_name: string;
        last_name: string;
      };
    };
    status: "awaiting" | "queued" | "processed";
    url: string;
    success: boolean;
  };
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

export type ProcessDocumentResponse = {
  status: boolean;
};

export type ProcessDocumentPayload = {
  title?: string;
  firstName?: string;
  lastName?: string;
};
export type ProcessDocumentParams = {
  taskId: string;
  body: ProcessDocumentPayload;
}