import React from "react";

type StatusType = "success" | "warning" | "error" | "info" | string;

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  success: "bg-accent-success-050  text-accent-success-500",
  warning: "bg-accent-warning-050 text-accent-warning-500",
  error: "bg-accent-danger-050 text-accent-danger-500",
  info: "bg-brand-primary-050 text-brand-primary-500",
};
const circleStyle: Record<StatusType, string> = {
    success: "bg-accent-success-500",
    warning: "bg-accent-warning-500",
    error: "bg-accent-danger-500",
    info: "bg-brand-primary-500",
  };

export default function StatusBadge({ status, className, children }: StatusBadgeProps) {
  const badgeStyle = statusStyles[status] || statusStyles["info"];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${badgeStyle} ${className}`}
    >
      <span className={`w-2 h-2 ${circleStyle[status]} rounded-full mr-2`}></span>{children}
    </span>
  );
}
