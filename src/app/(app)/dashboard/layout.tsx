import { DashboardHeader } from "@/components/Headers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      <main>{children}</main>
    </>
  );
}
