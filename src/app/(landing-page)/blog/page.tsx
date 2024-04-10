"use client";
import { Container, Grid, Stack } from "@mui/material";
import { useBlogs } from "api/blog";
import BlogCard from "components/blog/BlogCard";
import { LoadingScreen } from "components/global-components";
import { config } from "lib/firebase/config";
import { initializeApp } from "firebase/app";

const borderColor = "lightgrey";

const BlogPage = () => {
  const { blogs: posts } = useBlogs();
  initializeApp(config);

  if (!posts) return <LoadingScreen />;

  return (
    <Container
      maxWidth="lg"
      sx={{
        borderRight: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,

        my: 4,
        py: 2,
      }}
    >
      <Stack direction={"column"} gap={2} alignItems={"center"}>
        {posts.map((post) => (
          <Grid key={post.slug} item>
            <BlogCard key={post.slug} id={post.slug} {...post} />
          </Grid>
        ))}
      </Stack>
    </Container>
  );
};

export default BlogPage;
