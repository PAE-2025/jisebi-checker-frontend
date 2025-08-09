"use client";

import MainButton from "@/components/buttons/MainButton";
import Input from "./Input";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

export default function LoginForm() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const response = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "Invalid Credentials");
      }

      return response;
    },
    onSuccess: () => router.push("/upload"),
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!username || !password) {
      toast.error("Username dan password tidak boleh kosong.");
      return;
    }

    loginMutation.mutate({ username, password });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <Input
        id="username"
        label="Username"
        placeholder="John Doe"
        type="text"
        defaultValue={""}
      />
      <Input
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
        defaultValue={""}
      />
      <MainButton
        className="w-full mt-2"
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </MainButton>
    </form>
  );
}
