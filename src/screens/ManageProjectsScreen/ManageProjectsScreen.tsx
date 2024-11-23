import React, { useRef } from "react";
import useAppStore from "../../store/store";
import { useNavigate } from "react-router";
import "./ManageProjectsScreen.css";
import "../ProjectsScreen/ProjectBar/ProjectBar.css";
import { Project } from "../../store/types";
import CloseIcon from "../../components/icons/CloseIcon";

type Props = {};

const ManageProjectsScreen = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    blocks,
    currentProject,
    setCurrentProject,
    projects,
    addProject,
    removeProject,
  } = useAppStore();
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

  const handleRemoveProject = (index: number) => () => {
    // If it's the last project removed, wipe out current project
    if (projects.length == 1) setCurrentProject("");
    removeProject(index);
  };

  return (
    <>
      <div className="ProjectBar">
        <div className="content manage-project-bar">
          <h2>Manage Projects:</h2>
          <button onClick={handleBackProjects}>Back to projects</button>
        </div>
      </div>
      <div className="manage-project-container">
        <div style={{ display: "flex" }}>
          <div className="project-list" style={{ width: "61.8%" }}>
            <div>
              <h3>All projects:</h3>
              <ul>
                {projects.map((project, index) => {
                  const numBlocks = blocks.filter(
                    (block) => block.project == project.id
                  ).length;
                  return (
                    <li>
                      <span>
                        <strong>{project.name}</strong>
                        <em>
                          ({numBlocks} block
                          {numBlocks > 1 || (numBlocks == 0 && "s")})
                        </em>
                      </span>{" "}
                      <button
                        title="Remove Project"
                        onClick={handleRemoveProject(index)}
                      >
                        <CloseIcon />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            className="project-input-container"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3>New project:</h3>
            <input ref={inputRef} type="text" placeholder="Project Name" />
            <button onClick={handleAddProject}>Add Project</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProjectsScreen;
