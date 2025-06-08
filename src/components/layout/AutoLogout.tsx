"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AutoLogout() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "TokenExpired") {
      signOut();
    }
  }, [session]);

  return null;
}
