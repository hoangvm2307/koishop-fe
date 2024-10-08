import MainLayout from '@/components/layouts/MainLayout';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
