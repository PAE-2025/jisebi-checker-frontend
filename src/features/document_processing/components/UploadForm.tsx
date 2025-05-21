"use client";
import Input from "@/components/auth/Input";
import MainButton from "@/components/buttons/MainButton";
import { useDocumentProcessingService } from "../hooks/useService";
import toast from "react-hot-toast";
import { UploadPayload } from "../types";

// components/forms/UploadForm.tsx
export default function UploadForm() {
  const { isUploading, uploadFileAsync } = useDocumentProcessingService({});

  const uploadFile = async (data: UploadPayload) => {
    try {
      await uploadFileAsync(data);
      toast.success("FIle berhasil diUpload!");
    } catch (err: any) {
      toast.error(`Gagal mengupload: ${err.message}`);
    }
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const file = formData.get("file");

    if (!file || (file instanceof File && file.size === 0)) {
      toast.error("File Wajib diisi.");
      return;
    }
    uploadFile({ file: file as File });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        label="Title"
        placeholder="Title"
        type="text"
        className="px-2"
      />
      <div className="space-y-4 sm:flex gap-2">
        <Input
          id="firstName"
          label="First Name"
          placeholder="First name"
          type="text"
          className="px-2"
        />
        <Input
          id="lastName"
          label="Last Name"
          placeholder="Last name"
          type="text"
          className="px-2"
        />
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
  );
}
