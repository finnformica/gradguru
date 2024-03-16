import PrimaryHeader from "components/LandingPage/PrimaryHeader";
import { NotFoundComponent } from "components/global-components";

export default function NotFound() {
  return (
    <>
      <PrimaryHeader />
      <NotFoundComponent href="/" />
    </>
  );
}
