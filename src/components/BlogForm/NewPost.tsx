"use client"; // needed for useform
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { postBlog } from "../../api/blog";
import { useSession } from "next-auth/react";

const NewPost = () => {
  const { data: session } = useSession();
  const user = session?.user.name;
  console.log(user);

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
        minRows={1}
      />
      <p>{errors.body?.message}</p>

      <TextField
        {...register("date", {
          required: "This is required",
          minLength: { value: 3, message: "Min length is 3" },
        })}
        fullWidth
        label="Date"
        multiline
        minRows={1}
      />
      <p>{errors.date?.message}</p>

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

      <Button type="submit" variant="contained" sx={{ my: 10 }}>
        Submit
      </Button>
    </form>
  );
};

export default NewPost;
