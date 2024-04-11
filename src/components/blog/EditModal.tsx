import FormModalWrapper from "components/global-components/FormModalWrapper";
import { IBlogPage } from "types/blog";
import AddBlog from "./AddBlog";

type EditModalProps = {
  slug: string;
  onClose: () => void;
  onSubmit: () => void;
  chosenRow: IBlogPage;
  open: boolean;
};

const EditModal = ({
  slug,
  onClose,
  onSubmit,
  open,
  chosenRow,
}: EditModalProps) => {
  return (
    <FormModalWrapper
      title={chosenRow.title}
      open={open}
      handleClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddBlog storedBlog={chosenRow} />
    </FormModalWrapper>
  );
};

export default EditModal;
