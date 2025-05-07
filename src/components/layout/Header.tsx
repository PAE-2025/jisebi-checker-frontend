"use client";

import { useDashboard } from "./DashboardContext";
import { Menu } from "lucide-react";

export default function Header() {
  const { openSidebar } = useDashboard();

  return (
    <header className="w-full px-4 py-4 bg-white border-b border-gray-200 flex items-center lg:hidden">
      {/* Tombol hamburger (muncul hanya di mobile) */}
      <button
        className="lg:hidden text-gray-600"
        onClick={openSidebar}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}
