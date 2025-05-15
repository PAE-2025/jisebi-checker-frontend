"use client";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export default function Input({
  id,
  label,
  type = "text",
  placeholder = "",
  className = "",
  labelClassName = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="text-left w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          autoComplete={isPassword ? "current-password" : ""}
          className={`
            w-full px-4 py-2 ${
              isPassword && "pr-10"
            } rounded-md border border-gray-300 text-gray-800
            placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none
            transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
