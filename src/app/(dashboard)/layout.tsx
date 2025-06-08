import AutoLogout from "@/components/layout/AutoLogout";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AutoLogout />
      <div className="flex h-screen overflow-hidden">
        <SideBar />

        <div className="flex flex-col w-full items-center">
          <Header />
          <main className="overflow-auto h-full w-full">{children}</main>
        </div>
      </div>
    </>
  );
}
