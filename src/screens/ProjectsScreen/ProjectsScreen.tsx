import ProjectBar from "./ProjectBar/ProjectBar";
import ProjectView from "./ProjectView/ProjectView";
import AddBlockSidebar from "./AddBlockSidebar/AddBlockSidebar";

const ProjectsScreen = () => {
  return (
    <div>
      <ProjectBar />
      <ProjectView />
      <AddBlockSidebar />
    </div>
  );
};

export default ProjectsScreen;
