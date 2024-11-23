import React, { useRef, useState } from "react";
import useAppStore from "../../../store/store";
import "./AddBlockSidebar.css";
import {
  Block,
  BLOCK_TYPE_DESCRIPTIONS,
  BLOCK_TYPES,
} from "../../../store/types";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { create, BaseDirectory } from "@tauri-apps/plugin-fs";

type Props = {};

const AddBlockSidebar = (props: Props) => {
  const { currentProject, projectSidebar, addBlock } = useAppStore();
  const [type, setType] = useState(BLOCK_TYPES[0]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState("");

  const imageSrc = imagePath != "" ? convertFileSrc(imagePath) : "";

  const handleTypeChange = (e) => {
    console.log("changing project", e.currentTarget.value);
    setType(e.currentTarget.value);
  };

  const handleCreateBlock = async () => {
    if (nameRef.current == null) return;
    if (commandRef.current == null) return;

    // Save image to cache folder and keep path for Block
    const pathSplit = imagePath.split(".");
    const fileExtension = pathSplit[pathSplit.length - 1];
    const hash = Number(new Date()).toString(36);
    const saveImagePath = `${hash}.${fileExtension}`;
    console.log("saving image path", saveImagePath);

    const file = await create(saveImagePath, {
      baseDir: BaseDirectory.AppLocalData,
    });
    const imageData = await fetch(imageSrc).then(
      // Tauri requires a Uint8Array of data
      async (res) => new Uint8Array(await res.arrayBuffer())
    );
    await file.write(imageData);
    await file.close();

    const newBlock: Block = {
      name: nameRef.current.value,
      type,
      project: currentProject,
      command: commandRef.current.value,
      image: saveImagePath,
    };
    addBlock(newBlock);

    // Clear inputs
    nameRef.current.value = "";
    commandRef.current.value = "";
    setImagePath("");
  };

  const handleSelectImage = async () => {
    let filepath = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "",
          extensions: ["jpg", "jpeg", "gif", "png", "svg", "webp"],
        },
      ],
    });

    if (!filepath) return;
    console.log("file path", filepath);

    // Save image URL
    setImagePath(filepath);
  };

  const openStatus = projectSidebar ? "open" : "closed";
  return (
    <div className={`AddBlockSidebar ${openStatus}`}>
      <div className="content">
        <input ref={nameRef} type="text" placeholder="Name of block" />
        <input ref={commandRef} type="text" placeholder="Command" />
        <label htmlFor="block-type">Command Type:</label>
        <select name="block-type" value={type} onChange={handleTypeChange}>
          {BLOCK_TYPES.map((blockType) => (
            <option value={blockType}>
              {BLOCK_TYPE_DESCRIPTIONS[blockType]}
            </option>
          ))}
        </select>
        <div
          className="image-preview"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
        <button onClick={handleSelectImage}>Select new image</button>
        <button onClick={handleCreateBlock}>Create block</button>
      </div>
    </div>
  );
};

export default AddBlockSidebar;
