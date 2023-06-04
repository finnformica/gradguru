import React, { useState } from "react";

import { Container } from "@mui/material";

import AccordionItem from "./AccordionItem";

type AccordionProps = {
  items: {
    title: string;
    description: string;
  }[];
};

const CustomAccordion = ({ items }: AccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container maxWidth="sm" sx={{ pt: 2 }}>
      {items.map((item, key) => (
        <AccordionItem
          key={key}
          num={key}
          {...item}
          expanded={expanded}
          onChange={handleChange}
        />
      ))}
    </Container>
  );
};

export default CustomAccordion;
