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
import Input from "../../../components/Input";
import Stack from "../../../components/Stack/Stack";
import Select from "../../../components/Select";
import GlassButton from "../../../components/GlassButton";
import ImagePlusIcon from "../../../components/icons/ImagePlusIcon";
import FolderPlusIcon from "../../../components/icons/FolderPlusIcon";

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
  const [path, setPath] = useState<string>("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLInputElement | null>(null);
  const notionRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);

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

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.currentTarget.value);
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
    // Required fields for a block
    // TODO: Notify user since we aren't using a standard HTML form
    if (nameRef.current.value == "" || commandRef.current.value == "") return;
    const isUpdatingBlock = editBlockId != "";

    const notionValue =
      notionRef.current.value != ""
        ? notionRef.current.value.replace("https://", "")
        : "";

    // We create a new Block here to insert into "DB"
    // Since we create/update in same process, make sure to use prev data when necessary
    const now = Date.now();
    const blockId = generateUuid();
    const createdTime =
      isUpdatingBlock && currentBlock ? currentBlock.created_time : now;
    const lastOpened =
      isUpdatingBlock && currentBlock ? currentBlock.last_opened : now;
    const newBlock: Block = {
      id: isUpdatingBlock ? editBlockId : blockId,
      name: nameRef.current.value,
      type,
      project: currentProject,
      command: commandRef.current.value,
      path,
      notion: notionValue,
      image: imagePath,
      created_time: createdTime,
      last_opened: lastOpened,
    };

    // Are we editing? Update block.
    if (isUpdatingBlock) {
      console.log("updating block in store", newBlock);
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

  const handleFileSelect = async () => {
    // For certain commands, we want the user to select a folder vs single file
    const directory = (
      ["vscode", "openFolder", "launchCommandLine"] as Block["type"][]
    ).includes(type);

    let filepath = await open({
      multiple: false,
      directory,
    });

    console.log("picked a folder!", filepath);
    if (!filepath) return;

    // For command lines, we have a separate input for path
    if (type == "launchCommandLine") {
      setPath(filepath);
    } else {
      if (!commandRef.current) return;
      commandRef.current.value = filepath;
    }
  };

  // If editing a block, hydrate the input form with block data
  useEffect(() => {
    if (nameRef.current == null) return;
    if (commandRef.current == null) return;
    if (notionRef.current == null) return;
    if (editBlockId != "") {
      // Get current block
      const { blocks } = useAppStore.getState();
      const block = blocks.find((block) => block.id == editBlockId);
      if (!block) return;

      nameRef.current.value = block.name;
      commandRef.current.value = block.command;
      notionRef.current.value = block.notion;
      setImagePath(block.image);
      setType(block.type);
      setPath(block.path);
      setCurrentBlock(block);
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
          <Stack vertical>
            <Input
              ref={nameRef}
              name="block-name"
              type="text"
              placeholder="Name of block"
              required
            />
            <Input
              ref={notionRef}
              name="block-notion"
              type="text"
              placeholder="Notion Project URL"
            />

            <label htmlFor="block-type">Command Type:</label>
            <Select name="block-type" value={type} onChange={handleTypeChange}>
              {BLOCK_TYPES.map((blockType) => (
                <option value={blockType}>
                  {BLOCK_TYPE_DESCRIPTIONS[blockType]}
                </option>
              ))}
            </Select>
            <Input
              ref={commandRef}
              name="block-command"
              type="text"
              placeholder={BLOCK_TYPE_CMD_PLACEHOLDER[type]}
              required
            />
            {type == "launchCommandLine" && (
              <Input
                value={path}
                name="block-path"
                type="text"
                placeholder="Directory path the command should run in"
                onChange={handlePathChange}
              />
            )}
            <GlassButton
              onClick={handleFileSelect}
              title="Select a file or folder to use as the command above"
            >
              <FolderPlusIcon /> Select a file/folder
            </GlassButton>
            <label htmlFor="block-type">Cover Image:</label>
            <div
              className="image-preview"
              style={{ backgroundImage: `url(${imageSrc})` }}
            />
            <GlassButton onClick={handleSelectImage}>
              <ImagePlusIcon /> Select new image
            </GlassButton>
            <GlassButton onClick={handleCreateBlock}>
              {editBlockId != "" ? "Save changes" : "Create block"}
            </GlassButton>
            {editBlockId != "" && (
              <GlassButton onClick={handleCancelEdit}>
                Cancel editing
              </GlassButton>
            )}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default AddBlockSidebar;
