import { searchManga } from "@/config/FetchApi"
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
    const getSearchManga = await searchManga(keyword)

  return (
    <section className={`w-full ${getSearchManga?.data} ? (min-h-full) : (min-h-screen) py-6`}>
        {getSearchManga?.data ? <AnimeList api={getSearchManga} setTitle={`Search result for: ${keyword}`} linkHref={`/search/anime/${keyword}`} addtionalText="" /> : <h1 className="font-semibold uppercase text-center">Fail to fetching data</h1>}
    </section>
  )
}

export default Page