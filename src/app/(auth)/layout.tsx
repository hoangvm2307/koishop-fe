import MainLayout from "@/components/layouts/MainLayout";
import QueryProvider from "@/components/provider/QueryProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <MainLayout>{children}</MainLayout>
    </QueryProvider>
  );
}