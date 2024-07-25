import { Box, Container, Divider, Stack, Typography } from "@mui/material";

const CourseSalesPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <Container maxWidth="xl" sx={{ textAlign: "center", pt: 8 }}>
      <Stack spacing={1}>
        <Typography variant="h3" fontSize={48}>
          Big 4 Consulting
        </Typography>
        <Typography color="text.secondary">
          Challenging multi-step experiences with tests, videos, and additional
          resources
        </Typography>
      </Stack>

      <Divider sx={{ mx: "auto", width: "200px", my: 8 }} />

      <Box textAlign="left">
        <h2>Unlock Your Potential and Kickstart Your Career with the Big 4!</h2>
        <p>
          Are you ready to embark on an exciting journey with one of the world's
          leading consulting firms? Our Big 4 Graduate Scheme Course is designed
          to equip ambitious graduates like you with the skills, knowledge, and
          experience needed to excel in the fast-paced world of consulting. Join
          us and become part of the next generation of industry leaders.
        </p>

        <h3>Why Choose the Big 4?</h3>
        <p>
          The Big 4 consulting firms—Deloitte, PwC, EY, and KPMG—are renowned
          for their innovation, expertise, and global reach. By joining their
          ranks, you will gain unparalleled access to:
        </p>
        <ul>
          <li>
            <strong>World-Class Training:</strong> Receive comprehensive
            training and development from industry experts.
          </li>
          <li>
            <strong>Diverse Opportunities:</strong> Work across a variety of
            sectors and industries, solving complex problems for top-tier
            clients.
          </li>
          <li>
            <strong>Global Network:</strong> Connect with professionals and
            alumni from around the globe.
          </li>
          <li>
            <strong>Career Progression:</strong> Fast-track your career with
            clear pathways to leadership roles.
          </li>
        </ul>

        <h3>About Our Graduate Scheme Course</h3>
        <p>
          Our course is meticulously crafted to prepare you for the challenges
          and opportunities that await you in the consulting industry. We focus
          on developing a wide range of skills that are essential for success in
          the Big 4:
        </p>

        <h4>Technical Skills:</h4>
        <ul>
          <li>
            Master the latest tools and technologies used in data analysis,
            project management, and more.
          </li>
          <li>
            Gain expertise in financial modeling, risk assessment, and strategic
            planning.
          </li>
        </ul>

        <h4>Professional Skills:</h4>
        <ul>
          <li>
            Hone your communication, presentation, and negotiation skills.
          </li>
          <li>
            Learn how to manage client relationships and work effectively in
            teams.
          </li>
        </ul>

        <h4>Industry Knowledge:</h4>
        <ul>
          <li>
            Stay ahead of the curve with insights into emerging trends and
            market dynamics.
          </li>
          <li>
            Understand the regulatory environment and its impact on businesses.
          </li>
        </ul>

        <h4>Real-World Experience:</h4>
        <ul>
          <li>
            Engage in live projects and case studies that mimic real consulting
            challenges.
          </li>
          <li>Benefit from internships and placements with leading firms.</li>
        </ul>

        <h3>What You Will Gain</h3>
        <ul>
          <li>
            <strong>Certification of Completion:</strong> Recognized by all Big
            4 firms as a mark of your readiness to contribute effectively from
            day one.
          </li>
          <li>
            <strong>Mentorship:</strong> Guidance from experienced consultants
            who have been where you are.
          </li>
          <li>
            <strong>Networking Events:</strong> Opportunities to meet and
            connect with potential employers and industry leaders.
          </li>
        </ul>

        <h3>Who Should Apply?</h3>
        <p>
          Our course is ideal for recent graduates or final-year students who
          are:
        </p>
        <ul>
          <li>Passionate about problem-solving and driving change</li>
          <li>Eager to learn and grow in a dynamic, challenging environment</li>
          <li>
            Interested in building a career in consulting, finance, or related
            fields
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default CourseSalesPage;
