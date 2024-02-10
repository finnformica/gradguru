"use client";
import React from "react";
import { Container } from "@mui/material";
import BlogCard from "@/components/BlogPage/Cards/BlogCard";
import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { config } from "@/firebase/config";

const borderColor = "lightgrey";

// init firebase app
const app = initializeApp(config);

// init services
const db = getFirestore(app);

// collection ref
const colRef = collection(db, "blogs");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let blogs: any[] = [];
    snapshot.docs.forEach((doc) => {
      blogs.push({ ...doc.data(), id: doc.id });
    });
    console.log(blogs);
  })
  .catch((err) => {
    console.log(err.message);
  });

const BlogPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        borderRight: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
      }}
    >
      <BlogCard borderColor={borderColor} />
    </Container>
  );
};

export default BlogPage;
