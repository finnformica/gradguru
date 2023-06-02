"use client";

import React from "react";

import { Container } from "@mui/material";

import Hero from "../components/Hero";
import CTA from "../components/CTA";
import Features from "../components/Features";

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Hero />
      <CTA />
      <Features />
    </Container>
  );
}
