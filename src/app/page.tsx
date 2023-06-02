"use client";

import Hero from "../components/Hero";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Practice from "../components/Practice";
import Companies from "../components/Companies";
import Footer from "@/components/Footer";

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
