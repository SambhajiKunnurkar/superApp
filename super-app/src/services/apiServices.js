import axios from "axios";

// ── pull keys from .env ───────────────────────────────────────────────────
const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const NEWS_KEY    = import.meta.env.VITE_NEWS_API_KEY;
const OMDB_KEY    = import.meta.env.VITE_OMDB_API_KEY;

// console.log(WEATHER_KEY);

// ── one axios client per API ──────────────────────────────────────────────
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com",
});


export const fetchCurrentWeather = async (city = "London") => {
  try {
    const response = await weatherClient.get("/weather", {
      params: {
        q:       city,
        units:   "metric",   // celsius
        appid:   WEATHER_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Weather service failure:", error.message);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────────────────
// NEWS
// Fetches top headlines for a given category.
// Used by NewsWidget — auto-rotates every 2 seconds.
// ─────────────────────────────────────────────────────────────────────────
export const fetchTopHeadlines = async (category = "general") => {
  try {
    const response = await newsClient.get("/top-headlines", {
      params: {
        category: category,
        language: "en",
        pageSize: 15,
        apiKey:   NEWS_KEY,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error("News service failure:", error.message);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────────────────
// MOVIES — search by genre keyword
// Searches OMDB for movies matching a genre string.
// Called once per selected category on the Movies page.
// ─────────────────────────────────────────────────────────────────────────
export const searchMovieByGenre = async (query) => {
  try {
    const response = await movieClient.get("/", {
      params: {
        s:      query,
        type:   "movie",
        apikey: OMDB_KEY,
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Movie search failure:", error.message);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────────────────
// MOVIES — full detail for one movie by imdbID
// Called when user clicks a movie card to open the detail modal.
// ─────────────────────────────────────────────────────────────────────────
export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await movieClient.get("/", {
      params: {
        i:      imdbID,
        plot:   "full",
        apikey: OMDB_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Movie detail failure:", error.message);
    throw error;
  }
};