import { Box } from "@mui/material";
import SmallTitle from "../Titles/SmallTitle";

import { practice } from "@/constants";
import ItemCard from "./ItemCard";

const Practice = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SmallTitle sx={{ textAlign: "center", pb: 4 }}>
        Practice drills for every stage of the process
      </SmallTitle>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: { xs: 4, md: 2, lg: 8 },
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {practice.map((item, key) => (
          <ItemCard key={key} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default Practice;
