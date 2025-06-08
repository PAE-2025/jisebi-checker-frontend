"use client";

import toast from "react-hot-toast";
import { useUserService } from "../hooks/useUserService";
import { UpdateUserPayload } from "../types";
import UserForm from "./UserForm";

export default function EditUser({ id }: { id: string }) {
  const {
    user,
    isLoadingUser,
    userError,
    updateUserAsync,
    isUpdating,
    updateError,
  } = useUserService({ id });

  const handleSubmit = async (data: UpdateUserPayload) => {
    try {
      await updateUserAsync({ id, payload: data });
      toast.success("User berhasil diupdate!");
    } catch (err: any) {
      toast.error(`Gagal update user: ${err.message}`);
    }
  };

  return (
    <div className="w-full max-w-4xl border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white">
      <div className="space-y-6">
        <h1 className="text-xl sm:text-xl font-bold text-gray-800 text-center sm:text-left">
          Edit User
        </h1>

        {isLoadingUser ? (
          <p>Loading...</p>
        ) : userError ? (
          <p className="text-red-500">Gagal memuat data user.</p>
        ) : (
          <UserForm
            mode="edit"
            onSubmit={handleSubmit}
            isLoading={isUpdating}
            initialValues={{
              id: user?.data.user._id ?? "",
              username: user?.data.user.username ?? "",
              password: "",
              isAdmin: user?.data.user.isAdmin ?? false,
            }}
          />
        )}
      </div>
    </div>
  );
}
