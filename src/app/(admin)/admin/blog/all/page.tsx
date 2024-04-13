"use client";
import { Container, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { deleteBlogDB, deleteBlogStorage, getBlogs } from "api/blog";
import BlogEditModal from "components/blog/BlogEditModal";
import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { IBlogPage } from "types/blog";

const BlogEditTable = () => {
  const [blogToDelete, setBlogToDelete] = useState<IBlogPage | null>(null);
  const [blogs, setBlogs] = useState<IBlogPage[]>([]);
  const [editBlog, setEditBlog] = useState<IBlogPage | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // add event listener on firestore collectionxX
    const unsubscribe = getBlogs(setBlogs);
    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 500,
    },
    { field: "author", headerName: "Author", width: 120 },
    {
      field: "created",
      headerName: "Created",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <EditDeleteActions
          session={session}
          onDeleteClick={() => setBlogToDelete(params.row)}
          onEditClick={() => {
            setEditBlog(params.row);
          }}
        />
      ),
    },
  ];

  const handleDeleteblog = async () => {
    if (!blogToDelete) return;

    deleteBlogStorage(blogToDelete.imageId, blogToDelete.slug).catch(() =>
      enqueueSnackbar("Error deleting hero image")
    );
    deleteBlogDB(blogToDelete.slug)
      .then(() => {
        enqueueSnackbar("Blog post deleted");
      })
      .catch(() => enqueueSnackbar("Error deleting test"))
      .finally(() => {
        setBlogToDelete(null);
      });
  };

  if (!session && !blogs) return <LoadingScreen />;

  return (
    <Container maxWidth="lg" sx={{ gap: 4 }}>
      <Typography variant="h4">All Blog Posts</Typography>
      <AdminDataGrid rows={blogs} columns={columns} />
      {blogToDelete && (
        <ConfirmationDialog
          open={!!blogToDelete}
          onClose={() => setBlogToDelete(null)}
          onSubmit={handleDeleteblog}
          title="Are you sure you want to delete this blog post?"
          confirmText="Delete"
        />
      )}
      {editBlog && (
        <BlogEditModal
          onClose={() => setEditBlog(null)}
          blogObject={editBlog}
        />
      )}
    </Container>
  );
};

export default BlogEditTable;
