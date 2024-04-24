"use client";

import { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import { getBlogs } from "api/blog";
import { BlogCard } from "components/blog";
import { LoadingScreen } from "components/global-components";
import { IBlog } from "types/blog";

const BlogPage = () => {
  const [posts, setPosts] = useState<IBlog[]>([]);

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getBlogs(setPosts);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  if (!posts) return <LoadingScreen />;

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid key={post.slug} item width="100%">
            <BlogCard key={post.slug} {...post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
