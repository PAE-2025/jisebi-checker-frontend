"use client";

import { useState } from "react";
import clsx from "clsx";
import Input from "@/components/auth/Input";
import MainButton from "@/components/buttons/MainButton";
import { useRouter } from "nextjs-toploader/app";

type UserFormProps = {
  mode: "create" | "edit" | "view";
  initialValues?: {
    id: string;
    username: string;
    password: string;
    isAdmin: boolean;
  };
  isLoading?: boolean;
  onSubmit?: (data: {
    username: string;
    password: string;
    isAdmin: boolean;
  }) => void;
};

export default function UserForm({
  mode,
  initialValues,
  isLoading,
  onSubmit,
}: UserFormProps) {
  const [username, setUsername] = useState(initialValues?.username ?? "");
  const [password, setPassword] = useState(initialValues?.password ?? "");
  const [isAdmin, setIsAdmin] = useState(
    initialValues?.isAdmin ? "admin" : "user"
  );
  const isDisabled = mode === "view";
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled || isLoading) return;

    onSubmit?.({
      username,
      password,
      isAdmin: isAdmin === "admin",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isDisabled}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isDisabled}
        required={mode === "create"}
        placeholder={mode === "edit" ? "Kosongkan jika tidak diubah" : ""}
      />

      <div className="text-left w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          className={clsx(
            "w-full px-4 py-2 rounded-md border border-gray-300 text-gray-800",
            "placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none",
            "transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
          disabled={isDisabled}
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className=" bg-blue-50 text-blue-500 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed "
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Back
        </button>

        {mode !== "view" && (
          <MainButton type="submit" disabled={isLoading || isDisabled}>
            {isLoading
              ? "Loading..."
              : mode === "create"
              ? "Buat Pengguna"
              : mode === "edit"
              ? "Update Pengguna"
              : "Edit"}
          </MainButton>
        )}
        {mode === "view" && (
          <MainButton
            onClick={() => router.push(`/user/${initialValues?.id}/edit`)}
          >
            Edit
          </MainButton>
        )}
      </div>
    </form>
  );
}
