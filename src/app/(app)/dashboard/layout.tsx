import { Container, Typography } from "@mui/material";

import { DashboardHeader } from "@/components/Headers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      <main>
        <Container sx={{ pt: 4 }}>{children}</Container>
      </main>
    </>
  );
}
