import LatexContext from "@/context/latex";
import { AlertContextProvider } from "@/context/adminAlert";
import MiniDrawer from "@/components/AdminLayout/MiniDrawer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LatexContext>
      <AlertContextProvider>
        <MiniDrawer>{children}</MiniDrawer>
      </AlertContextProvider>
    </LatexContext>
  );
}
