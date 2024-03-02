import axios from "axios";
import { TMDB_BASE_URL } from "../utils/constants";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

console.log(API_KEY);

export const getMovies = async () => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  return data;
};

export const getMovie = async (id) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return data;
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const getTopRatedMovies = async () => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  return data;
};
