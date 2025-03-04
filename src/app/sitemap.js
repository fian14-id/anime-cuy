import { fetchApi, fetchCharactersAnime } from "@/libs/fetch-api";
import { parseISO } from "date-fns";

const BASE_URL = "https://nexanime.fianity.com";

export default async function sitemap() {
    try {
        const animeItems = (await fetchApi("top/anime", "limit=5&sfw")).data || [];
        let characterItems = new Map(), peopleItems = new Map();

        for (const anime of animeItems) {
            const characterData = (await fetchCharactersAnime(anime.mal_id)).data?.[0];
            if (characterData) {
                characterItems.set(characterData.character.mal_id, {
                    ...characterData.character,
                    aired: anime.aired,
                });
                if (characterData.voice_actors?.[0]) {
                    peopleItems.set(characterData.voice_actors[0].person.mal_id, {
                        ...characterData.voice_actors[0].person,
                        aired: anime.aired,
                    });
                }
            }
        }

        const staticRoutes = ["", "/search", "/search/anime", "/search/manga", "/search/characters", "/search/people", 
            "/character", "/person", "/popular/anime", "/popular/manga", "/seasons/now", "/seasons/upcoming"].map(path => ({
            url: `${BASE_URL}${path}`,
            lastModified: new Date(),
            priority: 0.9,
        }));

        const detailRoutes = [...animeItems, ...characterItems.values()].map(item => ({
            url: `${BASE_URL}/${item.mal_id ? "anime" : "character"}/${item.mal_id}`,
            lastModified: parseISO(item.aired?.from || new Date().toISOString()),
            priority: item.mal_id ? 0.9 : 0.8,
        }));

        return [...staticRoutes, ...detailRoutes];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [];
    }
}
