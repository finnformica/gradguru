import FormModalWrapper from "components/global-components/FormModalWrapper";
import { IBlogPage } from "types/blog";
import AddBlog from "./AddBlog";

type EditModalProps = {
  onClose: () => void;

  chosenRow: IBlogPage;
};

const EditModal = ({ onClose, chosenRow }: EditModalProps) => {
  const open = true;
  return (
    <FormModalWrapper
      title={chosenRow.title}
      open={open}
      handleClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddBlog storedBlog={chosenRow} handleClose={onClose} />
    </FormModalWrapper>
  );
};

export default EditModal;
