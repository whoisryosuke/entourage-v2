import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { appLocalDataDir, localDataDir } from "@tauri-apps/api/path";
import React, { useEffect, useState } from "react";
import { Block } from "../../../../store/types";
import "./BlockButton.css";
import NotionIcon from "../../../../components/icons/NotionIcon";
import useAppStore from "../../../../store/store";
import TrashIcon from "../../../../components/icons/TrashIcon";
import EditIcon from "../../../../components/icons/EditIcon";
import { remove, BaseDirectory } from "@tauri-apps/plugin-fs";
import { getImage } from "../../../../helpers/images";

type Props = { block: Block; index: number };

const BlockButton = ({ block, index }: Props) => {
  const {
    editMode,
    removeBlock,
    setEditBlockId,
    projectSidebar,
    toggleProjectSidebar,
  } = useAppStore();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getImageAndSave = async () => {
      const newImageSrc = await getImage(block.image);
      setImageSrc(newImageSrc);
    };
    if (block.image) getImageAndSave();
  }, [block]);

  const handleProject = (block: Block) => async () => {
    await invoke("open_vscode_project", { name: block.command });
  };
  const handleRemoveBlock = () => {
    removeBlock(index);
    // Delete image from disk
    remove(block.image, {
      baseDir: BaseDirectory.AppLocalData,
    });
  };

  const handleEditBlock = () => {
    // Set this block as currently editing
    setEditBlockId(index);
    // Open the sidebar
    if (!projectSidebar) toggleProjectSidebar();
  };
  return (
    <div className="BlockButton">
      <div
        className="content"
        onClick={editMode ? undefined : handleProject(block)}
      >
        {block.image && <img src={imageSrc} />}
        <h3>{block.name}</h3>
        <h5>{block.command}</h5>
      </div>
      {block.notion != "" && (
        <a href={`notion://${block.notion}`} className="NotionIcon">
          <NotionIcon width={24} height={24} />
        </a>
      )}
      {editMode && (
        <div className="controls">
          <button title="Edit Block" onClick={handleEditBlock}>
            <EditIcon width={18} height={18} />
          </button>
          <button title="Remove Block" onClick={handleRemoveBlock}>
            <TrashIcon width={18} height={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockButton;
