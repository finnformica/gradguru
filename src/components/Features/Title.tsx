import { Typography } from "@mui/material";

import SmallTitle from "../Titles/SmallTitle";

const Title = () => {
  return (
    <>
      <SmallTitle sx={{ textAlign: "center", pb: 2 }}>What we do</SmallTitle>
      <Typography
        variant="body2"
        fontWeight={300}
        sx={{ textAlign: "center", maxWidth: "350px", margin: "auto" }}
      >
        All the online resources you need for success in your job applications.
      </Typography>
    </>
  );
};

export default Title;
