import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { appLocalDataDir, localDataDir } from "@tauri-apps/api/path";
import React, { useEffect, useState } from "react";
import { Block } from "../../../../store/types";
import "./BlockButton.css";
import NotionIcon from "../../../../components/icons/NotionIcon";

type Props = { block: Block };

const BlockButton = ({ block }: Props) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const imagePath = `${await appLocalDataDir()}/${block.image}`;
      const newImageSrc = convertFileSrc(imagePath);
      setImageSrc(newImageSrc);
    };
    if (block.image) getImage();
  }, [block]);

  const handleProject = (block: Block) => async () => {
    await invoke("open_vscode_project", { name: block.command });
  };
  return (
    <div className="BlockButton">
      <button onClick={handleProject(block)} />
      <div className="content">
        {!block.image && <img src={imageSrc} />}
        <h3>{block.name}</h3>
        <h5>{block.command}</h5>
        {block.notion != "" && (
          <a href={`notion://${block.notion}`} className="NotionIcon">
            <NotionIcon width={24} height={24} />
          </a>
        )}
      </div>
    </div>
  );
};

export default BlockButton;
