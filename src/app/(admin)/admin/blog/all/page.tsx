"use client";

import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { deleteBlogDB, deleteBlogStorage, getBlogs } from "api/blog";
import { BlogEditModal } from "components/blog";
import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import {
  ConfirmationDialog,
  LoadingScreen,
} from "components/global-components";
import { IBlog } from "types/blog";

const BlogEditTable = () => {
  const [blogToDelete, setBlogToDelete] = useState<IBlog | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [editBlog, setEditBlog] = useState<IBlog | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getBlogs(setBlogs);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    { field: "author", headerName: "Author", width: 120 },
    {
      field: "readTime",
      headerName: "Read Time",
      width: 120,
      valueGetter: (params) => `${params.value} min read`,
    },
    { field: "tag", headerName: "Tag", width: 120 },
    {
      field: "created",
      headerName: "Created",
      width: 200,
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

    deleteBlogStorage(
      blogToDelete.heroPhoto as string,
      blogToDelete.slug
    ).catch(() => enqueueSnackbar("Error deleting hero image"));

    deleteBlogDB(blogToDelete.slug)
      .then(() => {
        enqueueSnackbar("Blog post deleted");
      })
      .catch(() => enqueueSnackbar("Error deleting blog"))
      .finally(() => {
        setBlogToDelete(null);
      });
  };

  if (!session || !blogs) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" pb={4}>
        All Blog Posts
      </Typography>

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
          open={!!editBlog}
          onClose={() => setEditBlog(null)}
          blogObject={editBlog}
        />
      )}
    </>
  );
};

export default BlogEditTable;
