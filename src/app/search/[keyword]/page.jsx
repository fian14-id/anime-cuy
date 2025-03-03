import { fetchSearchAnime, fetchSearchManga } from "@/libs/fetch-api";
import AnimeList from "@/components/AnimeList";
import HeaderProfile from "@/components/ProfileList/HeaderProfile";

export async function generateMetadata({ params }) {
  const { keyword } = params;
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const getParams = keyword.trim().replace(/-/g, " ");
  return {
    title: `${capitalizeWords(getParams)} | Search Anime & Manga`,
    description:
      "Find anime, manga, characters, and people on nexanime with the latest technology and simple designs.",
    openGraph: {
      title: `${capitalizeWords(getParams)} | Search Anime & Manga`,
      description: `Find anime, manga, characters, and people on nexanime with the latest technology and simple designs from the keyword ${capitalizeWords(
        getParams
      )}`,
      images: ["/images/nexanime-img-search.png"],
      type: "website",
    },
  };
}

const Page = async ({ params }) => {
  const { keyword } = params;
  const getParams = keyword.trim().replace(/-/g, " ");
  const [getSearchAnime, getSearchManga] = await Promise.all([
    fetchSearchAnime(keyword),
    fetchSearchManga(keyword),
  ]);

  return (
    <section
      className={`w-full ${getSearchManga?.data} ? (min-h-full) : (min-h-screen) py-6`}
    >
      {getSearchManga?.data ? (
        <main>
          <HeaderProfile title={getParams} />
          <AnimeList
            api={getSearchAnime}
            setTitle={`Anime result`}
            linkHref={`/search/anime/${keyword}`}
            addtionalText="See More..."
          />
          <AnimeList
            api={getSearchManga}
            setTitle={`Manga result`}
            linkHref={`/search/anime/${keyword}`}
            addtionalText=""
          />
        </main>
      ) : (
        <h1 className="font-semibold text-center uppercase">
          Fail to fetching data
        </h1>
      )}
    </section>
  );
};

export default Page;
