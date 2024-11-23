import React from "react";
import useAppStore from "../../../store/store";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { Block } from "../../../store/types";
import { localDataDir } from "@tauri-apps/api/path";
import BlockButton from "./BlockButton/BlockButton";

type Props = {};

const ProjectView = (props: Props) => {
  const { currentProject, blocks } = useAppStore();

  const filteredBlocks = blocks.filter(
    (block) => block.project == currentProject
  );

  const projectBlocks = filteredBlocks.map((block) => (
    <BlockButton key={block.name} block={block} />
  ));

  return <div>{projectBlocks}</div>;
};

export default ProjectView;
