'use client';

import { useState, useEffect, useCallback } from "react";
import AnimeList from "@/components/AnimeList";
import SkeletonLoading from "@/components/AnimeList/SkeletonLoading";
import Banner from "@/components/utilities/Banner";
import Pagination from "@/components/utilities/Pagination";
import { fetchPaginationNow } from "@/libs/fetch-api";

const NowPageContent = () => {
    const [state, setState] = useState({
        page: 1,
        randomIndex: 0,
        animeData: { data: [], pagination: null },
        isLoading: true,
        error: null
    });

    const getRandomIndex = useCallback((max) => {
        return Math.floor(Math.random() * max);
    }, []);

    const fetchData = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const response = await fetchPaginationNow(state.page);
            
            if (!response?.data) {
                throw new Error('No data received');
            }

            setState(prev => ({
                ...prev,
                animeData: response,
                randomIndex: getRandomIndex(response.data.length),
                isLoading: false
            }));
        } catch (error) {
            console.error('Error fetching anime data:', error);
            setState(prev => ({
                ...prev,
                error: 'Failed to load anime data. Please try again later.',
                isLoading: false
            }));
        }
    }, [state.page, getRandomIndex]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePageChange = useCallback((newPage) => {
        setState(prev => ({ ...prev, page: newPage }));
    }, []);

    // Memoize featured anime data
    const featuredAnime = state.animeData.data[state.randomIndex];
    const synopsis = featuredAnime?.synopsis?.slice(0, 100)?.concat('...') ?? '';
    const imageUrl = featuredAnime?.images?.webp?.image_url;

    if (state.error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{state.error}</p>
            </div>
        );
    }

    return (
                <section className="space-y-8">
                {featuredAnime && (
                    <Banner
                        title={featuredAnime.title}
                        subtitle={synopsis}
                        variant="image"
                        image={imageUrl}
                        className="text-palette-primary"
                    />
                )}

                {state.isLoading ? (
                    <SkeletonLoading />
                ) : (
                    <AnimeList 
                        api={state.animeData}
                        addtionalText=""
                        linkHref=""
                        setTitle={`Now Seasons #${state.page}`}
                    />
                )}

                {state.animeData.pagination && (
                    <Pagination
                        page={state.page}
                        setPage={handlePageChange}
                        paginationData={state.animeData.pagination}
                    />
                )}
            </section>
    );
};

export default NowPageContent;