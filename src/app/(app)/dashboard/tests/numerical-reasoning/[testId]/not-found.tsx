import NotFoundAnimation from "components/global/NotFoundAnimation";

// TODO: not working for unknown testIds - need to fix
const NotFound = () => {
  return <NotFoundAnimation href="/dashboard" relocatedPageName="dashboard" />;
};

export default NotFound;
