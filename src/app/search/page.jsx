import { fetchDataApi } from "@/lib/FetchApi";
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

export const revalidate = 3600
export const dynamicParams = true
export const getData = async () => {
  const data = await fetchDataApi();
  return data;
};

const Page = async () => {
  const {genreManga, genreAnime} = await getData();

  return (
    <DataProvider>
      <section>
        <InputSearch />
        <Genres 
          initialAnimeData={genreAnime?.data || []} 
          initialMangaData={genreManga?.data || []} 
        />
      </section>
    </DataProvider>
  );
};

export default Page;