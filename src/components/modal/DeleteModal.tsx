import Modal from "./Modal"; // Assuming you have Modal component in the same directory

type DeleteModalProps = {
  title?: string;
  item?: string;
  isDeleting?: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteModal({
  title = "Confirm Deletion",
  item = "this item",
  isDeleting,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete {item}? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-center gap-4 font-semibold">
          <button
            disabled={isDeleting}
            onClick={isDeleting ? () => {} : onClose}
            className={`px-6 py-2 text-neutral-grey-500 bg-gray-100  hover:bg-gray-200 rounded-md focus:outline-none ${
              isDeleting ? "cursor-no-drop " : "cursor-pointer"
            }`}
          >
            {isDeleting ? "Loading..." : "cancel"}
          </button>
          <button
            disabled={isDeleting}
            onClick={isDeleting ? () => {} : onDelete}
            className={`px-6 py-2 text-red-50 bg-red-500 hover:bg-red-700 rounded-md focus:outline-none   ${
              isDeleting ? "cursor-no-drop " : "cursor-pointer"
            }`}
          >
            {isDeleting ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
