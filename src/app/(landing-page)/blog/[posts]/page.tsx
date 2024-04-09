"use client";

import { Container } from "@mui/material";
import BlogBack from "components/BlogPage/BlogBack";
import BlogPost from "components/BlogPage/BlogPost";
import { IBlog } from "components/BlogPage/types";
import { LoadingScreen } from "components/global-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "lib/firebase/config";

import { notFound } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {
  params: { posts: string };
}

const Post: FC<pageProps> = ({ params }) => {
  const [loadedDoc, setLoadedDoc] = useState<IBlog | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      const docRef = doc(db, "blogs", params.posts);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLoadedDoc(docSnap.data() as IBlog);
      } else {
        notFound();
      }
    };

    getBlog();
  }, [params.posts]);

  if (!loadedDoc) {
    return <LoadingScreen />;
  }
  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <BlogBack />
      <BlogPost {...loadedDoc} />
    </Container>
  );
};

export default Post;
