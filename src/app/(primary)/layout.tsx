import { PrimaryHeader } from "@/components/Headers";
import Footer from "@/components/Footer";

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
