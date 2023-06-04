import React from "react";
import SmallTitle from "../Titles/SmallTitle";

import accordionItems from "./accordionItems";
import AccordionItem from "../Global/AccordionItem";
import { Container } from "@mui/material";

const Footer = () => {
  return (
    <>
      <SmallTitle sx={{ textAlign: "center", pt: 4 }}>
        What's included?
      </SmallTitle>
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        {accordionItems.map((item, key) => (
          <AccordionItem key={key} {...item} />
        ))}
      </Container>
    </>
  );
};

export default Footer;
