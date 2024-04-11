import { GridColDef } from "@mui/x-data-grid";
import { getBlogs } from "api/blog";
import { AdminDataGrid, EditDeleteActions } from "components/data-grid-custom";
import { ConfirmationDialog } from "components/global-components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "lib/firebase/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { IBlogPage } from "types/blog";

const BlogTable = () => {
  const [blogToDelete, setBlogToDelete] = useState<IBlogPage | null>(null);
  const [blogs, setBlogs] = useState<IBlogPage[]>([]);
  const router = useRouter();
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

  if (blogs)
    return (
      <>
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
      </>
    );
  //   return <></>;
};

export default BlogTable;
