"use client";

import Link from "next/link";
import { Container } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="lg">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/dashboard">Return Home</Link>
    </Container>
  );
}
