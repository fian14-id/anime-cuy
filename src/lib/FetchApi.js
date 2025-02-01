// lib/fetchApi.js
import { cache } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_JIKAN;
const CACHE_DURATION = 3600; // 1 hour in seconds

// Rate limiting helper
const rateLimiter = {
  tokens: 60,
  lastRefill: Date.now(),
  
  async getToken() {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    if (timePassed >= 60000) {
      this.tokens = 60;
      this.lastRefill = now;
    }
    
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    
    return new Promise(resolve => {
      setTimeout(async () => {
        resolve(await this.getToken());
      }, 1000);
    });
  }
};

// Safely check if we're on client side
const isClient = typeof window !== 'undefined';

// Enhanced fetch with retry logic
const enhancedFetch = cache(async (url, options = {}, retries = 3) => {
  await rateLimiter.getToken();
  
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: CACHE_DURATION },
    });
    
    if (response.status === 429 && retries > 0) {
      console.log(`Rate limited, retrying in 2 seconds... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return enhancedFetch(url, options, retries - 1);
    }
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (retries > 0 && error.message.includes('failed')) {
      console.log(`Request failed, retrying... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return enhancedFetch(url, options, retries - 1);
    }
    throw error;
  }
});

// Safe localStorage operations
const storage = {
  get: (key) => {
    if (!isClient) return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  },
  
  set: (key, value) => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to localStorage:', e);
    }
  }
};

// Enhanced data fetching with safe local storage fallback
export const fetchDataApi = cache(async () => {
  const STORAGE_KEY = 'anime_data_cache';
  const MAX_CACHE_AGE = 3600000; // 1 hour in milliseconds
  
  try {
    // Try to get data from localStorage if we're on client side
    const cachedData = storage.get(STORAGE_KEY);
    if (cachedData) {
      const { timestamp, data } = cachedData;
      if (Date.now() - timestamp < MAX_CACHE_AGE) {
        return data;
      }
    }
    
    const endpoints = [
      `${baseUrl}/top/anime?limit=6`,
      `${baseUrl}/seasons/now?limit=6`,
      `${baseUrl}/genres/manga`,
      `${baseUrl}/genres/anime`,
    ];

    const [animePopular, newSeasons, genreManga, genreAnime] = 
      await Promise.all(endpoints.map(url => enhancedFetch(url)));

    const result = {
      animePopular,
      newSeasons,
      genreManga,
      genreAnime,
    };
    
    // Save to localStorage if we're on client side
    storage.set(STORAGE_KEY, {
      timestamp: Date.now(),
      data: result
    });

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Try to get cached data even if expired
    const cachedData = storage.get(STORAGE_KEY);
    if (cachedData) {
      return cachedData.data;
    }
    
    // Fallback data if everything fails
    return {
      animePopular: { data: [] },
      newSeasons: { data: [] },
      genreManga: { data: [] },
      genreAnime: { data: [] },
    };
  }
});

// Specific fetch functions
export const fetchSearchAnime = async (query) => {
  if (!query) throw new Error("Search query is required");
  return await enhancedFetch(`${baseUrl}/anime?q=${encodeURIComponent(query)}`);
};

export const fetchSearchManga = async (query) => {
  if (!query) throw new Error("Search query is required");
  return await enhancedFetch(`${baseUrl}/manga?q=${encodeURIComponent(query)}`);
};

export const fetchPaginationAnimePopular = cache(async (page) => {
  if (!page) throw new Error("pagination is required");
  return await enhancedFetch(`${baseUrl}/top/anime?page=${page}`);
});
export const fetchPaginationMangaPopular = cache(async (page) => {
  if (!page) throw new Error("pagination is required");
  return await enhancedFetch(`${baseUrl}/manga/manga?page=${page}`);
});
export const fetchPaginationNow = cache(async (page) => {
  if (!page) throw new Error("pagination is required");
  return await enhancedFetch(`${baseUrl}/seasons/now?page=${page}`);
});
export const fetchDetailsAnime = cache(async (id) => {
  if (!id) throw new Error("id is required");

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      if (attempts > 0) {
        await delay(1000 * (attempts + 1));
      }

      const response = await fetch(`${baseUrl}/anime/${id}/full`, {
        next: { revalidate: CACHE_DURATION }
      });

      if (response.status === 429) {
        console.log(`rate limited, waiting before retry...`);
        attempts++;
        continue;
      }

      if (response.status === 404) {
        return {
          data: null,
          error: "Anime tidak ditemukan!"
        };
      }

      if (!response.ok) {
        throw new Error(`Api Call Failed: ${response.status}`);
      }

      const data = response.json()
      return data;
    } catch (error) {
      attempts++;
      if (attempts === maxAttempts) {
        throw error;
      }
      console.log(`Request failed, attempt ${attempts} of ${maxAttempts}`);
    }
  }
  return await enhancedFetch(`${baseUrl}/anime/${id}/full`);
});
export const fetchDetailsManga = cache(async (id) => {
  if (!id) throw new Error("id is required");
  
  // Tambahkan delay helper
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      // Tambahkan delay antara requests untuk menghindari rate limiting
      if (attempts > 0) {
        await delay(1000 * (attempts + 1)); // Exponential backoff
      }
      
      const response = await fetch(`${baseUrl}/manga/${id}/full`, {
        next: { revalidate: CACHE_DURATION }
      });
      
      // Handle rate limiting
      if (response.status === 429) {
        console.log(`Rate limited, waiting before retry...`);
        attempts++;
        continue;
      }
      
      // Handle 404
      if (response.status === 404) {
        return {
          data: null,
          error: "Manga tidak ditemukan"
        };
      }
      
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      attempts++;
      if (attempts === maxAttempts) {
        throw error;
      }
      console.log(`Request failed, attempt ${attempts} of ${maxAttempts}`);
    }
  }
});
