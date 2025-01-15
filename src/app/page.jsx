import * as motion from "framer-motion/client";
import AnimeList from "@/components/AnimeList";
import { fetchPopularAnime, fetchNewAnime } from "@/config/FetchApi";
import { page_content } from "@/config/setting-app";

const Page = async () => {
  const animePopular = await fetchPopularAnime();
  const newSeason = await fetchNewAnime();

  // if(!anime || !anime.data) {
  //   return <div className="flex items-center justify-center w-full h-screen">
  //     <h1 className="font-semibold uppercase">Fail to fetching data</h1>
  //   </div>
  // }

  return (
    <section className="w-full h-full">
      <main className="relative flex flex-col items-center justify-center min-w-full min-h-screen text-center ">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="text-6xl font-bold text-transparent lg:text-9xl md:text-7xl bg-clip-text"
          style={ animePopular?.data?.[0]?.images?.webp?.image_url ? { backgroundImage: `url(${animePopular.data[0].images.webp.image_url})` } : { backgroundColor: "white" }
          }
        >
          {page_content.name_page}
        </motion.h1>
        <br />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="px-6 text-sm font-medium text-palette-secondary md:text-lg "
        >
          {page_content.description}
        </motion.p>
        <div className="w-5 mt-8 mouse h-9"></div>
        <span className="mt-2 text-xs md:text-sm font-semibold uppercase">
          scroll down
        </span>
      </main>

      {animePopular ? (
        <>
        <AnimeList
        api={animePopular}
        setTitle="Popular Anime"
        linkHref="/popular"
        addtionalText="See More..."
      />
      <AnimeList api={newSeason} setTitle="New Anime" linkHref="/ongoing" addtionalText="See More..." />
        </>
      ) : (<h2 className="text-center">Fail to Fetching Data</h2>)}
    </section>
  );
};

export default Page;
