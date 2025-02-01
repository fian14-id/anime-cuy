"use client";

import AnimeList from "@/components/AnimeList";
import SkeletonLoading from "@/components/AnimeList/SkeletonLoading";
import Banner from "@/components/utilities/Banner";
import Pagination from "@/components/utilities/Pagination";
import { fetchPaginationNow } from "@/lib/FetchApi";
import { useState, useEffect, useCallback } from "react";

const Page = () => {
    const [page, setPage] = useState(1);
    const [randomPage, setRandomPage] = useState(1);
    const [now, setNow] = useState({data: [], pagination: null});
    const [isLoading, setIsLoading] = useState(true);

    const getRandomIntInclusive = useCallback((min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
      }, []);

    const fetchDatanow = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetchPaginationNow(page);
            setNow(response);

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
          fetchDatanow();
    }, [fetchDatanow]);

    const getSynopsis = now?.data?.[randomPage]?.synopsis.length > 100 && now?.data?.[randomPage]?.synopsis.slice(0, 100)
    const getImageRandom = now?.data?.[randomPage]?.images?.webp?.image_url
    return (
        <section>
            {now?.data?.[randomPage] && <Banner title={now?.data?.[randomPage]?.title} subtitle={getSynopsis} variant="image" image={getImageRandom}  />}
            {isLoading ? (
                <SkeletonLoading />
            ) : (
                <AnimeList 
                    api={now} 
                    addtionalText="" 
                    linkHref="" 
                    setTitle={`Now Seasons #${page}`} 
                />
            )}
             {now.pagination && (
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    paginationData={now.pagination}
                                />)}
        </section>
    );
};

export default Page;