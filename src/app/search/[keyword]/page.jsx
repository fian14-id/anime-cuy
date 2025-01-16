import { fetchSearchAnime, fetchSearchManga } from "@/lib/FetchApi"
import AnimeList from "@/components/AnimeList"

export async function generateMetadata({ params }) {
  const { keyword } = params;
  const capitalizeWords = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  const getParams = keyword.trim().replace(/-/g, ' ')
    return {
      title: `${capitalizeWords(getParams)} | Search`,
      openGraph: {
      title: `${capitalizeWords(getParams)} | Search`,
      description: `Searching for your favorite anime and manga from the keyword ${capitalizeWords(getParams)}`,
    }
  }
  }

const Page = async ({ params }) => {
    const { keyword } = params
    const getParams = keyword.trim().replace(/-/g, ' ')
    const getSearchAnime = await fetchSearchAnime(keyword)
    const getSearchManga = await fetchSearchManga(keyword)

  return (
    <section className={`w-full ${getSearchManga?.data} ? (min-h-full) : (min-h-screen) py-6`}>
        {getSearchManga?.data ? (
            <>
            <AnimeList api={getSearchAnime} setTitle={`Anime result for: ${getParams}`} linkHref={`/search/anime/${keyword}`} addtionalText="" />
            <AnimeList api={getSearchManga} setTitle={`Manga result for: ${getParams}`} linkHref={`/search/anime/${keyword}`} addtionalText="" />
            </>
            ) : (<h1 className="font-semibold uppercase text-center">Fail to fetching data</h1>)}
    </section>
  )
}

export default Page