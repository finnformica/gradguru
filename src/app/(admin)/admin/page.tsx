"use client";

import { WelcomePanel } from "components/global";
import { useSession } from "next-auth/react";

const AdminHome = () => {
  const { data: session } = useSession();

  return (
    <WelcomePanel
      name={session?.user?.name || "Secret Gradguru Admin"}
      image="/imgs/3d/lady-against-tree.svg"
    />
  );
};

export default AdminHome;
