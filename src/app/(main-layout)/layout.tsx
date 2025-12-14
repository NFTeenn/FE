import NavigationSidebar from "@/widgets/sidebar/ui/navigationSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationSidebar />
      <div className="flex-1">{children}</div>
    </>

  );
}