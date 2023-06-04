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
  num: number;
  expanded: false | string;
  onChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

const AccordionItem = ({
  title,
  description,
  num,
  expanded,
  onChange,
}: AccordionItemProps) => {
  return (
    <Accordion
      onChange={onChange(`panel${num}`)}
      expanded={expanded === `panel${num}`}
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
        aria-controls={`panel${num}bh-content`}
        id={`panel${num}bh-header`}
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
