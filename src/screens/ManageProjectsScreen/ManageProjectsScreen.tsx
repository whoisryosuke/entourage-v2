import React, { useRef } from "react";
import useAppStore from "../../store/store";
import { useNavigate } from "react-router";
import "./ManageProjectsScreen.css";

type Props = {};

const ManageProjectsScreen = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { currentProject, setCurrentProject, projects, addProject } =
    useAppStore();
  const navigate = useNavigate();

  const handleAddProject = () => {
    if (!inputRef.current) return;
    const name = inputRef.current.value;

    // Check if name exists
    const exists = projects.find((project) => project.name == name);
    if (exists) return;

    const hash = Number(new Date()).toString(36);
    const newProject: Project = {
      id: hash,
      name,
    };
    addProject(newProject);

    // No current project? Set this as default!
    if (currentProject == "") setCurrentProject(hash);
  };

  const handleBackProjects = () => {
    navigate("/");
  };

  return (
    <div className="manage-project-container">
      <div className="manage-project-bar">
        <h2>All projects:</h2>

        <button onClick={handleBackProjects}>Back to projects</button>
      </div>
      <div style={{ display: "flex" }}>
        <div className="project-list" style={{ width: "61.8%" }}>
          <ul>
            {projects.map((project) => (
              <li>{project.name}</li>
            ))}
          </ul>
        </div>
        <div
          className="project-input-container"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input ref={inputRef} type="text" placeholder="Project Name" />
          <button onClick={handleAddProject}>Add Project</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProjectsScreen;
