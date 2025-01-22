// File: app/sitemap.js

import { fetchSearchAnime, fetchSearchManga } from "@/lib/FetchApi"
import { parseISO } from 'date-fns'

const BASE_URL = "https://nexanime.fianity.com";

/**
 * Creates search route entries for sitemap
 * @param {Object} item - Anime or manga item
 * @returns {Array} Array of sitemap entries for all search routes
 */
const createSearchEntries = (item) => {
    const encodedTitle = encodeURIComponent(item?.title);
    return [
        // URL untuk pencarian general
        {
            url: `${BASE_URL}/search/${encodedTitle}`,
            lastModified: parseISO(item?.aired?.from || new Date().toISOString()),
            priority: 0.9
        },
        // URL untuk pencarian anime
        {
            url: `${BASE_URL}/search/anime/${encodedTitle}`,
            lastModified: parseISO(item?.aired?.from || new Date().toISOString()),
            priority: 0.8
        },
        // URL untuk pencarian manga
        {
            url: `${BASE_URL}/search/manga/${encodedTitle}`,
            lastModified: parseISO(item?.aired?.from || new Date().toISOString()),
            priority: 0.8
        }
    ];
};

/**
 * Generates static sitemap for the entire website
 * @returns {Array} Sitemap entries
 */
export default async function sitemap() {
    try {
        const responseSearchAnime = await fetchSearchAnime();
        const responseSearchManga = await fetchSearchManga();

        if (!responseSearchAnime || !responseSearchManga) {
            return []
        }

        // Static route entries
        const staticRoutes = [
            {
                url: BASE_URL,
                lastModified: new Date(),
                priority: 1.0
            },
            {
                url: `${BASE_URL}/search`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/search/anime`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/search/manga`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/popular/anime`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/popular/manga`,
                lastModified: new Date(),
                priority: 0.9
            },
        ];

        // Generate search entries for all items
        const allItems = [...responseSearchAnime, ...responseSearchManga];
        const searchEntries = allItems.flatMap(createSearchEntries);

        // Menggabungkan semua entries
        return [
            ...staticRoutes,
            ...searchEntries
        ]
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [] // Return empty sitemap if error occurs
    }
}