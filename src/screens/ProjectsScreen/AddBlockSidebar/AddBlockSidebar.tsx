import React, { useEffect, useRef, useState } from "react";
import useAppStore from "../../../store/store";
import "./AddBlockSidebar.css";
import {
  Block,
  BLOCK_TYPE_DESCRIPTIONS,
  BLOCK_TYPES,
} from "../../../store/types";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { create, BaseDirectory, remove } from "@tauri-apps/plugin-fs";
import { getImage } from "../../../helpers/images";

type Props = {};

const AddBlockSidebar = (props: Props) => {
  const {
    currentProject,
    projectSidebar,
    addBlock,
    updateBlock,
    toggleProjectSidebar,
    editBlockId,
    clearEditBlockId,
  } = useAppStore();
  const [type, setType] = useState(BLOCK_TYPES[0]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLInputElement | null>(null);
  const notionRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const getImageAndSave = async () => {
      const newImageSrc = await getImage(imagePath);
      setImageSrc(newImageSrc);
    };
    if (imagePath) getImageAndSave();
  }, [imagePath]);

  const handleTypeChange = (e) => {
    console.log("changing project", e.currentTarget.value);
    setType(e.currentTarget.value);
  };

  const handleCreateBlock = async () => {
    if (nameRef.current == null) return;
    if (notionRef.current == null) return;
    if (commandRef.current == null) return;

    const notionValue =
      notionRef.current.value != ""
        ? notionRef.current.value.replace("https://", "")
        : "";

    const newBlock: Block = {
      name: nameRef.current.value,
      type,
      project: currentProject,
      command: commandRef.current.value,
      notion: notionValue,
      image: imagePath,
    };

    // Are we editing? Update block.
    if (editBlockId >= 0) {
      updateBlock(editBlockId, newBlock);
      // Close the sidebar and stop editing
      // TODO: Maybe don't do this? Let's user incrementally edit and close explictly?
      clearEditBlockId();
    } else {
      // Otherwise create new block
      addBlock(newBlock);
    }

    // Clear inputs
    nameRef.current.value = "";
    commandRef.current.value = "";
    notionRef.current.value = "";
    setImagePath("");
    setImageSrc("");
  };

  const handleSelectImage = async () => {
    // Delete old files if exists
    if (imagePath != "") {
      // Delete image from disk
      await remove(imagePath, {
        baseDir: BaseDirectory.AppLocalData,
      });
    }

    // Open a dialog box for images
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

    // Save image to cache folder and keep path for Block
    const pathSplit = filepath.split(".");
    const fileExtension = pathSplit[pathSplit.length - 1];
    const hash = Number(new Date()).toString(36);
    const saveImagePath = `${hash}.${fileExtension}`;
    console.log("saving image path", saveImagePath);

    const file = await create(saveImagePath, {
      baseDir: BaseDirectory.AppLocalData,
    });
    const newImageSrc = convertFileSrc(filepath);
    // const newImageSrc = await getImage(filepath);
    const imageData = await fetch(newImageSrc).then(
      // Tauri requires a Uint8Array of data
      async (res) => new Uint8Array(await res.arrayBuffer())
    );
    await file.write(imageData);
    await file.close();

    // Save image URL
    setImagePath(saveImagePath);
  };

  const handleCancelEdit = () => {
    clearEditBlockId();
  };

  // If editing a block, hydrate the input form with block data
  useEffect(() => {
    if (nameRef.current == null) return;
    if (commandRef.current == null) return;
    if (notionRef.current == null) return;
    if (editBlockId >= 0) {
      // Get current block
      const { blocks } = useAppStore.getState();
      const currentBlock = blocks[editBlockId];
      if (!currentBlock) return;

      nameRef.current.value = currentBlock.name;
      commandRef.current.value = currentBlock.command;
      notionRef.current.value = currentBlock.notion;
      console.log("setting block image", currentBlock.image);
      setImagePath(currentBlock.image);
    }
  }, [editBlockId]);

  const openStatus = projectSidebar ? "open" : "closed";
  return (
    <>
      <div
        className={`AddBlockSidebarMask ${openStatus}`}
        onClick={toggleProjectSidebar}
      />
      <div className={`AddBlockSidebar ${openStatus}`}>
        <div className="content">
          <input
            ref={nameRef}
            name="block-name"
            type="text"
            placeholder="Name of block"
          />
          <input
            ref={commandRef}
            name="block-command"
            type="text"
            placeholder="Command"
          />
          <input
            ref={notionRef}
            name="block-notion"
            type="text"
            placeholder="Notion Project URL"
          />
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
          <button onClick={handleCreateBlock}>
            {editBlockId >= 0 ? "Save changes" : "Create block"}
          </button>
          {editBlockId >= 0 && (
            <button onClick={handleCancelEdit}>Cancel editing</button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBlockSidebar;
