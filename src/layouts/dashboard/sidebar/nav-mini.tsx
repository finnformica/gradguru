"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Drawer, List } from "@mui/material";

import { useSession } from "context/user";
import { NavItems } from "./nav-items";

const NavMini = () => {
  const router = useRouter();
  const { user } = useSession();

  if (!user) return null; // TODO: return skeleton

  return (
    <Drawer variant="permanent">
      <Image
        src="/logos/small-logo.png"
        alt="Gradguru logo"
        width={55}
        height={55}
        priority
        style={{ margin: "2 auto 2rem", display: "block", cursor: "pointer" }}
        onClick={() => router.push("/dashboard")}
      />
      <List>
        <NavItems />
      </List>
    </Drawer>
  );
};

export default NavMini;
