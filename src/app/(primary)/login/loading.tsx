"use client";
import React from "react";
import { CircularProgress } from "@mui/material";

const loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default loading;
