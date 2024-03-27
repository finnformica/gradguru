import PrimaryHeader from "components/LandingPage/PrimaryHeader";

export default async function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // if (session?.user) {
  //   redirect("/dashboard");
  // }

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
