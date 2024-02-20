"use client";

import { useEffect, useState } from "react";

type ClientWrapperProps = {
  children?: React.ReactNode;
};

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient ? children : null}</>;
};

export default ClientWrapper;
