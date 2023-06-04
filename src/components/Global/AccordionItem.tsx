import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionItemProps = {
  title: string;
  description: string;
};

const AccordionItem = ({ title, description }: AccordionItemProps) => {
  return (
    <Accordion
      sx={{
        "&.Mui-expanded": {
          margin: "auto",
        },
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        backgroundColor: "transparent",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          borderShadow: "none",
        }}
      >
        <Typography fontWeight={500}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography fontWeight={300}>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
