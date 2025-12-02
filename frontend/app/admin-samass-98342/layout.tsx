"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_token="));

    if (!token) {
      router.push("/admin-samass-98342/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
