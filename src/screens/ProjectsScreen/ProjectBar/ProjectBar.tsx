import React from "react";
import "./ProjectBar.css";
import useAppStore from "../../../store/store";
import { useNavigate } from "react-router";
import AppLogo from "../../../components/icons/AppLogo";
import PlusCircleIcon from "../../../components/icons/PlusCircleIcon";
import GlassButton from "../../../components/GlassButton";
import Select from "../../../components/Select";
import MessageSquareEditIcon from "../../../components/icons/MessageSquareEditIcon";
import FolderOpenIcon from "../../../components/icons/FolderOpenIcon";

const ProjectBar = () => {
  const {
    projects,
    currentProject,
    setCurrentProject,
    toggleProjectSidebar,
    editMode,
    toggleEditMode,
  } = useAppStore();
  let navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/manage-projects");
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("changing project", e.currentTarget.value);
    setCurrentProject(e.currentTarget.value);
  };

  const handleNewBlock = () => {
    toggleProjectSidebar();
  };
  const handleEditMode = () => {
    toggleEditMode();
  };

  return (
    <div className="ProjectBar">
      <div className="content">
        <div className="centered-row">
          <AppLogo className="Logo" />
          <Select
            value={currentProject}
            onChange={handleProjectChange}
            containerStyle={{ marginRight: "0.5rem" }}
          >
            {projects.map((project) => (
              <option value={project.id}>{project.name}</option>
            ))}
            {projects.length == 0 && <option>Please add one</option>}
          </Select>
          <GlassButton onClick={handleNewProject}>
            <FolderOpenIcon />
            Manage Projects
          </GlassButton>
        </div>
        <div className="centered-row">
          {projects.length > 0 && currentProject != "" && (
            <>
              <GlassButton onClick={handleNewBlock}>
                <PlusCircleIcon /> New Block
              </GlassButton>
              <GlassButton onClick={handleEditMode}>
                <MessageSquareEditIcon />
                {editMode ? "Done editing" : "Edit Blocks"}
              </GlassButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectBar;
