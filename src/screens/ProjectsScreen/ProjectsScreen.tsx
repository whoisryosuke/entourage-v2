import React from "react";
import ProjectBar from "./ProjectBar/ProjectBar";
import ProjectView from "./ProjectView/ProjectView";
import AddBlockSidebar from "./AddBlockSidebar/AddBlockSidebar";

type Props = {};

const ProjectsScreen = (props: Props) => {
  return (
    <div>
      <ProjectBar />
      <ProjectView />
      <AddBlockSidebar />
    </div>
  );
};

export default ProjectsScreen;
