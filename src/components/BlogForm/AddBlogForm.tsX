"use client";
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { EmptyBlogCard, BlogCardState } from "./types";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import "firebase/database";
import { config } from "@/firebase/config";

const AddBlogForm: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogCardState>(EmptyBlogCard);

  const app = initializeApp(config);
  const db = getFirestore(app);
  const blogsCollection = collection(db, "blogs");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof BlogCardState
  ) => {
    const { value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc(blogsCollection, blogData);

    setBlogData(EmptyBlogCard);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Author"
          value={blogData.author}
          onChange={(e) => handleChange(e, "author")}
          multiline
          minRows={1}
        />
        <TextField
          fullWidth
          label="Date"
          id="date"
          value={blogData.date}
          onChange={(e) => handleChange(e, "date")}
          multiline
          minRows={1}
        />
        <TextField
          fullWidth
          label="Body"
          id="body"
          value={blogData.body}
          onChange={(e) => handleChange(e, "body")}
          multiline
          minRows={4}
        />
        <TextField
          fullWidth
          label="Tags"
          id="tags"
          value={blogData.tags}
          onChange={(e) => handleChange(e, "tags")}
          multiline
          minRows={1}
        />
        <TextField
          fullWidth
          label="Read time"
          id="read_time"
          value={blogData.read_time}
          onChange={(e) => handleChange(e, "read_time")}
          multiline
          minRows={1}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ color: "white" }}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default AddBlogForm;
