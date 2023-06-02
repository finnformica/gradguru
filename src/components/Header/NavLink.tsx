import Link from "next/link";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
};

const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: href === "/" ? "black" : "grey",
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
