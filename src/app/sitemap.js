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
        },
        {
            url: `${BASE_URL}/search/characters/${encodedTitle}`,
            lastModified: parseISO(item?.aired?.from || new Date().toISOString()),
            priority: 0.8
        },
        {
            url: `${BASE_URL}/search/people/${encodedTitle}`,
            lastModified: parseISO(item?.aired?.from || new Date().toISOString()),
            priority: 0.8
        },
    ];
};

/**
 * Generates static sitemap for the entire website
 * @returns {Array} Sitemap entries
 */
export default async function sitemap() {
    try {
        // Dapatkan anime dan manga populer terlebih dahulu
        const animeResponse = await fetchApi('top/anime', 'limit=10&sfw');
        const mangaResponse = await fetchApi('top/manga', 'limit=10&sfw');

        const animeItems = animeResponse.data || [];
        const mangaItems = mangaResponse.data || [];

        // Array untuk menyimpan semua entri karakter dan orang (people)
        let characterItems = [];
        let peopleItems = [];

        // Dapatkan karakter untuk setiap anime
        for (const anime of animeItems.slice(0, 5)) { // Batasi ke 5 anime untuk menghindari terlalu banyak permintaan
            if (anime.mal_id) {
                const characterResponse = await fetchApi(`anime/${anime.mal_id}/characters`);
                if (characterResponse.data) {
                    // Ambil informasi karakter
                    characterItems = [
                        ...characterItems,
                        ...characterResponse.data.map(charData => ({
                            ...charData.character,
                            aired: anime.aired // Gunakan tanggal anime sebagai referensi
                        }))
                    ];
                    
                    // Ambil informasi seiyuu/pengisi suara (people)
                    const voiceActors = characterResponse.data
                        .flatMap(charData => charData.voice_actors || [])
                        .filter(va => va && va.person);
                        
                    peopleItems = [
                        ...peopleItems,
                        ...voiceActors.map(va => ({
                            ...va.person,
                            aired: anime.aired // Gunakan tanggal anime sebagai referensi
                        }))
                    ];
                }
            }
        }

        // Dapatkan karakter untuk setiap manga
        for (const manga of mangaItems.slice(0, 5)) { // Batasi ke 5 manga
            if (manga.mal_id) {
                const characterResponse = await fetchApi(`manga/${manga.mal_id}/characters`);
                if (characterResponse.data) {
                    characterItems = [
                        ...characterItems,
                        ...characterResponse.data.map(charData => ({
                            ...charData.character,
                            aired: manga.published // Gunakan tanggal publikasi manga
                        }))
                    ];
                }
            }
        }

        // Hilangkan duplikat berdasarkan ID
        characterItems = Array.from(
            new Map(characterItems.map(item => [item.mal_id, item])).values()
        );
        
        peopleItems = Array.from(
            new Map(peopleItems.map(item => [item.mal_id, item])).values()
        );

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
        
        // Tambahkan URL detail untuk anime dan manga
        const detailRoutes = [
            ...animeItems.map(anime => ({
                url: `${BASE_URL}/anime/${anime.mal_id}`,
                lastModified: parseISO(anime.aired?.from || new Date().toISOString()),
                priority: 0.9
            })),
            ...mangaItems.map(manga => ({
                url: `${BASE_URL}/manga/${manga.mal_id}`,
                lastModified: parseISO(manga.published?.from || new Date().toISOString()),
                priority: 0.9
            })),
            ...characterItems.map(character => ({
                url: `${BASE_URL}/character/${character.mal_id}`,
                lastModified: parseISO(character.aired?.from || new Date().toISOString()),
                priority: 0.8
            })),
            ...peopleItems.map(person => ({
                url: `${BASE_URL}/person/${person.mal_id}`,
                lastModified: parseISO(person.aired?.from || new Date().toISOString()),
                priority: 0.7
            }))
        ];

        // Generate search entries for all items
        const allItems = [...animeItems, ...mangaItems, ...characterItems, ...peopleItems];
        const searchEntries = allItems.flatMap(createSearchEntries);

        // Menggabungkan semua entries
        return [
            ...staticRoutes,
            ...detailRoutes,
            ...searchEntries
        ]
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [] // Return empty sitemap if error occurs
    }
}