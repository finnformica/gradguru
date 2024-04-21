import FormModalWrapper from "components/global-components/FormModalWrapper";
import ResourceAdminForm from "./resource-admin-form";
import { IResource } from "types";
import { generateRandomString, getFileExtension } from "utils/format-string";
import { deleteStorageItem, uploadToStorage } from "lib/firebase/utils";
import { patchResource } from "api/resources";
import { useSnackbar } from "notistack";

type ResourceEditModalProps = {
  resource: IResource;
  setResource: (resource: IResource | null) => void;
  open: boolean;
};

const ResourceEditModal = ({
  resource,
  setResource,
  open,
}: ResourceEditModalProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    const filename = generateRandomString();
    const ext = getFileExtension(data.file.name);
    const path = `courses/consulting/resources/${data.type}/`;

    const oldFilePath = path + (resource.file as File).name;
    const newFilePath = path + filename + ext;

    deleteStorageItem(oldFilePath);

    uploadToStorage(data.file, newFilePath);

    const payload = { ...data, file: newFilePath };

    return patchResource("consulting", data.id, payload)
      .then(() => enqueueSnackbar("Resource updated"))
      .catch(() =>
        enqueueSnackbar("Failed to update resource", { variant: "error" })
      )
      .finally(() => setResource(null));
  };

  return (
    <FormModalWrapper
      title="Edit Resource"
      open={open}
      handleClose={() => setResource(null)}
    >
      <ResourceAdminForm onSubmit={onSubmit} defaultValues={resource} />
    </FormModalWrapper>
  );
};

export default ResourceEditModal;
