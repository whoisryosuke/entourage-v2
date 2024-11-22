import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import ProjectsScreen from "./screens/ProjectsScreen/ProjectsScreen";

type Props = {};

const Router = (props: Props) => (
  <Routes>
    <Route path="/" element={<ProjectsScreen />} />
  </Routes>
);

export default Router;
