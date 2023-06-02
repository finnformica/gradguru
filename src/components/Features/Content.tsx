import { Box } from "@mui/material";

import Item from "./Item";

import { features } from "@/constants";

const Content = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        justifyContent: "center",
        pt: 6,
      }}
    >
      {features.map((feature, key) => (
        <Item
          key={key}
          title={feature.title}
          description={feature.description}
          src={""}
        />
      ))}
    </Box>
  );
};

export default Content;
