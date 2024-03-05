import { Box } from "@mui/material";

import Footer from "@/components/LandingPage/Footer";
import {
  CTA,
  Companies,
  Features,
  Hero,
  Practice,
} from "@/components/LandingPage/HomePage";

export default function Home() {
  return (
    <Box>
      <Hero />
      <CTA />
      <Features />
      <Practice />
      <Companies />
      <Footer />
    </Box>
  );
}
