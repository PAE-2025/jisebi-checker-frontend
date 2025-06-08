"use client";

import { useUserService } from "../hooks/useUserService";
import UserForm from "./UserForm";

export default function ViewUser({ id }: { id: string }) {
  const { user, isLoadingUser, userError } = useUserService({
    id: id,
  });
  return (
    <div className="w-full max-w-4xl border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white ">
      <div className="space-y-6">
        <h1 className="text-xl sm:text-xl font-bold text-gray-800 text-center sm:text-left">
          View User
        </h1>
        {isLoadingUser ? (
          <p>Loading...</p>
        ) : (
          <UserForm
            mode="view"
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
