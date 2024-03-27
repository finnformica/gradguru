"use client";

import { Box, Container, Input, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

const AddBlog = () => {
  const [mdxDoc, setMdxDox] = useState("");

  return (
    <Container maxWidth="md">
      <form>
        <Stack direction={"column"} spacing={2} py={6}>
          <TextField label={"Blog Title"} />
          <TextField label={"Summary"} />
          <Input type={"file"} />
          <Box sx={{ border: "1px solid black", minHeight: 100 }}>
            <ReactQuill
              theme="snow"
              value={mdxDoc}
              onChange={setMdxDox}
              modules={modules}
            />
          </Box>
        </Stack>
      </form>
    </Container>
  );
};

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

export default AddBlog;
