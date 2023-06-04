import { Box } from "@mui/material";

import Item from "./Item";

type FeaturesListProps = {
  features: {
    title: string;
    description: string;
    src: string;
  }[];
};

const FeaturesList = ({ features }: FeaturesListProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        justifyContent: "center",
        pt: 6,
      }}
    >
      {features.map((feature, key) => (
        <Item
          key={key}
          title={feature.title}
          description={feature.description}
          src={feature.src}
        />
      ))}
    </Box>
  );
};

export default FeaturesList;
