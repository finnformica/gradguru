import SmallTitle from "../Titles/SmallTitle";

import CompanyLogos from "./CompanyLogos";
import Footer from "./Footer";
import FullWidthContainer from "../Containers/FullWidthContainer";

const Companies = () => {
  return (
    <FullWidthContainer sx={{ mt: 12 }}>
      <SmallTitle>Companies we're familiar with</SmallTitle>
      <CompanyLogos />
      <Footer />
    </FullWidthContainer>
  );
};

export default Companies;
