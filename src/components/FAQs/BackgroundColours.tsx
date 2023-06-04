import { useTheme } from "@mui/material";
import FullWidthContainer from "../Containers/FullWidthContainer";

const BackgroundColours = () => {
  const theme = useTheme();

  return (
    <>
      <FullWidthContainer
        sx={{
          height: "25%",
          backgroundColor: theme.palette.secondary.light,
        }}
      ></FullWidthContainer>
      <FullWidthContainer
        sx={{
          height: "75%",
          backgroundColor: theme.palette.secondary.dark,
        }}
      ></FullWidthContainer>
    </>
  );
};

export default BackgroundColours;
