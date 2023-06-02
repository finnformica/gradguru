import React from "react";
import SmallerTitle from "../Titles/SmallerTitle";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <SmallerTitle sx={{ pt: 2 }}>Our Companies</SmallerTitle>
      <Typography variant="body2" sx={{ maxWidth: "60%" }}>
        We work with leading graduate recruiters across a wide range of
        industries such as investment banking, Professional Services, Legal and
        many more. Our courses are aimed at specific roles for each of these
        companies so you don’t have to worry about differing application
        processes.
      </Typography>
    </>
  );
};

export default Footer;
