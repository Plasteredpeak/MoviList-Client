import React, { useEffect, useState } from "react";

import { getMovies } from "../services/movies.services";
import { TMDB_IMAGE_URL } from "../utils/constants";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-8 text-4xl font-bold">Popular Movies</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-col">
            <img
              src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
            <h2 className="mt-4 text-lg font-bold">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
