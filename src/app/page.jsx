import { Suspense } from "react";
import * as motion from "framer-motion/client";
import AnimeList from "@/components/AnimeList";
import { fetchDataApi } from "@/lib/FetchApi";
import { page_content } from "@/lib/setting-app";
import SkeletonLoading from "@/components/AnimeList/SkeletonLoading";

export const revalidate = 3600;
export const dynamicParams = false;

// Metadata
export const metadata = {
  title: page_content.name_page,
  description: "Discover your favorite anime",
};

// Static data fetching
async function getData() {
  return await fetchDataApi();
}

// Hero section component
const HeroSection = ({ backgroundImage }) => (
  <motion.main className="relative flex flex-col items-center justify-center min-w-full min-h-screen text-center">
    <motion.h1
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="text-6xl font-bold text-transparent lg:text-9xl md:text-7xl bg-clip-text"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : { backgroundColor: "#F8FAFC" }}
    >
      {page_content.name_page}
    </motion.h1>
    
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="px-6 text-sm font-medium text-palette-secondary md:text-lg"
    >
      {page_content.description}
    </motion.p>
    
    <div className="w-5 mt-8 mouse h-9" />
    <span className="mt-2 text-xs font-semibold uppercase md:text-sm">scroll down</span>
  </motion.main>
);

const Page = async () => {
  const { animePopular, newSeasons } = await getData();
  const heroBackgroundImage = animePopular?.data?.[0]?.images?.webp?.image_url;

  return (
    <section className="w-full h-full">
      <HeroSection backgroundImage={heroBackgroundImage} />
      
      <Suspense fallback={<SkeletonLoading />}>
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
      </Suspense>
    </section>
  );
};

export default Page;