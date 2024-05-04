import { NotFoundComponent } from "components/global";

// TODO: not working for unknown testIds - need to fix
const NotFound = () => {
  return <NotFoundComponent href="/dashboard" />;
};

export default NotFound;
