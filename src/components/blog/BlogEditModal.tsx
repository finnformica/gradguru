import {
  addBlog,
  blogStorage,
  deleteBlogStorage,
  getHeroPhotoFile,
} from "api/blog";
import FormModalWrapper from "components/global-components/FormModalWrapper";
import { useEffect, useState } from "react";
import { IBlog, IBlogPage } from "types/blog";
import CrudBlog from "components/blog/CrudBlog";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

type EditModalProps = {
  onClose: () => void;
  blogObject: IBlogPage;
};

const BlogEditModal = ({ onClose, blogObject }: EditModalProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
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

  const onSubmit = (data: IBlog) => {
    let imageId;
    let blogSlug;
    if (!session?.user?.name || !data.blogHeroPhoto) return;
    const { name } = session.user;
    const { blogHeroPhoto, ...dbUpload } = data;
    deleteBlogStorage(blogObject.imageId, blogObject.slug);
    blogStorage(blogHeroPhoto, data.title).then((res) => {
      ({ imageId, blogSlug } = res);
      addBlog(blogSlug, {
        ...dbUpload,
        author: name,
        imageId: imageId,
        slug: blogSlug,
        created: Date.now(),
      })
        .then(() => enqueueSnackbar("Blog has been updated"))
        .catch((e) =>
          enqueueSnackbar(`Error updating the blog: ${e.message}`, {
            variant: "error",
          })
        )
        .finally(onClose);
    });
  };

  return (
    <FormModalWrapper
      title={blogObject.title}
      open={open}
      handleClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!blogHeroPhotoFile ? (
        <LoadingScreen />
      ) : (
        <CrudBlog onSubmitBlog={onSubmit} defaultValues={defaultValues} />
      )}
    </FormModalWrapper>
  );
};

export default BlogEditModal;
