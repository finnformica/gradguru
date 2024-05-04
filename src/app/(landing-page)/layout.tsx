import PrimaryHeader from "components/LandingPage/PrimaryHeader";

export default async function PrimaryLayout({
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
