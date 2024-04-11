import { Box, Modal, Typography } from "@mui/material";
import { getBlog } from "api/blog";
import FormModalWrapper from "components/global-components/FormModalWrapper";
import { doc, getDoc } from "firebase/firestore";
import { db } from "lib/firebase/config";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { IBlogPage } from "types/blog";

type EditModalProps = {
  slug: string;
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
};

const EditModal = ({ slug, onClose, onSubmit, open }: EditModalProps) => {
  const [loadedDoc, setLoadedDoc] = useState<IBlogPage | null>(null);

  useEffect(() => {
    getBlog(slug).then((doc) => setLoadedDoc(doc as IBlogPage));
  }, []);

  if (!loadedDoc) return;

  return (
    <FormModalWrapper
      title={loadedDoc.title}
      open={open}
      handleClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {loadedDoc.title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </FormModalWrapper>
  );
};

export default EditModal;

const style = {
  position: "absolute" as "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
