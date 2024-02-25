import { Box, Typography, Button } from "@mui/material";

const NotFoundComponent = ({ href }: { href: string }) => {
  return (
    <Box
      sx={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        m: "auto",
        p: 4,
        transform: "translate(0, -20%)",
      }}
    >
      <Typography variant="h4">Not Found</Typography>
      <Typography>Could not find requested resource</Typography>
      <Button variant="contained" href={href}>
        Return home
      </Button>
    </Box>
  );
};

export default NotFoundComponent;
