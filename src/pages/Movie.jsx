import React, { useEffect, useState } from "react";

import MovieDetails from "../components/MovieDetails";

import { useParams } from "react-router-dom";

export default function Movie({ isMovie }) {
  const { id } = useParams();

  return <MovieDetails isMovie={isMovie} id={id} />;
}
