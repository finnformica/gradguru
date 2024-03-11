"use client";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import BlogCard from "@/components/BlogPage/Cards/BlogCard";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { config } from "@/firebase/config";
import { BlogsInterface } from "@/components/BlogPage/types/BlogsInterface";

const borderColor = "lightgrey";

// init firebase app
const app = initializeApp(config);

// init services
const db = getFirestore(app);

const BlogPage = () => {
  const [blogsArray, setBlogsArray] = useState<BlogsInterface[]>([]);

  useEffect(() => {
    // Define an asynchronous function inside useEffect to use await
    const fetchData = async () => {
      try {
        const fetchedBlogs = await fetchBlogs();
        setBlogsArray(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData(); // Call the asynchronous function
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <Container
      maxWidth="md"
      sx={{
        borderRight: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
      }}
    >
      {blogsArray.map((blog) => (
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

// Function to fetch data from the "blogs" collection
async function fetchBlogs(): Promise<BlogsInterface[]> {
  try {
    const blogsCollection = collection(db, "blogs");
    const snapshot = await getDocs(blogsCollection);
    const blogsData: BlogsInterface[] = [];

    snapshot.forEach((doc) => {
      const blogData = doc.data() as BlogsInterface; // Type assertion to BlogsInterface
      blogsData.push({ ...blogData, id: doc.id });
    });

    return blogsData;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}
