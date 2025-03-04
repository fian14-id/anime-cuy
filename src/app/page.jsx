import * as motion from "framer-motion/client";
import { fetchApi, fetchNestedAnime } from "@/libs/fetch-api";
import { page_content } from "@/libs/setting-app";
import Image from "next/image";
import Link from "next/link";
import ListAnime from "@/components/AnimeList/ListAnime";
import { getRandomIndex, reproduce } from "@/libs/simple-function";
export const revalidate = 7200;
export const dynamicParams = false;

// Metadata
export async function generateMetadata() {
  return {
    title: page_content.name_page,
    description: "Find anime, manga, characters and people on nexanime with a simple interface and data derived from myanimelist.",
    openGraph: {
      title: page_content.name_page,
      description: "Find anime, manga, characters and people on nexanime with a simple interface and data derived from myanimelist.",
      images: ["/images/nexanime-img.png"],
      type: "website",
    },
  };
}


// Hero section component
const HeroSection = ({ topAnimeImage, newAnimeImage }) => (
  <main className="relative flex flex-col items-start justify-between w-full h-[85svh] md:h-[90dvh]">
    <main className="absolute z-10 flex flex-col md:flex-row top-36 sm:top-52 left-8 sm:left-36 md:left-56">
      <div className="flex gap-4">
        <motion.div className="mb-10 md:mb-20" initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "easeInOut", delay: 0.5, duration: 0.5 }}>
          <Image
            width={400}
            height={600}
            src={topAnimeImage?.images?.jpg?.large_image_url}
            alt="top-anime"
            className="rounded-md shadow-lg w-36 sm:w-44 md:w-72"
            loading="lazy"
          />
        </motion.div>
        <motion.div className="mt-10 md:mt-20" initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "easeInOut", delay: 1, duration: 0.5 }}>
          <Image
            width={400}
            height={600}
            src={newAnimeImage?.images?.jpg?.large_image_url}
            alt="new-anime"
            className="rounded-md shadow-lg w-36 sm:w-44 md:w-72"
            loading="lazy"
          />
        </motion.div>
      </div>
      <div className="flex flex-col gap-4 mt-4 ml-4 md:mt-0 md:gap-10 md:ml-20">
        <article>
            <div className="relative">
              <h2 className="relative text-xs font-semibold uppercase md:text-lg">
            {topAnimeImage?.title}
          </h2>
              <motion.div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary" initial={{ width: 500}} whileInView={{ width: 0}} transition={{delay: 0.5, ease: "easeIn", duration: 1}} viewport={{once: true}} />
          </div>
          {topAnimeImage?.synopsis?.length > 100 ? (
            <motion.p initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{ease: "easeIn", delay: 0.5, duration: 0.5}} viewport={{once: true}} className="w-1/2 text-xs">
              {topAnimeImage?.synopsis?.slice(0, 100)}
              <Link
                href={`/anime/${topAnimeImage?.mal_id}`}
                className="ml-2 text-xs font-bold tracking-widest md:text-sm hover:opacity-70 hover:text-palette-accent"
              >
                ...
              </Link>
            </motion.p>
          ) : (
            <p className="w-1/2 text-xs">{topAnimeImage?.synopsis}</p>
          )}
        </article>
        <article className="mr-16 text-end md:text-start">
          <div className="relative">
          <h2 className="relative w-full overflow-x-hidden text-xs font-semibold uppercase md:text-lg">
            {newAnimeImage?.title}
          </h2>
          <motion.div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary" initial={{ width: 500}} whileInView={{ width: 0}} transition={{delay: 0.5, ease: "easeIn", duration: 0.5}} viewport={{once: true}} />
          </div>
          {newAnimeImage?.synopsis?.length > 100 ? (
            <motion.p initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{ease: "easeIn", delay: 0.5, duration: 0.5}} viewport={{once: true}} className="w-full text-xs md:w-1/2">
              {newAnimeImage?.synopsis?.slice(0, 100)}
              <Link
                href={`/anime/${newAnimeImage?.mal_id}`}
                className="ml-2 text-xs font-bold tracking-widest md:text-sm hover:opacity-70 hover:text-palette-accent"
              >
                ...
              </Link>
            </motion.p>
          ) : (
            <p className="w-full text-xs md:w-1/2">{newAnimeImage?.synopsis}</p>
          )}
        </article>
      </div>
    </main>
    <motion.p
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="w-1/2 px-4 mb-4 text-xs font-medium uppercase md:w-1/3 md:px-6 text-start text-palette-secondary md:text-sm"
    >
      {page_content.description}
    </motion.p>
    <div className="flex justify-end w-full px-2 mt-20 md:px-6">
      <motion.main className="relative before:content-[''] before:absolute before:right-[3vw] md:before:right-[1vw] before:-top-64 before:w-px before:h-full before:bg-palette-secondary">
        {page_content.developed_by.split("").map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{ ease: "easeIn", duration: 1}} viewport={{once: true}}
            className="relative flex items-center justify-center w-8 h-8 text-xs font-medium uppercase md:text-sm"
          >
            {letter}
          </motion.span>
        ))}
      </motion.main>
    </div>
    <motion.h1
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="z-20 flex items-end justify-end w-full px-4 mt-40 text-4xl font-bold md:px-6 text-end md:mt-0 text-palette-secondary lg:text-9xl md:text-7xl"
    >
      What is this?
    </motion.h1>

    {/* <div className="w-5 mt-8 mouse h-9" />
    <span className="mt-2 text-xs font-semibold uppercase md:text-sm">scroll down</span> */}
  </main>
);

const Page = async () => {
  const animePopular = await fetchApi("top/anime", "limit=6");
  const newSeasons = await fetchApi("seasons/now", "limit=6");
  const upcoming = await fetchApi("seasons/upcoming", "limit=6");
  let recommendationsAnime = await fetchNestedAnime("recommendations/anime", "entry")
  recommendationsAnime = reproduce(recommendationsAnime, 4)
  const indexPopular = getRandomIndex(animePopular?.data?.length)
  const indexUpcoming = getRandomIndex(upcoming?.data?.length)
  const heroBackgroundImage = animePopular?.data?.[indexPopular];
  const newBackgroundImage = newSeasons?.data?.[indexUpcoming];

  return (
    <section>
      <HeroSection
        topAnimeImage={heroBackgroundImage}
        newAnimeImage={newBackgroundImage}
      />
      <ListAnime
        api={animePopular?.data}
        setTitle="Popular Anime"
        linkHref="/popular/anime"
        addtionalText="See More..."
      />
      <ListAnime
        api={newSeasons?.data}
        setTitle="New Seasons"
        linkHref="/seasons/now"
        addtionalText="See More..."
      />
      <ListAnime
        api={upcoming?.data}
        setTitle="Upcoming"
        linkHref="/seasons/upcoming"
        addtionalText="See More..."
      />
      <ListAnime
        api={recommendationsAnime.data}
        setTitle="Recommend Anime"
        path="anime"
      />
      {/* <Suspense fallback={<SkeletonLoading />}>
        <AnimeList
          api={animePopular}
          setTitle="Popular Anime"
          linkHref="/popular/anime"
          addtionalText="See More..."
        />
      </Suspense>

      <Suspense fallback={<SkeletonLoading />}>
        <AnimeList
          api={newSeasons}
          setTitle="New Seasons"
          linkHref="/now"
          addtionalText="See More..."
        />
      </Suspense> */}
    </section>
  );
};

export default Page;
