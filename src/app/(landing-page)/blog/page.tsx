"use client";
import { useBlogs } from "api/blog";
import BlogCard from "components/BlogPage/Cards/BlogCard";
import { LoadingScreen } from "components/global-components";
import { Container, Grid, useTheme } from "@mui/material";

const borderColor = "lightgrey";

const BlogPage = () => {
  const { blogs: posts } = useBlogs();

  if (posts === undefined) return <LoadingScreen />;

  if (posts !== undefined) {
    return (
      <Container
        maxWidth="md"
        sx={{
          borderRight: `1px solid ${borderColor}`,
          borderLeft: `1px solid ${borderColor}`,
          my: 4,
          py: 2,
        }}
      >
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.slog} item>
              <BlogCard
                key={post.slug}
                id={post.slug}
                borderColor={borderColor}
                {...post}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
};

export default BlogPage;
