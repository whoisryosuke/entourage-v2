import { useEffect, useRef, useState } from "react";
import useAppStore from "../../../store/store";
import "./AddBlockSidebar.css";
import {
  Block,
  BLOCK_TYPE_CMD_PLACEHOLDER,
  BLOCK_TYPE_DESCRIPTIONS,
  BLOCK_TYPES,
  BlockTypes,
} from "../../../store/types";
import { open } from "@tauri-apps/plugin-dialog";
import { create, BaseDirectory, remove, readFile } from "@tauri-apps/plugin-fs";
import { getImage } from "../../../helpers/images";
import { v4 as generateUuid } from "uuid";

const AddBlockSidebar = () => {
  const {
    currentProject,
    projectSidebar,
    addBlock,
    updateBlock,
    toggleProjectSidebar,
    editBlockId,
    clearEditBlockId,
  } = useAppStore();
  const [type, setType] = useState<BlockTypes>(BLOCK_TYPES[0]);
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

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("changing project", e.currentTarget.value);
    setType(e.currentTarget.value as BlockTypes);
  };

  const clearInputs = () => {
    if (nameRef.current == null) return;
    if (notionRef.current == null) return;
    if (commandRef.current == null) return;
    // Clear inputs
    nameRef.current.value = "";
    commandRef.current.value = "";
    notionRef.current.value = "";
    setImagePath("");
    setImageSrc("");
  };

  const handleCreateBlock = async () => {
    if (nameRef.current == null) return;
    if (notionRef.current == null) return;
    if (commandRef.current == null) return;

    const notionValue =
      notionRef.current.value != ""
        ? notionRef.current.value.replace("https://", "")
        : "";

    const now = new Date().getMilliseconds();
    const blockId = generateUuid();
    const newBlock: Block = {
      id: blockId,
      name: nameRef.current.value,
      type,
      project: currentProject,
      command: commandRef.current.value,
      notion: notionValue,
      image: imagePath,
      created_time: now,
      last_opened: now,
    };

    // Are we editing? Update block.
    if (editBlockId != "") {
      updateBlock(editBlockId, newBlock);
      // Close the sidebar and stop editing
      // TODO: Maybe don't do this? Let's user incrementally edit and close explictly?
      clearEditBlockId();
    } else {
      // Otherwise create new block
      addBlock(newBlock);
    }

    clearInputs();
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
    const hash = generateUuid();
    const saveImagePath = `${hash}.${fileExtension}`;
    console.log("saving image path", saveImagePath);

    const file = await create(saveImagePath, {
      baseDir: BaseDirectory.AppLocalData,
    });
    const imageData = await readFile(filepath);
    await file.write(imageData);
    await file.close();

    // Save image URL
    setImagePath(saveImagePath);
  };

  const handleCancelEdit = () => {
    clearInputs();
    clearEditBlockId();
  };

  // If editing a block, hydrate the input form with block data
  useEffect(() => {
    if (nameRef.current == null) return;
    if (commandRef.current == null) return;
    if (notionRef.current == null) return;
    if (editBlockId != "") {
      // Get current block
      const { blocks } = useAppStore.getState();
      const currentBlock = blocks.find((block) => block.id == editBlockId);
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
            placeholder={BLOCK_TYPE_CMD_PLACEHOLDER[type]}
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
            {editBlockId != "" ? "Save changes" : "Create block"}
          </button>
          {editBlockId != "" && (
            <button onClick={handleCancelEdit}>Cancel editing</button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBlockSidebar;
