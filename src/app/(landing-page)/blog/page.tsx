"use client";
import { Container, Grid, Stack } from "@mui/material";
import { getBlogs } from "api/blog";
import BlogCard from "components/blog/BlogCard";
import { LoadingScreen } from "components/global-components";
import { initializeApp } from "firebase/app";
import { config } from "lib/firebase/config";
import { useEffect, useState } from "react";
import { IBlogCard } from "types/blog";

const borderColor = "lightgrey";

const BlogPage = () => {
  const [posts, setPosts] = useState<IBlogCard[]>([]);

  useEffect(() => {
    // add event listener on firestore collectionxX
    const unsubscribe = getBlogs(setPosts);
    // remove event listener on unmount
    return () => unsubscribe();
  }, []);
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
            <BlogCard key={post.slug} {...post} />
          </Grid>
        ))}
      </Stack>
    </Container>
  );
};

export default BlogPage;
