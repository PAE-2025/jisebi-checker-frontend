import UploadForm from "@/features/document_processing/components/UploadForm";

export default async function UploadPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white ">
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Upload Manuscript
          </h1>
          <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
            Upload your manuscript for checking and receive the processed file.
          </p>
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
