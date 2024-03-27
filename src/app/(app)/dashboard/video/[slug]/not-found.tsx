"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box>
      <Typography variant="h4">Page Not Found!</Typography>
      <Typography variant="body2" color="text.secondary">
        Sorry, we could not find the page you're looking for.
      </Typography>
      <Link href="/dashboard">Return Home</Link>
    </Box>
  );
}
