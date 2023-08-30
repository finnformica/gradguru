import { Container } from "@mui/material";

import ColouredContainer from "@/components/Containers/ColouredContainer";

import ContainerTitle from "../Titles/ContainerTitle";
import Footer from "./Footer";
import FeaturesList from "../Global/FeaturesList";
import features from "./features";

const Features = () => {
  return (
    <Container maxWidth="xl">
      <ColouredContainer sx={{ mb: 8 }}>
        <ContainerTitle title="What We Do" maxWidth="350px">
          All the online resources you need for success in your job
          applications.
        </ContainerTitle>
        <FeaturesList features={features} />
        <Footer />
      </ColouredContainer>
    </Container>
  );
};
export default Features;
