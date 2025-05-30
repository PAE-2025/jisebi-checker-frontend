import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import SessionWrapper from "@/components/session/SessionWrapper";
import TanstackProvider from "@/components/tanstack/TanstackProvider";
import { Toaster } from "react-hot-toast";
import { DashboardProvider } from "@/components/layout/DashboardContext";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "JISEBI CHECKER",
  description: "Jisebi Checker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 antialiased text-sm 2xl:text-base min-h-screen`}
      >
        <div id="modal"></div>
        <NextTopLoader />
        <TanstackProvider>
          <DashboardProvider>
            <SessionWrapper session={session}>
              {children}
              <Toaster position="bottom-right" reverseOrder={false} />
            </SessionWrapper>
          </DashboardProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
