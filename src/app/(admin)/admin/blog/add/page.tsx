"use client";
import CreateBlog from "components/blog/CreateBlog";
import AddBlog from "components/blog/AddBlog";
import { blogForm } from "types/blog";

const onSubmit = (data: blogForm) => {
  console.log(data);
};

const AddBlogForm = () => {
  // return <CreateBlog />
  return <AddBlog onSubmitBlog={onSubmit} />;
};

export default AddBlogForm;
