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

// Core reusable fetch function
export const fetchApi = cache(async (resource, query = '', retries = 3) => {
  await rateLimiter.getToken();
  
  const endpoint = `${baseUrl}/${resource}${query ? `?${query}` : ''}`;
  
  try {
    const response = await fetch(endpoint, {
      next: { revalidate: CACHE_DURATION }
    });
    
    if (response.status === 429 && retries > 0) {
      console.log(`Rate limited, retrying in 2 seconds... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchApi(resource, query, retries - 1);
    }
    
    if (response.status === 404) {
      return { data: null, error: "Resource not found" };
    }
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.log(`Request failed, retrying... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchApi(resource, query, retries - 1);
    }
    throw error;
  }
});

// Specific API functions using the core fetchApi
export const fetchSearchAnime = (query) => {
  if (!query) throw new Error("Search query is required");
  return fetchApi('anime', `q=${encodeURIComponent(query)}&sfw`);
};

export const fetchSearchManga = (query) => {
  if (!query) throw new Error("Search query is required");
  return fetchApi('manga', `q=${encodeURIComponent(query)}&sfw`);
};  

export const fetchSearchCharacter = (query) => {
  if (!query) throw new Error("Search query is required");
  return fetchApi('characters', `q=${encodeURIComponent(query)}`);
};  

export const fetchPaginationAnimePopular = (page) => {
  if (!page) throw new Error("Page is required");
  return fetchApi('top/anime', `page=${page}&sfw`);
};

export const fetchPaginationMangaPopular = (page) => {
  if (!page) throw new Error("Page is required");
  return fetchApi('top/manga', `page=${page}&sfw`);
};

export const fetchPaginationNow = (page) => {
  if (!page) throw new Error("Page is required");
  return fetchApi('seasons/now', `page=${page}&sfw`);
};

export const fetchDetailsAnime = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`anime/${id}/full`);
};

export const fetchDetailsManga = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`manga/${id}/full`);
};

export const fetchCharactersManga = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`manga/${id}/characters`);
};

export const fetchCharactersAnime = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`anime/${id}/characters`);
};
export const fetchCharactersFull = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`characters/${id}/full`);
};
export const fetchCharactersPictures = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`characters/${id}/pictures`);
};
export const fetchPersonPictures = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`people/${id}/pictures`);
};
export const fetchPersonFull = (id) => {
  if (!id) throw new Error("ID is required");
  return fetchApi(`people/${id}/full`);
};
