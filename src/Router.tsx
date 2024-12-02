import { Route, Routes } from "react-router";
import ProjectsScreen from "./screens/ProjectsScreen/ProjectsScreen";
import ManageProjectsScreen from "./screens/ManageProjectsScreen/ManageProjectsScreen";
import "./App.css"; // Import global CSS here

const Router = () => (
  <Routes>
    <Route path="/" element={<ProjectsScreen />} />
    <Route path="/manage-projects" element={<ManageProjectsScreen />} />
  </Routes>
);

export default Router;
