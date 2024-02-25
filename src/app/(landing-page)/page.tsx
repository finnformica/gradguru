import { Box } from "@mui/material";

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
