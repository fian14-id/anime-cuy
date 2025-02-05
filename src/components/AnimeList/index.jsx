"use client";

import PropTypes from "prop-types";
import Link from "next/link";
import HeaderList from "./Header";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import SkeletonLoading from "./SkeletonLoading";

const STORAGE_KEY = "savedDataApi";

const AnimeCard = ({ result }) => (
  <Link href={`/${result?.genres?.[0]?.type}/${result.mal_id}`}>
    <article className="relative overflow-hidden rounded-lg group">
      <Image
        src={result.images.jpg.large_image_url}
        alt={result.title}
        width={900}
        height={1600}
        className="w-full aspect-[9/16] transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-palette-primary to-transparent">
        <h3 className="font-semibold text-palette-secondary">
          {result.title.length > 25 ? `${result.title.slice(0, 25)}...` : result.title}
        </h3>
        {result.genres && (
          <p className="text-xs md:text-sm text-palette-secondary/80">
            {result.genres.map((genre, i) => (
              <span key={genre.mal_id}>
                {genre.name}{i < result.genres.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  </Link>
);

const AnimeList = ({ api, setTitle, linkHref, addtionalText }) => {
  const [animeData, setAnimeData] = useState(api || { data: [] });
  const [isLoading, setIsLoading] = useState(true);

  const saveToLocalStorage = useCallback((data) => {
    try {
      if (data?.data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, []);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData?.data) {
          setAnimeData(parsedData);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (api) {
        setAnimeData(api);
        saveToLocalStorage(api);
      } else {
        loadFromLocalStorage();
      }
      setIsLoading(false);
    };

    loadData();
  }, [api, saveToLocalStorage, loadFromLocalStorage]);

  if (isLoading) return <SkeletonLoading />;

  return (
    <>
      <HeaderList
        getTitle={setTitle}
        getLink={linkHref}
        getAddText={addtionalText}
      />
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {animeData?.data?.length > 0 ? (
          animeData.data.map((result) => (
            <AnimeCard key={result.mal_id} result={result} />
          ))
        ) : (
          <div className="py-8 text-center col-span-full">
            <p className="text-lg font-semibold">No anime found.</p>
            <p className="text-sm font-medium">Suggestion: Try refreshing the page.</p>
          </div>
        )}
      </div>
    </>
  );
};

AnimeList.propTypes = {
  api: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        mal_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        demographics: PropTypes.string.isRequired,
        images: PropTypes.shape({
          jpg: PropTypes.shape({
            large_image_url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        genres: PropTypes.arrayOf(
          PropTypes.shape({
            mal_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
      }).isRequired
    ).isRequired,
  }).isRequired,
  setTitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
  addtionalText: PropTypes.string,
};

export default AnimeList;