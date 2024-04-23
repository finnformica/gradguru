"use client";
import { addBlog, blogStorage } from "api/blog";
import CrudBlog from "components/blog/CrudBlog";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { IBlog } from "types/blog";

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};

const AddBlogForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const onSubmit = (data: IBlog): void => {
    if (!session?.user?.name || !data.heroPhoto) return;

    const { name: author } = session.user;
    const { heroPhoto, ...payload } = data;

    blogStorage(heroPhoto as File, data.title).then((res) => {
      const { imageId, blogSlug } = res;

      const strippedContent = payload.content.replace(/<[^>]*>?/gm, "");

      addBlog(blogSlug, {
        ...payload,
        author,
        heroPhoto: imageId,
        slug: blogSlug,
        readTime: calculateReadTime(strippedContent),
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

  return <CrudBlog onSubmitBlog={onSubmit} />;
};

export default AddBlogForm;
