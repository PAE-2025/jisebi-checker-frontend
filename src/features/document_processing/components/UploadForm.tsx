"use client";
import Input from "@/components/auth/Input";
import MainButton from "@/components/buttons/MainButton";
import { useDocumentProcessingService } from "../hooks/useService";
import toast from "react-hot-toast";
import { ProcessDocumentParams, UploadPayload } from "../types";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

// components/forms/UploadForm.tsx
export default function UploadForm() {
  const { isUploading, uploadFileAsync } = useDocumentProcessingService({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const [returnedFormData, setReturnedFormData] = useState<{
    title?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const { processFileAsync, isProcessing, processError } =
    useDocumentProcessingService();

  const processFile = async (params: ProcessDocumentParams) => {
    try {
      const result = await processFileAsync(params);
      setIsModalOpen(false);
      toast.success("File berhasil masuk antrian!");
    } catch (err: any) {
      toast.error(`Gagal memproses: ${err.message}`);
    }
  };

  const uploadFile = async (data: UploadPayload, formMeta: any) => {
    try {
      const result = await uploadFileAsync(data); // <-- pastikan return-nya punya `url`
      if (result?.data.url) {
        setReturnedFormData({
          title: result.data.title,
          firstName: result.data.authors.first_author.first_name,
          lastName: result.data.authors.first_author.last_name,
        });
        setUploadedFileUrl(result.data.url);
        setTaskId(result.data.task_id);
        setFormData(formMeta);
        setIsModalOpen(true);
      }
      toast.success("File berhasil diUpload!");
    } catch (err: any) {
      toast.error(`Gagal mengupload: ${err.message}`);
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const file = formData.get("file");

    if (!file || (file instanceof File && file.size === 0)) {
      toast.error("File Wajib diisi.");
      return;
    }

    uploadFile({ file: file as File }, { title, firstName, lastName });
  }

  return (
    <>
      {isModalOpen && uploadedFileUrl && (
        <ConfirmationModal
          defaultTitle={returnedFormData.title}
          defaultFirstName={returnedFormData.firstName}
          defaultLastName={returnedFormData.lastName}
          docxUrl={uploadedFileUrl}
          taskId={taskId!}
          isProcessing={isProcessing} // atau state loading
          onClose={() => setIsModalOpen(false)}
          onClick={() => { 
            setIsModalOpen(false)
            toast.success("File berhasil diproses! Cek histori anda")
            ; 
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div className="space-y-4 sm:flex gap-2">
          
        </div>
        <input
          id="file"
          name="file"
          type="file"
          accept=".docx"
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700
          hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          transition-all duration-200 ease-in-out"
        />
        <MainButton disabled={isUploading} className="w-full" type="submit">
          Check
        </MainButton>
      </form>
    </>
  );
}
