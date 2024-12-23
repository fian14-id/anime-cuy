'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDataContext } from "@/components/utils/DataContext";

const Genres = ({ initialAnimeData, initialMangaData }) => {
  const { selectedType } = useDataContext();
  const [currentData, setCurrentData] = useState(initialAnimeData);
  
  useEffect(() => {
    setCurrentData(selectedType === 'anime' ? initialAnimeData : initialMangaData);
  }, [selectedType, initialAnimeData, initialMangaData]);

  const genreStyle = "px-4 py-2 text-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors";

  return (
    <section className="w-full h-full backdrop-blur-sm backdrop-opacity-80 grid content-center grid-cols-3 gap-2 mt-6 md:grid-cols-5 place-content-center text-sm">
      {currentData?.map((result) => (
        <Link key={result.mal_id} href={result.url} className={genreStyle}>
          <span>{result.name}</span>
        </Link>
      ))}
    </section>
  );
};

export default Genres;