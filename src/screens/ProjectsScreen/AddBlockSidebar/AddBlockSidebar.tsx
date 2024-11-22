import React, { useRef, useState } from "react";
import useAppStore from "../../../store/store";
import "./AddBlockSidebar.css";
import { Block, BLOCK_TYPES } from "../../../store/types";

type Props = {};

const AddBlockSidebar = (props: Props) => {
  const { currentProject, projectSidebar, addBlock } = useAppStore();
  const [type, setType] = useState(BLOCK_TYPES[0]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLInputElement | null>(null);

  const handleTypeChange = (e) => {
    console.log("changing project", e.currentTarget.value);
    setType(e.currentTarget.value);
  };

  const handleCreateBlock = () => {
    if (nameRef.current == null) return;
    if (commandRef.current == null) return;
    const newBlock: Block = {
      name: nameRef.current.value,
      type,
      project: currentProject,
      command: commandRef.current.value,
    };
    addBlock(newBlock);

    // Clear inputs
    nameRef.current.value = "";
    commandRef.current.value = "";
  };

  const openStatus = projectSidebar ? "open" : "closed";
  return (
    <div className={`AddBlockSidebar ${openStatus}`}>
      <input ref={nameRef} type="text" placeholder="Name of block" />
      <input ref={commandRef} type="text" placeholder="Command" />
      <select value={type} onChange={handleTypeChange}>
        {BLOCK_TYPES.map((blockType) => (
          <option value={blockType}>{blockType}</option>
        ))}
      </select>
      <button onClick={handleCreateBlock}>Create block</button>
    </div>
  );
};

export default AddBlockSidebar;
