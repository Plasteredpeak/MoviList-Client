import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../components/MovieDetails";

const routes = [
  { path: "", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/movie/:id", element: <MovieDetails isMovie={true} /> },
  { path: "/tv/:id", element: <MovieDetails isMovie={false} /> },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
