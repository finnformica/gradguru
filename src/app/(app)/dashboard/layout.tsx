import { DashboardHeader } from "@/components/LandingPage/Headers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      <main>{children}</main>
    </>
  );
}
