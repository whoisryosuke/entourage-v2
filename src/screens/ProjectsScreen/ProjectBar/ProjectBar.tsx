import React from "react";
import "./ProjectBar.css";
import useAppStore from "../../../store/store";
import { useNavigate } from "react-router";

type Props = {};

const ProjectBar = (props: Props) => {
  const { projects, currentProject, setCurrentProject, toggleProjectSidebar } =
    useAppStore();
  let navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/manage-projects");
  };

  const handleProjectChange = (e) => {
    console.log("changing project", e.currentTarget.value);
    setCurrentProject(e.currentTarget.value);
  };

  const handleNewBlock = () => {
    toggleProjectSidebar();
  };

  return (
    <div className="ProjectBar">
      <select value={currentProject} onChange={handleProjectChange}>
        {projects.map((project) => (
          <option value={project.id}>{project.name}</option>
        ))}
        {projects.length == 0 && <option>Please add one</option>}
      </select>
      <button onClick={handleNewProject}>Manage Projects</button>
      {projects.length > 0 && currentProject != "" && (
        <button onClick={handleNewBlock}>New Block</button>
      )}
    </div>
  );
};

export default ProjectBar;
