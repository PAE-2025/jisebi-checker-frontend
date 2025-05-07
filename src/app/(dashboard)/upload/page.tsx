import MainButton from "@/components/buttons/MainButton";

export default async function UploadPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-xl border border-gray-200 rounded-2xl p-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Upload Manuscript
          </h1>
          <p className="text-gray-600">
            Upload your manuscript for checking and receive the processed file.
          </p>
          <div className="relative">
            <form action="">
              <input
                type="file"
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-blue-100 file:text-blue-700
                hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                transition-all duration-200 ease-in-out"
              />
              <MainButton className="w-full mt-6" type="submit">
                Check
              </MainButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
