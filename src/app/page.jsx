import * as motion from "framer-motion/client";
import AnimeList from "@/components/AnimeList";
import { fetchDataApi } from "@/lib/FetchApi";
import { page_content } from "@/lib/setting-app";
import { Suspense } from 'react';

// Page configuration
export const revalidate = 3600;
export const dynamicParams = true;

// Animation variants
const fadeInScale = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { ease: "easeInOut", duration: 0.5 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { ease: "easeInOut", duration: 0.5 }
};

// Data fetching with error handling
async function getData() {
  try {
    const data = await fetchDataApi();
    
    if (!data) {
      throw new Error('Failed to fetch data');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      animePopular: { data: [] },
      newSeasons: { data: [] }
    };
  }
}

// Loading components
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <p>Loading anime...</p>
  </div>
);

// Hero section component
const HeroSection = ({ backgroundImage }) => (
  <main className="relative flex flex-col items-center justify-center min-w-full min-h-screen text-center">
    <motion.h1
      {...fadeInScale}
      className="text-6xl font-bold text-transparent lg:text-9xl md:text-7xl bg-clip-text"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : { backgroundColor: "#F8FAFC" }
      }
    >
      {page_content.name_page}
    </motion.h1>
    
    <br />
    
    <motion.p
      {...fadeIn}
      className="px-6 text-sm font-medium text-palette-secondary md:text-lg"
    >
      {page_content.description}
    </motion.p>
    
    <div className="w-5 mt-8 mouse h-9" />
    <span className="mt-2 text-xs font-semibold uppercase md:text-sm">
      scroll down
    </span>
  </main>
);

const Page = async () => {
  const { animePopular, newSeasons } = await getData();
  
  const heroBackgroundImage = 
    animePopular?.data?.[0]?.images?.webp?.image_url || '';

  return (
    <section className="w-full h-full">
      <HeroSection backgroundImage={heroBackgroundImage} />
      
      <Suspense fallback={<LoadingState />}>
        <AnimeList
          api={animePopular}
          setTitle="Popular Anime"
          linkHref="/popular"
          addtionalText="See More..."
        />
      </Suspense>
      
      <Suspense fallback={<LoadingState />}>
        <AnimeList
          api={newSeasons}
          setTitle="New Anime"
          linkHref="/ongoing"
          addtionalText="See More..."
        />
      </Suspense>
    </section>
  );
};

export default Page;