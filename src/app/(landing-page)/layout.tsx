import { PrimaryHeader } from "@/components/LandingPage/Headers";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrimaryHeader />
      <main>{children}</main>
    </>
  );
}
