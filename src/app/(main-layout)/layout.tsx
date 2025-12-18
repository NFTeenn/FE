import NavigationSidebar from "@/widgets/sidebar/ui/navigationSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <NavigationSidebar />
      <div className="flex-1">{children}</div>
    </div>

  );
}