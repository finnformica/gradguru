"use client"; // needed for useform
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { postBlog } from "../../api/blog";
import { useSession } from "next-auth/react";

const NewPost = () => {
  const { data: session } = useSession();
  const user = session?.user.name;
  let postDate = new Date().toDateString();
  // console.log(date);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      body: "",
      date: "",
      tags: "",
    },
  });
  // console.log(errors);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (user != undefined) {
          data.author = user;
          data.date = postDate;
          console.log(data);
          postBlog(null, data);
        } else {
          console.log("No session was detected: can not submit to firebase");
        }
      })}
    >
      <Typography variant="h6" sx={{ mb: "20px" }}>
        {user}
      </Typography>

      <TextField
        {...register("title", {
          required: "This is required",
          minLength: { value: 3, message: "Min length is 3" },
        })}
        fullWidth
        label="Title"
        multiline
        minRows={1}
      />
      <p>{errors.title?.message}</p>

      <TextField
        {...register("body", {
          required: "This is required",
          minLength: { value: 3, message: "Min length is 3" },
        })}
        fullWidth
        label="Body"
        multiline
        minRows={5}
      />
      <p>{errors.body?.message}</p>

      <TextField
        {...register("tags", {
          required: "This is required",
          minLength: { value: 3, message: "Min length is 3" },
        })}
        fullWidth
        label="tags"
        multiline
        minRows={1}
      />
      <p>{errors.tags?.message}</p>

      <Button type="submit" variant="contained" sx={{ mb: "20px" }}>
        Submit
      </Button>
    </form>
  );
};

export default NewPost;
