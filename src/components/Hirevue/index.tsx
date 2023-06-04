import { useState } from "react";
import { Box, Container } from "@mui/material";

import MUIModal from "../Global/UdemyModal";
import SmallTitle from "../Titles/SmallTitle";

import ItemCard from "./ItemCard";
import cards from "./cards";

const Hirevue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container maxWidth="xl">
      <MUIModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: 2, md: 6 },
        }}
      >
        <SmallTitle sx={{ textAlign: "center", pb: 4 }}>
          Hirevue coaching
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
          {cards.map((item, key) => (
            <ItemCard
              key={key}
              {...item}
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Hirevue;
