import React, { useEffect, useState } from "react";
import { TMDB_IMAGE_URL } from "../utils/constants";
import { useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";

import {
  getMovies,
  getPopularSeries,
  getTopRatedMovies,
  getTopRatedSeries,
  getTrending,
} from "../services/tmdb.services";

import { useNavigate } from "react-router-dom";
import { FaCalendar, FaCheck, FaPlay, FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const MoviesView = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const title = type.replace(/-/g, " ").toUpperCase();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [hovered, setHovered] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setTotalPages(data.total_pages);
      setSearchParams((params) => ({
        ...params,
        page: page.toString(),
      }));
      setLoading(false);
    };

    fetchData();
  }, [type, page, searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams((params) => ({
      ...params,
      page: newPage.toString(),
    }));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-5 min-h-[90vh] px-20">
      <div className="flex justify-between">
        <h1 className="mt-8 text-2xl font-bold">{title}</h1>
      </div>
      <div className="mb-4 flex justify-center">
        <label className="input input-secondary my-4 flex w-1/2 items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="cursor-pointer text-xl" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="mt-2 flex transform flex-col transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <div className="group relative max-h-96 overflow-hidden">
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
              <div id="icons">
                <div className="absolute bottom-3 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Add to completed"
                  >
                    <div
                      className="text-md btn btn-circle btn-secondary btn-sm "
                      onMouseEnter={() => setHovered(true)}
                    >
                      {!hovered ? <FaPlus /> : <FaCheck />}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[5.25rem] right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Add to watching"
                  >
                    <div className="text-md btn btn-circle btn-secondary btn-sm">
                      <FaPlay />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Add to Planning"
                  >
                    <div className="text-md btn btn-circle btn-secondary btn-sm">
                      <FaCalendar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mt-2 text-lg font-bold">
              {movie.title || movie.name}
            </h2>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MoviesView;
