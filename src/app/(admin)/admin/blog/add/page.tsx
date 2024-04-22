"use client";
import { addBlog, blogStorage } from "api/blog";
import AddBlog from "components/blog/AddBlog";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { IBlog } from "types/blog";

const AddBlogForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const onSubmit = (data: IBlog): void => {
    let imageId;
    let blogSlug;
    if (!session?.user?.name || !data.blogHeroPhoto) return;

    const { name } = session.user;
    const { blogHeroPhoto, ...dbUpload } = data;

    blogStorage(blogHeroPhoto, data.title).then((res) => {
      ({ imageId, blogSlug } = res);
      addBlog(blogSlug, {
        ...dbUpload,
        author: name,
        imageId: imageId,
        slug: blogSlug,
        created: Date.now(),
      })
        .then(() => enqueueSnackbar("Blog has been added"))
        .catch((e) =>
          enqueueSnackbar(`Error adding the blog: ${e.message}`, {
            variant: "error",
          })
        );
    });
  };

  if (!session?.user) return <LoadingScreen />;

  return <AddBlog onSubmitBlog={onSubmit} />;
};

export default AddBlogForm;
