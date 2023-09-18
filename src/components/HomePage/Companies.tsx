import Image from "next/image";
import { Container, Typography, Grid } from "@mui/material";

import SmallTitle from "@/components/Titles/SmallTitle";
import SmallerTitle from "@/components/Titles/SmallerTitle";
import FullWidthContainer from "@/components/Containers/FullWidthContainer";

const companies = [
  {
    name: "Deloitte",
    src: "/imgs/company-logos/logo1.png",
  },
  {
    name: "PwC",
    src: "/imgs/company-logos/logo2.png",
  },
  {
    name: "KPMG",
    src: "/imgs/company-logos/logo3.png",
  },
  {
    name: "EY",
    src: "/imgs/company-logos/logo4.png",
  },
  {
    name: "JP Morgan",
    src: "/imgs/company-logos/logo5.png",
  },
  {
    name: "BAE Systems",
    src: "/imgs/company-logos/logo6.png",
  },
];

const CompanyLogos = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={0}>
        {companies.map((item, key) => (
          <Grid key={key} item xs={6} sm={4} md={2}>
            <Image
              width={100}
              height={100}
              key={key}
              src={item.src}
              alt={`${item.name} logo`}
              style={{ objectFit: "contain" }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Footer = () => {
  return (
    <>
      <SmallerTitle sx={{ pt: 2 }}>Our Companies</SmallerTitle>
      <Typography variant="body2" sx={{ maxWidth: "60%" }}>
        We work with leading graduate recruiters across a wide range of
        industries such as investment banking, Professional Services, Legal and
        many more. Our courses are aimed at specific roles for each of these
        companies so you don’t have to worry about differing application
        processes.
      </Typography>
    </>
  );
};

const Companies = () => {
  return (
    <FullWidthContainer sx={{ mt: 12 }}>
      <SmallTitle>Companies We Are Familiar With</SmallTitle>
      {/* <SmallTitle>Companies Schemes We Coach</SmallTitle> */}
      <CompanyLogos />
      <Footer />
    </FullWidthContainer>
  );
};

export default Companies;
