import { fetchApi } from "@/libs/fetch-api";
import { parseISO } from 'date-fns';

const BASE_URL = "https://nexanime.fianity.com";

/**
 * Creates search route entries for sitemap
 * @param {Object} item - Anime or manga item
 * @returns {Array} Array of sitemap entries for all search routes
 */
const createSearchEntries = (item) => {
    const encodedTitle = encodeURIComponent(item?.title !== null ? item.title : item?.name);
    return [
        // URL untuk pencarian general
        {
            url: `${BASE_URL}/search/${encodedTitle}`,
            lastModified: parseISO(item?.aired?.from || new Date().toISOString()),
            priority: 0.9
        },
    ];
};

/**
 * Generates static sitemap for the entire website
 * @returns {Array} Sitemap entries
 */
export default async function sitemap() {
    try {
        // Instead of using search functions directly, use fetchApi to get popular items
        // These endpoints don't require a search query
        const animeResponse = await fetchApi('top/anime', 'limit=5&sfw');

        // Extract data from responses
        const animeItems = animeResponse.data || [];
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
                url: `${BASE_URL}/search/characters`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/search/people`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/character`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/person`,
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
            {
                url: `${BASE_URL}/seasons/now`,
                lastModified: new Date(),
                priority: 0.9
            },
            {
                url: `${BASE_URL}/seasons/upcoming`,
                lastModified: new Date(),
                priority: 0.9
            },
        ];

        // Generate search entries for all items
        const allItems = [...animeItems];
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