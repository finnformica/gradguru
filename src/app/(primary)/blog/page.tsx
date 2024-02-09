"use client";
import React from "react";
import { Container } from "@mui/material";
import BlogCard from "@/components/BlogPage/Cards/BlogCard";

const borderColor = "lightgrey";

const BlogPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        borderRight: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
      }}
    >
      <BlogCard borderColor={borderColor} />
    </Container>
  );
};

export default BlogPage;
