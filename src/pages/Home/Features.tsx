import ColouredContainer from "@/components/Containers/ColouredContainer";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import { features } from "@/constants";
import SquareButton from "@/components/Buttons/SquareButton";

type FeatureItemProps = {
  title: string;
  description: string;
  src: string;
};

const FeatureItem = ({ title, description, src }: FeatureItemProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={src} width={100} height={100} alt="Feature icon" />
      </Box> */}

      <Typography variant="h6" fontWeight={500}>
        {title}
      </Typography>
      <Typography variant="body2" fontWeight={200}>
        {description}
      </Typography>
    </Box>
  );
};

const Features = () => {
  return (
    <Box>
      <ColouredContainer>
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", pb: 1 }}
        >
          What we do
        </Typography>
        <Typography
          variant="body2"
          fontWeight={200}
          sx={{ textAlign: "center", maxWidth: "350px", margin: "auto" }}
        >
          All the online resources you need for success in your job
          applications.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          {features.map((feature, key) => (
            <FeatureItem
              key={key}
              title={feature.title}
              description={feature.description}
              src={""}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ width: "50%" }}>
            <Typography variant="h5" fontWeight={500}>
              Explore the courses
            </Typography>
            <Typography variant="body2" fontWeight={200}>
              Learn more about the different courses, course curriculum and our
              practice drills before you enroll.
            </Typography>
          </Box>
          <SquareButton>Explore courses</SquareButton>
        </Box>
      </ColouredContainer>
    </Box>
  );
};
export default Features;
