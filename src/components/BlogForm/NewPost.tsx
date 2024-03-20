"use client";
import { Typography } from "@mui/material";
import BuilderSearch from "./BuilderSearch";

const NewPostLayout = [{ type: String, value: "no items here yet" }];

const NewPost = () => {
  return (
    <>
      {NewPostLayout.map((item, i) => (
        <Typography key={i}>{item.value}</Typography>
      ))}
      {/* <BuilderModel /> */}
      <BuilderSearch />
    </>
  );
};

export default NewPost;
