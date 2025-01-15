"use client";
import PropTypes from "prop-types";
import Link from "next/link";
import HeaderList from "./Header";
import Image from "next/image";
import { useEffect, useState } from "react";

const AnimeList = ({ api, setTitle, linkHref, addtionalText }) => {
  const [isApi, setIsApi] = useState({ data: [] })
  useEffect(() => {
    localStorage.setItem("savedDataApi", JSON.stringify(api));
    const savedApi = localStorage.getItem("savedDataApi");
    if (savedApi) setIsApi(JSON.parse(savedApi));
  }, [])
  return (
    <>
      <HeaderList
        getTitle={setTitle}
        getLink={linkHref}
        getAddText={addtionalText}
      />
      <section className="grid gap-8 p-4 w-full md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isApi?.data?.length > 0 ? (
          isApi.data.map((result) => {
            return (
              <Link href={`/${result.mal_id}`} key={result.mal_id}>
                <main className="w-full h-72 sm:h-full relative overflow-hidden text-center aspect-[9/16] duration-500 ease-in-out bg-center bg-cover rounded-sm  hover:shadow-2xl hover:bg-top hover:z-10 hover:scale-105 flex items-end justify-center text-palette-secondary">
                  <Image
                    src={result.images.webp.image_url}
                    alt={result.title}
                    width={900}
                    height={1600}
                    className="w-full aspect-[9/16] z-10 absolute bottom-0 left-0"
                    loading="lazy"
                  />
                  <div className="absolute z-20 bottom-0 w-full h-auto pt-2 bg-gradient-to-t from-palette-dark to-transparent">
                    <h3 className="px-4 py-2 font-black uppercase text-xs sm:text-md md:text-xl">
                      {result.title.length > 25 ? `${result.title.slice(0, 25)}...` : result.title}
                    </h3>
                    <p className="pb-2 text-sm font-bold text-palette-grey-600">
                      {result.score}
                    </p>
                  </div>
                </main>
              </Link>
            );
          })
        ) : (
          <h1>Can't be found :(</h1>
        )}
      </section>
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
        images: PropTypes.shape({
          webp: PropTypes.shape({
            image_url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  setTitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
};

export default AnimeList;
