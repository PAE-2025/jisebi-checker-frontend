"use client";
import { FileText, LogIn, LogOut, Upload } from "lucide-react";
import MainButton from "../buttons/MainButton";
import OutlinedButton from "../buttons/OutlinedButton";
import TextButton from "../buttons/TextButton";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 md:px-12 py-4 text-base">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-gray-800 tracking-tight">
            <FileText className="text-blue-600" />
            <p>JISEBI Checker</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link href={"/upload"}>
            <TextButton className="text-sm text-blue-700 font-medium flex items-center gap-2 px-3 py-2">
              <Upload className="text-blue-700" size={18} />
              Upload Manuscript
            </TextButton>
          </Link>

          {isLoggedIn ? (
            <OutlinedButton
              className="text-sm text-gray-700 font-medium flex items-center gap-2 px-3 py-2"
              onClick={() => {
                signOut();
              }}
            >
              <LogOut className="text-gray-700" size={18} />
              Logout
            </OutlinedButton>
          ) : (
            <Link href={"/login"}>
              <MainButton className="text-sm text-white bg-blue-600 hover:bg-blue-700 font-medium flex items-center gap-2 px-3 py-2">
                <LogIn size={18} />
                Login
              </MainButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
