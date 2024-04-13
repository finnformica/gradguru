import FormModalWrapper from "components/global-components/FormModalWrapper";
import { IBlogPage } from "types/blog";
import CreateBlog from "./CreateBlog";

type EditModalProps = {
  onClose: () => void;
  blogObject: IBlogPage;
};

const BlogEditModal = ({ onClose, blogObject }: EditModalProps) => {
  const open = true;
  return (
    <FormModalWrapper
      title={blogObject.title}
      open={open}
      handleClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CreateBlog storedBlog={blogObject} handleClose={onClose} />
    </FormModalWrapper>
  );
};

export default BlogEditModal;
