"use client"; // needed for useform
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { postBlog } from "../../api/blog";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { author: "" } });
  // console.log(errors);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        postBlog(null, data);
      })}
    >
      <TextField
        {...register("author", {
          required: "This is required",
          minLength: { value: 3, message: "Min length is 3" },
        })}
        fullWidth
        label="Author"
        multiline
        minRows={1}
      />
      <p>{errors.author?.message}</p>
      <Button type="submit" variant="contained" sx={{ my: 10 }}>
        Submit
      </Button>
    </form>
  );
};

export default NewPost;
