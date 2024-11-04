"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import "@/styles/globals.css";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken !== "THIS_IS_ADMIN_TOKEN") {
      localStorage.removeItem("adminToken");
      // router.push("/login");
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <AdminPanelLayout>{children}</AdminPanelLayout>
      </body>
    </html>
  );
}
