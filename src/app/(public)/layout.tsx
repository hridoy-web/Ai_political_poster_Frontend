export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Mahadi Hasan ভাই যখন Navbar ও Footer বানাবেন, তখন এখানে যুক্ত করবেন */}
      <div className="flex-1">{children}</div>
    </div>
  );
}