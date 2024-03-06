import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Movie from "../pages/Movie";

const routes = [
  { path: "", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/movie/:id", element: <Movie isMovie={true} /> },
  { path: "/tv/:id", element: <Movie isMovie={false} /> },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
