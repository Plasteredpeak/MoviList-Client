import React, { useEffect, useState } from "react";

import { getMovie, getSeries } from "../services/tmdb.services";

export default function MovieDetails({ isMovie, id }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = isMovie ? await getMovie(id) : await getSeries(id);

      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[90vh] px-20">
      <div className="mt-8 flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className="h-96 w-64 rounded-md"
        />
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>
          <div className="mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="mr-2 rounded-md bg-gray-200 px-2 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-lg">{movie.overview}</p>
          <div className="mt-4">
            <span className="font-bold">Release Date:</span>{" "}
            {movie.release_date || movie.first_air_date}
          </div>
          {isMovie && (
            <div className="mt-4">
              <span className="font-bold">Duration:</span>{" "}
              {(movie.runtime / 60).toFixed(1)} hours
            </div>
          )}
          <div className="mt-4">
            <span className="font-bold">Rating:</span>{" "}
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
