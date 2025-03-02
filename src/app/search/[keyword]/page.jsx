import { fetchSearchAnime, fetchSearchManga } from "@/libs/fetch-api"
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
    const [getSearchAnime, getSearchManga] = await Promise.all([fetchSearchAnime(keyword), fetchSearchManga(keyword)]);

  return (
    <section className={`w-full ${getSearchManga?.data} ? (min-h-full) : (min-h-screen) py-6`}>
        {getSearchManga?.data ? (
            <main>
            <header className="flex flex-col items-center justify-center px-2 text-center md:px-6">
              <h1 className="text-xl font-medium capitalize md:text-4xl">{getParams}</h1>
            </header>
            <AnimeList api={getSearchAnime} setTitle={`Anime result`} linkHref={`/search/anime/${keyword}`} addtionalText="See More..." />
            <AnimeList api={getSearchManga} setTitle={`Manga result`} linkHref={`/search/anime/${keyword}`} addtionalText="" />
            </main>
            ) : (<h1 className="font-semibold text-center uppercase">Fail to fetching data</h1>)}
    </section>
  )
}

export default Page