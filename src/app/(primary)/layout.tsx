import Header from "@/components/Headers/PrimaryHeader";
import Footer from "@/components/Footer";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
