import { getHeroPhotoFile } from "api/blog";
import FormModalWrapper from "components/global-components/FormModalWrapper";
import { useEffect, useState } from "react";
import { IBlog, IBlogPage } from "types/blog";
import AddBlog from "./AddBlog";

type EditModalProps = {
  onClose: () => void;
  blogObject: IBlogPage;
};

const BlogEditModal = ({ onClose, blogObject }: EditModalProps) => {
  const [blogHeroPhotoFile, setBlogHeroPhotoFile] = useState<File | null>(null);
  useEffect(() => {
    getHeroPhotoFile(blogObject.slug, blogObject.imageId)
      .then((file) => setBlogHeroPhotoFile(file))
      .catch((e) => console.log(e));
  }, []);

  const open = true;
  const { created, slug, ...blogValues } = blogObject;
  const defaultValues = {
    ...blogValues,
    blogHeroPhoto: blogHeroPhotoFile,
  };

  const onSubmit = (data: IBlog): Promise<void> => {
    console.log(data);
    return Promise.resolve();
  };
  return (
    <FormModalWrapper
      title={blogObject.title}
      open={open}
      handleClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddBlog onSubmitBlog={onSubmit} defaultValues={defaultValues} />
    </FormModalWrapper>
  );
};

export default BlogEditModal;
