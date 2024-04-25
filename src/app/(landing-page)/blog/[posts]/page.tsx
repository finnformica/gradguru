"use client";

import { doc, getDoc } from "firebase/firestore";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrowBack } from "@mui/icons-material";
import { Button, Container } from "@mui/material";

import { BlogPost } from "components/blog";
import { LoadingScreen } from "components/global";

import { db } from "lib/firebase/config";
import { IBlog } from "types/blog";

const Post = ({ params }: { params: { posts: string } }) => {
  const router = useRouter();
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

  if (!loadedDoc) return <LoadingScreen />;

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Button
        sx={{ my: 2, color: "black" }}
        startIcon={<ArrowBack />}
        onClick={() => router.push("/blog")}
      >
        Back
      </Button>
      <BlogPost {...loadedDoc} />
    </Container>
  );
};

export default Post;
