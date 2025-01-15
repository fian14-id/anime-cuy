import { fetchGenreAnime, fetchGenreManga } from "@/config/FetchApi";
import { DataProvider } from "@/components/utilities/DataContext";
import Genres from "./Genres";
import InputSearch from "./InputSearch";

export const metadata = {
  title: "Search",
  openGraph: {
    title: "Search",
    description: "Search for your favorite anime and manga",
  }
}

const Page = async () => {
  const anime = await fetchGenreAnime();
  const manga = await fetchGenreManga();

  return (
    <DataProvider>
      <section>
        <InputSearch />
        <Genres 
          initialAnimeData={anime?.data || []} 
          initialMangaData={manga?.data || []} 
        />
      </section>
    </DataProvider>
  );
};

export default Page;