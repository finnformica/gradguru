export const getFileExtension = (filename: string) =>
  filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
