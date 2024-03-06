import { TMDB_IMAGE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function ListComponent({ title, movies }) {
  const navigate = useNavigate();
  const shownMovies = movies.slice(0, 5);
  return (
    <div className="container mx-auto px-20">
      <div className="flex justify-between">
        <h1 className="mt-8 text-2xl font-bold">{title}</h1>
        <a
          href="/"
          className="text-md mt-8 font-semibold text-gray-800 underline"
        >
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shownMovies.map((movie) => (
          <div
            key={movie.id}
            className="mt-2 flex transform flex-col transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
            onClick={() => {
              movie.title
                ? navigate(`/movie/${movie.id}`)
                : navigate(`/tv/${movie.id}`);
            }}
          >
            <div className="max-h-96 overflow-hidden">
              <img
                src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-full w-full rounded-md"
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
}
