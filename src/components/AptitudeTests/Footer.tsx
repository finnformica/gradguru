import React from "react";
import SmallTitle from "../Titles/SmallTitle";

import accordionItems from "./accordionItems";
import CustomAccordion from "../Global/CustomAccordion";
import { Container } from "@mui/material";

const Footer = () => {
  return (
    <>
      <SmallTitle sx={{ textAlign: "center", pt: 4 }}>
        What's included?
      </SmallTitle>
      <CustomAccordion items={accordionItems} />
    </>
  );
};

export default Footer;
