import { fetchApi } from "@/libs/fetch-api"

const baseUrl = process.env.NEXT_BASE_URL

export default async function sitemap() {
    const {data} = await fetchApi("top/anime", "limit=4")

    const dataEntry = data.map((result) => ({
        url: `${baseUrl}/anime/${result?.mal_id}`,
        lastModified: new Date(result?.aired?.from),
        priority: 0.8
    }))
    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            priority: 1
        },
        {
            url: `${baseUrl}/popular/anime`,
            lastModified: new Date(),
            priority: 0.8
        },
        {
            url: `${baseUrl}/seasons/now`,
            lastModified: new Date(),
            priority: 0.8
        }, ...dataEntry
    ]
}