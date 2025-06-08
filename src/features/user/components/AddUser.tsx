"use client";

import toast from "react-hot-toast";
import { useUserService } from "../hooks/useUserService";
import { CreateUserPayload } from "../types";
import UserForm from "./UserForm";

export default function AddUser() {
  const { createUserAsync, isCreating, createError } = useUserService();

  const handleSubmit = async (data: CreateUserPayload) => {
    try {
      await createUserAsync(data);
      toast.success("User berhasil dibuat!");
    } catch (err: any) {
      toast.error(`Gagal membuat user: ${err.message}`);
    }
  };

  return (
    <div className="w-full max-w-4xl border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white">
      <div className="space-y-6">
        <h1 className="text-xl sm:text-xl font-bold text-gray-800 text-center sm:text-left">
          Add User
        </h1>
        <UserForm mode="create" onSubmit={handleSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
}
