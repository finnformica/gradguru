import { Container } from "@mui/material";

import ColouredContainer from "@/components/Containers/ColouredContainer";

import ContainerTitle from "../Titles/ContainerTitle";
import Content from "./Content";
import Footer from "./Footer";

const Features = () => {
  return (
    <Container maxWidth="xl">
      <ColouredContainer sx={{ mb: 8 }}>
        <ContainerTitle title="What we do" maxWidth="350px">
          All the online resources you need for success in your job
          applications.
        </ContainerTitle>
        <Content />
        <Footer />
      </ColouredContainer>
    </Container>
  );
};
export default Features;
