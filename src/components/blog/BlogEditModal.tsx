"use client";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import {
  updateBlog,
  blogStorage,
  deleteBlogStorage,
  getHeroPhotoFile,
} from "api/blog";
import CrudBlog from "components/blog/CrudBlog";
import { LoadingScreen } from "components/global-components";
import FormModalWrapper from "components/global-components/FormModalWrapper";

import { IBlog } from "types/blog";

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  blogObject: IBlog;
};

const BlogEditModal = ({ open, onClose, blogObject }: EditModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [blogHeroPhotoFile, setBlogHeroPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    getHeroPhotoFile(blogObject.slug, blogObject.heroPhoto as string)
      .then((file) => setBlogHeroPhotoFile(file))
      .catch((e) => console.log(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues = {
    ...blogObject,
    heroPhoto: blogHeroPhotoFile,
  } as IBlog;

  const onSubmit = (data: IBlog) => {
    const { heroPhoto, ...payload } = data;

    deleteBlogStorage(blogObject.heroPhoto as string, blogObject.slug);
    blogStorage(heroPhoto as File, data.title).then((res) => {
      const { imageId, blogSlug } = res;

      updateBlog(blogSlug, {
        ...payload,
        heroPhoto: imageId,
        slug: blogSlug,
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

  if (!blogHeroPhotoFile) return <LoadingScreen />;

  return (
    <FormModalWrapper
      title={blogObject.title}
      open={open}
      handleClose={onClose}
    >
      <CrudBlog onSubmitBlog={onSubmit} defaultValues={defaultValues} />
    </FormModalWrapper>
  );
};

export default BlogEditModal;
