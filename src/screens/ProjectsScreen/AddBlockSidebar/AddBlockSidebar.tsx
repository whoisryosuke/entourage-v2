import React, { useRef, useState } from "react";
import useAppStore from "../../../store/store";
import "./AddBlockSidebar.css";
import { Block, BLOCK_TYPES } from "../../../store/types";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";

type Props = {};

const AddBlockSidebar = (props: Props) => {
  const { currentProject, projectSidebar, addBlock } = useAppStore();
  const [type, setType] = useState(BLOCK_TYPES[0]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState("");

  const handleTypeChange = (e) => {
    console.log("changing project", e.currentTarget.value);
    setType(e.currentTarget.value);
  };

  const handleCreateBlock = () => {
    if (nameRef.current == null) return;
    if (commandRef.current == null) return;
    if (imageRef.current == null) return;

    console.log("image", imageRef.current, imageRef.current.value);

    // const newBlock: Block = {
    //   name: nameRef.current.value,
    //   type,
    //   project: currentProject,
    //   command: commandRef.current.value,
    // };
    // addBlock(newBlock);

    // // Clear inputs
    // nameRef.current.value = "";
    // commandRef.current.value = "";
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
  const imageSrc = imagePath != "" ? convertFileSrc(imagePath) : "";
  return (
    <div className={`AddBlockSidebar ${openStatus}`}>
      <div className="content">
        <input ref={nameRef} type="text" placeholder="Name of block" />
        <input ref={commandRef} type="text" placeholder="Command" />
        <select value={type} onChange={handleTypeChange}>
          {BLOCK_TYPES.map((blockType) => (
            <option value={blockType}>{blockType}</option>
          ))}
        </select>
        <div
          className="image-preview"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
        {/* <input
        ref={imageRef}
        type="file"
        placeholder="Cover image"
        accept=".jpg,.jpeg,.gif,.png,.svg,.webp"
      /> */}
        <button onClick={handleSelectImage}>Select new image</button>
        <button onClick={handleCreateBlock}>Create block</button>
      </div>
    </div>
  );
};

export default AddBlockSidebar;
