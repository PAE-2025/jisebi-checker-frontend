"use server";
import LoginForm from "@/components/auth/LoginForm";
import { authOptions } from "@/lib/auth/options";
import { FileText } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/upload");
  }
  return (
    <main className="min-h-[80svh] flex flex-col items-center justify-center">
      <div className="w-[90%] max-w-md my-14  border border-gray-200 rounded-lg px-4 py-8 text-center space-y-4">
        <div className="flex flex-col gap-3 items-center justify-center">
          <FileText size={30} className="text-blue-600" />

          <h1 className="text-neutral-dark-900 text-2xl font-bold">
            Login to{" "}
            <span className=" text-brand-primary-500">JISEBI CHECKER</span>
          </h1>
          <p className="font-light">
            Enter your credentials to access the system
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
