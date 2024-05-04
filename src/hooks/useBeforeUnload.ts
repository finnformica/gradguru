import { useEffect } from "react";

export const useBeforeUnload = (truthy: boolean) => {
  useEffect(() => {
    // prevent user from leaving page if truthy is true
    const onBeforeUnload = (e: Event) => {
      if (truthy) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [truthy]);
};
