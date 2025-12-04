import Sidebar from "@/widgets/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="flex-1">{children}</div>
    </>

  );
}