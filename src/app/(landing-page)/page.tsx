import {
  Hero,
  CTA,
  Features,
  Practice,
  Companies,
} from "@/components/LandingPage/HomePage";
import Footer from "@/components/LandingPage/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CTA />
      <Features />
      <Practice />
      <Companies />
      <Footer />
    </>
  );
}
