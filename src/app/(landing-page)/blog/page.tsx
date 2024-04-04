"use client";
import { Container, Grid } from "@mui/material";
import { useBlogs } from "api/blog";
import BlogCard from "components/BlogPage/Cards/BlogCard";
import { LoadingScreen } from "components/global-components";

const borderColor = "lightgrey";

const BlogPage = () => {
  const { blogs: posts } = useBlogs();

  if (posts === undefined) return <LoadingScreen />;

  if (posts !== undefined) {
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
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ justifyContent: "space-around" }}
        >
          {posts.map((post) => (
            <Grid key={post.slug} item>
              <BlogCard key={post.slug} id={post.slug} {...post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
};

export default BlogPage;
