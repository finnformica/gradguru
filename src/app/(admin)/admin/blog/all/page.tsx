"use client";
import { Container, Typography } from "@mui/material";
import BlogTable from "components/blog/BlogTable";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";

const BlogEditTable = () => {
  const session = useSession();

  if (!session) return <LoadingScreen />;

  return (
    <Container maxWidth="lg" sx={{ gap: 4 }}>
      <Typography variant="h4">All Blog Posts</Typography>
      <BlogTable />
    </Container>
  );
};

export default BlogEditTable;
