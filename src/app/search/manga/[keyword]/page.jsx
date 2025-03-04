import { fetchSearchManga } from "@/libs/fetch-api"
import AnimeList from "@/components/AnimeList"
import { page_content } from "@/libs/setting-app";
export async function generateMetadata({ params }) {
  const { keyword } = params;
  const capitalizeWords = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  const getParams = keyword.trim().replace(/-/g, ' ')
  return {
    title: `${capitalizeWords(getParams)} | Search Manga`,
    description: "Find anime, manga, characters, and people on nexanime with the latest technology and simple designs.",
    metadataBase: new URL(page_content?.url_web),
    openGraph: {
    title: `${capitalizeWords(getParams)} | Search Manga`,
    description: `Find anime, manga, characters, and people on nexanime with the latest technology and simple designs from the keyword ${capitalizeWords(getParams)}`,
    images: ["/images/nexanime-img-search.png"],
    type: "website"
  }
  }
  }

const Page = async ({ params }) => {
    const { keyword } = params
    const getParams = keyword.trim().replace(/-/g, ' ')
    const getSearchManga = await fetchSearchManga(keyword)

  return (
    <section className="w-full h-screen ">
        {getSearchManga?.data ? <AnimeList api={getSearchManga} setTitle={`Search result for: ${getParams}`} linkHref={`/search/manga/${keyword}`} /> : <h1 className="font-semibold uppercase">Fail to fetching data</h1>}
    </section>
  )
}

export default Page