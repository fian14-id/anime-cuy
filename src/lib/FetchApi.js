import { cache } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_JIKAN;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_JIKAN is not defined");
}

// Cached fetch handler
const fetchWithCache = cache(async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
});

// Cached data fetching for static content
export const fetchDataApi = cache(async () => {
  try {
    const endpoints = [
      `${baseUrl}/top/anime?limit=6`,
      `${baseUrl}/seasons/now?limit=6`,
      `${baseUrl}/genres/manga`,
      `${baseUrl}/genres/anime`,
    ];

    const [animePopular, newSeasons, genreManga, genreAnime] = 
      await Promise.all(endpoints.map(url => fetchWithCache(url)));

    return {
      animePopular,
      newSeasons,
      genreManga,
      genreAnime,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      animePopular: { data: [] },
      newSeasons: { data: [] },
      genreManga: { data: [] },
      genreAnime: { data: [] },
    };
  }
});

// Dynamic data fetching without cache
export const fetchSearchAnime = async (query) => {
  if (!query) throw new Error("Search query is required");
  return await fetchWithCache(`${baseUrl}/anime?sfw&q=${encodeURIComponent(query)}`);
};

export const fetchSearchManga = async (query) => {
  if (!query) throw new Error("Search query is required");
  return await fetchWithCache(`${baseUrl}/manga?sfw&q=${encodeURIComponent(query)}`);
};

// Cached pagination with revalidation
export const fetchPaginationAnimePopular = cache(async (page) => {
  if (!page) throw new Error("pagination is required");
  return await fetchWithCache(`${baseUrl}/top/manga?page=${page}`);
});

export const fetchPaginationMangaPopular = cache(async (page) => {
  if (!page) throw new Error("pagination is required");
  return await fetchWithCache(`${baseUrl}/top/anime?page=${page}`);
});