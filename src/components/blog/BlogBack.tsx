import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const BlogBack = () => {
  const router = useRouter();

  return (
    <Button
      sx={{ my: 2, color: "black" }}
      startIcon={<ArrowBackIcon />}
      onClick={() => router.push("/blog")}
    >
      Back
    </Button>
  );
};

export default BlogBack;
