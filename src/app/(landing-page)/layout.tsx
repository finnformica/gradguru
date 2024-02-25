import { PrimaryHeader } from "@/components/LandingPage/Headers";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrimaryHeader />
      <main
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        {children}
      </main>
    </>
  );
}
