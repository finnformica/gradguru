import { Container, Grid } from "@mui/material";

import companies from "./companies";
import Image from "next/image";

const CompanyLogos = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={0}>
        {companies.map((item, key) => (
          <Grid key={key} item xs={4} md={2}>
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

export default CompanyLogos;
