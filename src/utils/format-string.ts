import crypto from "crypto";

export const getFileExtension = (filename: string) => {
  const extension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  return extension ? `.${extension}` : "";
};

export const generateRandomString = (length: number = 8) =>
  crypto.randomBytes(length).toString("hex");
