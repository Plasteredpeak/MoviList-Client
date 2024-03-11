import React from "react";
import { TMDB_IMAGE_URL } from "../utils/constants";

import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import {
  getMovies,
  getPopularSeries,
  getTopRatedMovies,
  getTopRatedSeries,
  getTrending,
} from "../services/tmdb.services";

const MoviesView = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const title = type.replace(/-/g, " ").toUpperCase();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let data;
      switch (type) {
        case "trending":
          data = await getTrending(page);
          break;
        case "popular-movies":
          data = await getMovies(page);
          break;
        case "top-rated-movies":
          data = await getTopRatedMovies(page);
          break;
        case "popular-series":
          data = await getPopularSeries(page);
          break;
        case "top-rated-series":
          data = await getTopRatedSeries(page);
          break;
        default:
          data = [];
      }
      setMovies(data.results);
      setSearchParams((params) => ({
        ...params,
        page: page.toString(),
      }));
    };

    fetchData();
  }, [type, page, setSearchParams]);

  return (
    <div className="container mx-auto mb-5 px-20">
      <div className="flex justify-between">
        <h1 className="mt-8 text-2xl font-bold">{title}</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="mt-2 flex transform flex-col transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <div className="max-h-96 overflow-hidden">
              <img
                src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-full w-full rounded-md"
                onClick={() => {
                  movie.title
                    ? navigate(`/movie/${movie.id}`)
                    : navigate(`/tv/${movie.id}`);
                }}
              />
            </div>
            <h2 className="mt-2 text-lg font-bold">
              {movie.title || movie.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesView;
