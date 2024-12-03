import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";

export const getImage = async (imageName: string) => {
  const appDataDirPath = await appLocalDataDir();
  const imagePath = await join(appDataDirPath, imageName);
  const newImageSrc = convertFileSrc(imagePath);
  return newImageSrc;
};
