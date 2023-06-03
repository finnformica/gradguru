import { Box, Container } from "@mui/material";
import SmallTitle from "../Titles/SmallTitle";

import { practice } from "@/constants";
import ItemCard from "./ItemCard";

const Practice = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: 2, md: 6 },
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
          }}
        >
          {practice.map((item, key) => (
            <ItemCard key={key} {...item} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Practice;
