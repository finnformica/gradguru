import FormModalWrapper from "components/global-components/FormModalWrapper";
import ResourceAdminForm from "./resource-admin-form";
import { IResource } from "types";

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
  const onSubmit = async (data: any) => {
    //   const filename = generateRandomString();
    //   const ext = getFileExtension(data.file.name);
  };

  return (
    <FormModalWrapper
      title="Edit Resource"
      open={open}
      handleClose={() => setResource(null)}
    >
      <ResourceAdminForm onSubmit={() => {}} defaultValues={resource} />
    </FormModalWrapper>
  );
};

export default ResourceEditModal;
