import ColouredContainer from "@/components/Containers/ColouredContainer";

import Title from "./Title";
import Content from "./Content";
import Footer from "./Footer";

const Features = () => {
  return (
    <ColouredContainer sx={{ mb: 8 }}>
      <Title />
      <Content />
      <Footer />
    </ColouredContainer>
  );
};
export default Features;
