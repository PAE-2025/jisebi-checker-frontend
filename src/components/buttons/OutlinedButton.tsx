interface OutlinedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function OutlinedButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
}: OutlinedButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border border-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
