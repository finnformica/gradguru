import { Modal, Box, Typography } from "@mui/material";
import SmallTitle from "components/LandingPage/Titles/SmallTitle";
import SquareButton from "components/LandingPage/Buttons/SquareButton";

type UdemyModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "60%", lg: "30%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const UdemyModal = ({ open, setOpen }: UdemyModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SmallTitle>gradguru is in beta!</SmallTitle>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          We are currently working on the courses and will be launching them
          soon. For now, you can get a taste of what we offer on Udemy.
        </Typography>
        <SquareButton
          href="https://www.udemy.com/course/the-complete-guide-to-securing-a-big-4-offer"
          sx={{ mt: 4 }}
        >
          Go to Udemy
        </SquareButton>
      </Box>
    </Modal>
  );
};

export default UdemyModal;
