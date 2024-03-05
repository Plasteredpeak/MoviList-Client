import React, { useEffect, useState } from "react";

import { getMovies } from "../services/movies.services";
import ListComponent from "../components/ListComponent";

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
    <div className="mx-auto mb-8">
      <ListComponent title="Trending Now" movies={movies} />
      <ListComponent title="Popular this Season" movies={movies} />
      <ListComponent title="Upcoming" movies={movies} />
      <ListComponent title="Top Rated" movies={movies} />
    </div>
  );
}
