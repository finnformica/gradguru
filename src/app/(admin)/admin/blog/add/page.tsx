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

  const onSubmit = (data: IBlog): Promise<void> => {
    let imageId;
    let blogSlug;
    if (!session?.user || !data.blogHeroPhoto) return Promise.resolve();

    const { user } = session;
    const authorName = user.name ? user.name : "John Doe";
    const { blogHeroPhoto, ...dbUpload } = data;

    blogStorage(blogHeroPhoto, data.title).then((res) => {
      ({ imageId, blogSlug } = res);
      addBlog(blogSlug, {
        ...dbUpload,
        author: authorName,
        imageId: imageId,
        slug: blogSlug,
      })
        .then(() => enqueueSnackbar("Blog card has been added"))
        .catch((e) =>
          enqueueSnackbar(`Error adding the blog card: ${e.message}`, {
            variant: "error",
          })
        );
    });
    return Promise.resolve();
  };

  if (!session?.user) return <LoadingScreen />;

  return <AddBlog onSubmitBlog={onSubmit} />;
};

export default AddBlogForm;
