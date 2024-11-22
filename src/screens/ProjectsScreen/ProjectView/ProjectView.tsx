import React from "react";
import useAppStore from "../../../store/store";
import { invoke } from "@tauri-apps/api/core";
import { Block } from "../../../store/types";

type Props = {};

const ProjectView = (props: Props) => {
  const { currentProject, blocks } = useAppStore();

  const filteredBlocks = blocks.filter(
    (block) => block.project == currentProject
  );

  const handleProject = (block: Block) => async () => {
    await invoke("open_vscode_project", { name: block.command });
  };

  const projectBlocks = filteredBlocks.map((block) => (
    <button onClick={handleProject(block)}>
      <h3>{block.name}</h3>
      <h5>{block.command}</h5>
    </button>
  ));

  return <div>{projectBlocks}</div>;
};

export default ProjectView;
