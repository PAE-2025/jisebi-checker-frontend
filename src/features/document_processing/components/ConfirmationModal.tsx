import MainButton from "@/components/buttons/MainButton";
import Modal from "@/components/modal/Modal";
import { Loader2 } from "lucide-react";

type ConfirmationModalProps = {
  title?: string;
  firstName?: string;
  lastName?: string;
  docxUrl?: string;
  isProcessing?: boolean;
  onClose: () => void;
  onClick: () => void;
};

export default function ConfirmationModal({
  title = "Confirmation",
  firstName,
  lastName,
  docxUrl,
  isProcessing = false,
  onClose,
  onClick,
}: ConfirmationModalProps) {
  return (
    <Modal
      onClose={onClose}
      className="w-full max-w-8xl max-h-[90vh] overflow-auto rounded-xl shadow-2xl px-0 py-0 bg-white"
    >
      <h2 className="text-center font-bold text-xl mb-6 text-gray-900">
        PROCESS THIS FILE
      </h2>

      <div className="space-y-4 mb-6">
        <p className="text-md text-gray-800 font-medium">
          Title: <strong className="text-blue-600">{title || " -"}</strong>
        </p>
        <p className="text-md text-gray-800 font-medium">
          First Name:{" "}
          <strong className="text-blue-600">{firstName || " -"}</strong>
        </p>
        <p className="text-md text-gray-800 font-medium">
          Last Name:{" "}
          <strong className="text-blue-600">{lastName || " -"}</strong>
        </p>
      </div>

      <div className="mb-6">
        <p className="text-md text-gray-800 font-medium">
          Are you sure you want to process this{" "}
          <strong className="text-blue-600">.docx</strong> file?
        </p>
      </div>

      {docxUrl && (
        <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
            <h3 className="font-medium text-gray-700">Document Preview</h3>
          </div>
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              docxUrl
            )}&embedded=true`}
            className="w-full min-h-[500px]"
            frameBorder="0"
            title="Document Preview"
          />
        </div>
      )}

      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <MainButton
          onClick={onClick}
          disabled={isProcessing}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing && <Loader2 className="h-5 w-5 animate-spin" />}
          <span>Process</span>
        </MainButton>
      </div>
    </Modal>
  );
}
