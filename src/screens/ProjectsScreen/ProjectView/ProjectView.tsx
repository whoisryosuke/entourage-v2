import React, { useState } from "react";
import useAppStore from "../../../store/store";
import { BlockTypes } from "../../../store/types";
import BlockButton from "./BlockButton/BlockButton";
import "./ProjectView.css";
import FilterProjects from "./FilterProjects/FilterProjects";
import SortBlocks, {
  SORT_ALGORITHMS,
  SortTypes,
} from "./SortBlocks/SortBlocks";
import Stack from "../../../components/Stack/Stack";
import FilterType from "./FilterType";

const ProjectView = () => {
  const [projectFilter, setProjectFilter] = useState("");
  const [sortType, setSortType] = useState<SortTypes>("recent");
  const [blockTypeFilter, setBlockTypeFilter] = useState<BlockTypes | "all">(
    "all"
  );
  const { currentProject, blocks } = useAppStore();

  const handleBlockTypeFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBlockTypeFilter(e.currentTarget.value as BlockTypes | "all");
  };

  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.currentTarget.value as SortTypes);
  };

  const handleProjectFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectFilter(e.currentTarget.value);
  };

  const filteredBlocks = blocks
    .filter((block) => block.project == currentProject)
    .filter((block) =>
      projectFilter != ""
        ? block.name.toLowerCase().includes(projectFilter.toLowerCase())
        : true
    )
    .filter((block) =>
      blockTypeFilter !== "all" ? block.type == blockTypeFilter : true
    )
    .sort(SORT_ALGORITHMS[sortType]);

  const projectBlocks = filteredBlocks.map((block, blockIndex) => (
    <BlockButton key={block.name} block={block} index={blockIndex} />
  ));

  console.log("blocks", filteredBlocks);

  return (
    <div className="ProjectView">
      <Stack className="SearchContainer">
        <FilterProjects value={projectFilter} onChange={handleProjectFilter} />
        <FilterType
          blockTypeFilter={blockTypeFilter}
          handleBlockTypeFilterChange={handleBlockTypeFilterChange}
        />
        <SortBlocks
          sortType={sortType}
          handleSortTypeChange={handleSortTypeChange}
        />
      </Stack>
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
