import React, { useState } from "react";
import useAppStore from "../../../store/store";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { Block } from "../../../store/types";
import { localDataDir } from "@tauri-apps/api/path";
import BlockButton from "./BlockButton/BlockButton";
import "./ProjectView.css";
import FilterProjects from "./FilterProjects/FilterProjects";

type Props = {};

const ProjectView = (props: Props) => {
  const [projectFilter, setProjectFilter] = useState("");
  const { currentProject, blocks } = useAppStore();

  const handleProjectFilter = (e) => {
    setProjectFilter(e.currentTarget.value);
  };

  const filteredBlocks = blocks
    .filter((block) => block.project == currentProject)
    .filter((block) =>
      projectFilter != ""
        ? block.name.toLowerCase().includes(projectFilter.toLowerCase())
        : true
    );

  const projectBlocks = filteredBlocks.map((block) => (
    <BlockButton key={block.name} block={block} />
  ));

  return (
    <div className="ProjectView">
      <FilterProjects value={projectFilter} onChange={handleProjectFilter} />
      <div className="ProjectGrid">
        {projectBlocks.length > 0 ? (
          projectBlocks
        ) : (
          <div style={{ padding: "1rem" }}>Create some blocks!</div>
        )}
      </div>
    </div>
  );
};

export default ProjectView;
