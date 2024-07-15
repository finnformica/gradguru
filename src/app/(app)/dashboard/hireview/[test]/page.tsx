import { Container, Stack, Typography } from "@mui/material";

const page = ({ params }: { params: { test: string } }) => {
  console.log(params);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack direction={"column"} gap={4}>
        <Typography variant="h3">{`Test: ${params.test}`}</Typography>
      </Stack>
    </Container>
  );
};

export default page;
