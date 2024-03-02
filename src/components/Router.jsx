import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";

const routes = [{ path: "/", element: <Home /> }];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
