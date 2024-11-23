import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { localDataDir } from "@tauri-apps/api/path";
import React, { useEffect, useState } from "react";
import { Block } from "../../../store/types";

type Props = { block: Block };

const BlockButton = ({ block }: Props) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const imagePath = `${await localDataDir()}${block.image}`;
      const newImageSrc = convertFileSrc(imagePath);
      setImageSrc(newImageSrc);
    };
    getImage();
  }, [block]);

  const handleProject = (block: Block) => async () => {
    await invoke("open_vscode_project", { name: block.command });
  };
  return (
    <button onClick={handleProject(block)}>
      <img src={imageSrc} />
      <h3>{block.name}</h3>
      <h5>{block.command}</h5>
    </button>
  );
};

export default BlockButton;
