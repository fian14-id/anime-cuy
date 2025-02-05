"use client";

import AnimeList from "@/components/AnimeList";
import SkeletonLoading from "@/components/AnimeList/SkeletonLoading";
import Banner from "@/components/utilities/Banner";
import Pagination from "@/components/utilities/Pagination";
import { fetchPaginationAnimePopular } from "@/libs/fetch-api";
import { useState, useEffect, useCallback } from "react";

const Page = () => {
    const [page, setPage] = useState(1);
    const [randomPage, setRandomPage] = useState(1);
    const [popular, setPopular] = useState({data: [], pagination: null});
    const [isLoading, setIsLoading] = useState(true);

    const getRandomIntInclusive = useCallback((min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
      }, []);

    const fetchDataPopular = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetchPaginationAnimePopular(page);
            setPopular(response);

            if (response?.data?.length) {
                const newRandomPage = getRandomIntInclusive(0, response.data.length - 1)
                setRandomPage(newRandomPage)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, getRandomIntInclusive]);

      useEffect(() => {
          fetchDataPopular();
    }, [fetchDataPopular]);

    const getSynopsis = (() => {
        const synopsis = popular?.data?.[randomPage]?.synopsis;
        if (!synopsis) return "";
        return synopsis.length > 100 ? `${synopsis.slice(0, 100)}...` : synopsis;
    })();
    const getImageRandom = popular?.data?.[randomPage]?.images?.webp?.image_url
    return (
        <section>
            {popular?.data?.[randomPage] && <Banner title={popular?.data?.[randomPage]?.title} subtitle={getSynopsis} variant="image" image={getImageRandom}  />}
            {isLoading ? (
                <SkeletonLoading />
            ) : (
                <AnimeList 
                    api={popular} 
                    addtionalText="" 
                    linkHref="" 
                    setTitle={`Popular Anime #${page}`} 
                />
            )}
             {popular.pagination && (
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    paginationData={popular.pagination}
                                />)}
        </section>
    );
};

export default Page;