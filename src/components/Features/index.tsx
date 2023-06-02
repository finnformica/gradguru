import { Container } from "@mui/material";

import ColouredContainer from "@/components/Containers/ColouredContainer";

import Title from "./Title";
import Content from "./Content";
import Footer from "./Footer";

const Features = () => {
  return (
    <Container maxWidth="xl">
      <ColouredContainer sx={{ mb: 8 }}>
        <Title />
        <Content />
        <Footer />
      </ColouredContainer>
    </Container>
  );
};
export default Features;
