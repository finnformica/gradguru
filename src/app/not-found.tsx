import PrimaryHeader from "components/LandingPage/PrimaryHeader";
import { NotFoundComponent } from "components/global";

export default function NotFound() {
  return (
    <>
      <PrimaryHeader />
      <NotFoundComponent href="/" />
    </>
  );
}
