import { Container } from "@mui/material";
import CourseCards from "@/components/Dashboard/CourseCards";

const Dashboard = () => {
  return (
    <Container sx={{ pt: 4 }}>
      <CourseCards />
    </Container>
  );
};

export default Dashboard;
