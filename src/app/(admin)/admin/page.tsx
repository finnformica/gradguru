"use client";

import { WelcomePanel } from "components/global";
import { useSession } from "context/user";

const AdminHome = () => {
  const { user } = useSession();

  return (
    <WelcomePanel
      name={user?.displayName || "Secret Gradguru Admin"}
      image="/imgs/3d/lady-against-tree.svg"
    />
  );
};

export default AdminHome;
