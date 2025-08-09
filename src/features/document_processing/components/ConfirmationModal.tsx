import MainButton from "@/components/buttons/MainButton";
import Modal from "@/components/modal/Modal";
import { Loader2 } from "lucide-react";
import { processFile } from "../service/service";
import { useState } from "react";
import { ProcessDocumentParams } from "../types";
import Input from "@/components/auth/Input";

type ConfirmationModalProps = {
  defaultTitle?: string;
  defaultFirstName?: string;
  defaultLastName?: string;
  docxUrl?: string;
  taskId?: string | null;
  isProcessing?: boolean;
  onClose: () => void;
  onClick: () => void;
};

export default function ConfirmationModal({
  docxUrl,
  defaultTitle,
  defaultFirstName,
  defaultLastName,
  taskId = null,
  isProcessing = false,
  onClose,
  onClick,
}: ConfirmationModalProps) {

  const [title, setTitle] = useState(defaultTitle || "");
  const [firstName, setFirstName] = useState(defaultFirstName || "");
  const [lastName, setLastName] = useState(defaultLastName || "");

  async function startProcessFile (): Promise<void> { 
    await processFile({
      taskId: taskId!,
      body: {
        title: title,
        firstName: firstName,
        lastName: lastName,
      },
    } || { 
      taskId: "", 
      body: {
        title: "",
        firstName: "",
        lastName: "",
      } 
    });
    
    onClick();
    // <-- pastikan `taskId` tidak null
  }

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
          Title
          <Input placeholder={defaultTitle} onChange={(e) => setTitle(e.target.value)} defaultValue={defaultTitle}>
          </Input> 
        </p>
        <p className="text-md text-gray-800 font-medium">
          First Name
          <Input placeholder={defaultFirstName} onChange={(e) => setFirstName(e.target.value)} defaultValue={defaultFirstName}>
          </Input>  
        </p>
        <p className="text-md text-gray-800 font-medium">
          Last Name
          <Input placeholder={defaultLastName} onChange={(e) => setLastName(e.target.value)} defaultValue={defaultLastName}>
          </Input>   
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
          onClick={startProcessFile}
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
