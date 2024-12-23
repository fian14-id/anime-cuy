import { searchAnime } from "@/config/FetchApi"
import AnimeList from "@/components/AnimeList"
export const metadata = {
    title: "Result",
    openGraph: {
      title: "Result search",
      description: "Search for your favorite anime and manga",
    }
  }

const Page = async ({ params }) => {
    const { keyword } = params
    const getSearchAnime = await searchAnime(keyword)

  return (
    <section className="w-full h-screen ">
        {getSearchAnime?.data ? <AnimeList api={getSearchAnime} setTitle={`Search result for ${keyword}`} linkHref={`/search/anime/${keyword}`} /> : <h1 className="font-semibold uppercase">Fail to fetching data</h1>}
    </section>
  )
}

export default Page