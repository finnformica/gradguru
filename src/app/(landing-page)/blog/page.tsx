"use client";
import { useBlogs } from "@/api/blog";
import BlogCard from "@/components/BlogPage/Cards/BlogCard";
import { LoadingScreen } from "@/components/global-components";
import { Container } from "@mui/material";

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
        }}
      >
        {posts.map((post) => (
          <BlogCard
            borderColor={borderColor}
            {...post}
            id={post.id}
            key={post.id}
          />
        ))}
      </Container>
    );
  }
};

export default BlogPage;
