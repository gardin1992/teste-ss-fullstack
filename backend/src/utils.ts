import fs from "fs";

export const rootDir = require("path").resolve("./");

export const base64Decode = (base64str: string, file: any) => {
  const bitmap = Buffer.from(base64str, "base64");
  return fs.writeFileSync(file, bitmap);
};

export const getFullMimeTypeFromBase64 = (base64Str: any) => {
  return base64Str.split(";base64,").shift().replace("data:", "");
};

export const getMimeTypeFromFullMimeType = (mimeType: string) => {
  switch (mimeType) {
    case "image/png":
      return "png";
    case "image/jpg":
    case "image/jpeg":
      return "jpeg";
    case "image/webp":
      return "webp";
    case "image/heic":
      return "heic";
    case "image/heif":
      return "heif";
  }
};

export const isValidMimeType = (image: string) => {
  const mimeType = image.split(";base64,").shift()?.replace("data:", "") ?? "";
  const validMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

  return validMimeTypes.some((x) => x === mimeType);
};
