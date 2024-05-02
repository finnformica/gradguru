"use client";

import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";

export const WelcomePanel = ({
  name,
  image,
  children,
}: {
  name: string;
  image?: string;
  children?: React.ReactNode;
}) => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.primary.light,
      width: { xs: "100%", lg: "60%" },
      borderRadius: 10,
    }}
  >
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems={{ xs: "center", md: "normal" }}
    >
      <Stack spacing={2} pt={8} pl={{ xs: 0, md: 6 }}>
        <Typography variant="h5" fontWeight={300} gutterBottom>
          Welcome back, {name} 👋
        </Typography>

        {children}
      </Stack>
      <Image
        src={image || "/imgs/3d/dashboard.svg"}
        alt="dashboard"
        width={300}
        height={300}
      />
    </Stack>
  </Box>
);
