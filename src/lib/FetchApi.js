const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function untuk fetch dengan error handling yang konsisten
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export const fetchDataApi = async () => {
  try {
    const endpoints = [
      `${baseUrl}/top/anime?limit=6`,
      `${baseUrl}/top/anime`,
      `${baseUrl}/seasons/now?limit=6`,
      `${baseUrl}/seasons/now`,
      `${baseUrl}/genres/manga`,
      `${baseUrl}/genres/anime`,
    ];

    const [
      animePopular,
      allAnimePopular,
      newSeasons,
      allNewSeasons,
      genreManga,
      genreAnime,
    ] = await Promise.all(endpoints.map(url => fetchWithErrorHandling(url)));

    return {
      animePopular,
      allAnimePopular,
      newSeasons,
      allNewSeasons,
      genreManga,
      genreAnime,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return empty data structure instead of props object
    return {
      animePopular: { data: [] },
      allAnimePopular: { data: [] },
      newSeasons: { data: [] },
      allNewSeasons: { data: [] },
      genreManga: { data: [] },
      genreAnime: { data: [] },
    };
  }
};

export const fetchSearchAnime = async (query) => {
  if (!query) {
    throw new Error("Search query is required");
  }
  
  return await fetchWithErrorHandling(`${baseUrl}/anime?q=${encodeURIComponent(query)}`);
};

export const fetchSearchManga = async (query) => {
  if (!query) {
    throw new Error("Search query is required");
  }
  
  return await fetchWithErrorHandling(`${baseUrl}/manga?q=${encodeURIComponent(query)}`);
};