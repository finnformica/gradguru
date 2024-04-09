"use client";
import { Container, Grid, Stack } from "@mui/material";
import { useBlogs } from "api/blog";
import BlogCard from "components/BlogPage/BlogCard";
import { LoadingScreen } from "components/global-components";

const borderColor = "lightgrey";

const BlogPage = () => {
  const { blogs: posts } = useBlogs();

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
