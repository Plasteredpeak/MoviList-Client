import axios from "axios";
import { TMDB_BASE_URL } from "../utils/constants";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getMovies = async (page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page,
    },
  });
  return data;
};

export const getTrending = async (page) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return data;
};

export const getPopularSeries = async (page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/trending/tv/week`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page,
    },
  });
  return data;
};

export const getTopRatedSeries = async (page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page,
    },
  });
  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page,
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

export const getSeries = async (id) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return data;
};

export const getMovieRecommendations = async (id) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/movie/${id}/recommendations`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    },
  );
  return data;
};

export const getSeriesRecommendations = async (id) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/tv/${id}/recommendations`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    },
  );
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      query,
      page,
    },
  });
  return data;
};

export const searchSeries = async (query, page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      query,
      page,
    },
  });
  return data;
};
