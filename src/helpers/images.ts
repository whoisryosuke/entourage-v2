import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir } from "@tauri-apps/api/path";

export const getImage = async (imageName: string) => {
  const imagePath = `${await appLocalDataDir()}/${imageName}`;
  const newImageSrc = convertFileSrc(imagePath);
  return newImageSrc;
};
