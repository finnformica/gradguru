"use client";
import { useBlogs } from "@/api/blog";
import BlogCard from "@/components/BlogPage/Cards/BlogCard";
import { Container } from "@mui/material";
import "firebase/firestore";

const borderColor = "lightgrey";

const BlogPage = () => {
  const { blogs: allPosts } = useBlogs();
  console.log(allPosts);

  if (allPosts != undefined)
    return (
      <Container
        maxWidth="md"
        sx={{
          borderRight: `1px solid ${borderColor}`,
          borderLeft: `1px solid ${borderColor}`,
        }}
      >
        {allPosts.map((blog) => (
          <BlogCard
            borderColor={borderColor}
            {...blog}
            id={blog.id}
            key={blog.id}
          />
        ))}
      </Container>
    );
};

export default BlogPage;
