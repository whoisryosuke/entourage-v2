import React from "react";
import { Route, Routes } from "react-router";
import ProjectsScreen from "./screens/ProjectsScreen/ProjectsScreen";
import ManageProjectsScreen from "./screens/ManageProjectsScreen/ManageProjectsScreen";
import "./App.css"; // Import global CSS here

type Props = {};

const Router = (props: Props) => (
  <Routes>
    <Route path="/" element={<ProjectsScreen />} />
    <Route path="/manage-projects" element={<ManageProjectsScreen />} />
  </Routes>
);

export default Router;
