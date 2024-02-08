import { PrimaryHeader } from "@/components/LandingPage/Headers";
import Footer from "@/components/LandingPage/Footer";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrimaryHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
