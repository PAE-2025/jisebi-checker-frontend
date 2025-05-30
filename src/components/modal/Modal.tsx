import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Modal({
  children,
  onClose,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-screen bg-[#00000077] z-[45]"
      />
      <dialog
        open
        className={`backdrop fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 rounded-md px-6 py-4 w-[90%] max-w-md z-50 bg-brand-primary-025 shadow-lg text-gray-800 ${className}`}
        ref={dialogRef}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
