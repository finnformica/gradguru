import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getBlogs, useBlogs } from "api/blog";
import { EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog } from "components/global-components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "lib/firebase/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IBlogPage } from "types/blog";

const BlogTable = () => {
  const [blogToDelete, setBlogToDelete] = useState<IBlogPage | null>(null);
  const router = useRouter();
  let { blogs: posts } = useBlogs();
  const { data: session } = useSession();
  console.log(posts);

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
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <EditDeleteActions
          session={session}
          onDeleteClick={() => setBlogToDelete(params.row)}
          onEditClick={() => router.refresh}
        />
      ),
    },
  ];

  const handleDeleteblog = async () => {
    if (!blogToDelete) return;
    const ref = doc(db, "blogs", blogToDelete.slug);
    deleteDoc(ref)
      .then(() => {
        enqueueSnackbar("Blog post deleted");
      })
      .catch(() => enqueueSnackbar("Error deleting test"))
      .finally(() => {
        setBlogToDelete(null);
        router.push("/admin/blog/all");
        // router.refresh()
      });
  };

  if (posts)
    return (
      <>
        <DataGrid
          rows={posts}
          columns={columns}
          autoHeight
          pageSizeOptions={[15, 25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
            sorting: {
              sortModel: [{ field: "created", sort: "desc" }],
            },
          }}
        />
        {blogToDelete && (
          <ConfirmationDialog
            open={!!blogToDelete}
            onClose={() => setBlogToDelete(null)}
            onSubmit={handleDeleteblog}
            title="Are you sure you want to delete this blog post?"
            confirmText="Delete"
          />
        )}
      </>
    );
};

export default BlogTable;
