import { authOptions } from "@/auth/config";
import PrimaryHeader from "@/components/LandingPage/PrimaryHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
