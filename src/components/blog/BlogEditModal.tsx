"use client";

import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { deleteBlogStorage, getHeroPhotoFile, updateBlog } from "api/blog";
import { FormModalWrapper, LoadingScreen } from "components/global";
import { fileStorage } from "lib/firebase/utils";
import { IBlog } from "types/blog";
import { endpoints } from "utils/axios";

// react-quill throwing error with SSR
const CrudBlog = dynamic(() => import("components/blog/CrudBlog"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

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
      .catch((e) => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues = {
    ...blogObject,
    heroPhoto: blogHeroPhotoFile,
  } as IBlog;

  const onSubmit = (data: IBlog) => {
    const { heroPhoto, slug, ...payload } = data;

    deleteBlogStorage(blogObject.heroPhoto as string, blogObject.slug);

    fileStorage(heroPhoto as File, `${endpoints.storage.blog}/${slug}`).then(
      (imageId) => {
        updateBlog(slug, {
          ...payload,
          heroPhoto: imageId,
          slug,
        })
          .then(() => enqueueSnackbar("Blog has been updated"))
          .catch((e) =>
            enqueueSnackbar(`Error updating the blog: ${e.message}`, {
              variant: "error",
            })
          )
          .finally(onClose);
      }
    );
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
