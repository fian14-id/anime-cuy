// DetailContent.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/user-interface/Button";
const { fetchCharactersAnime } = require("@/libs/fetch-api");
import { toCapitalize } from "@/libs/simple-function";
import VideoPlayer from "@/components/utilities/VideoPlayer";

const DetailContentAnime = ({ animeData }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [characters, setCharacters] = useState([]);
  const [imageChar, setImageChar] = useState("char");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activeTab === "characters" && characters.length === 0) {
      const fetchCharacters = async () => {
        setIsLoading(true);
        try {
          const response = await fetchCharactersAnime(animeData.mal_id);
          setCharacters(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCharacters();
    }
  }, [activeTab, animeData.mal_id, characters.length]);

  const handleTrailer = () => {
    setIsOpen((prev) => !prev)
    console.log(isOpen)
  }
  

  const renderCharacterCard = ({
    character,
    role,
    voice_actors,
    favorites,
  }) => (
    <div
      key={character.mal_id}
      className="flex flex-col p-4 transition-all rounded-lg bg-white/5 hover:bg-white/10"
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0 w-20 h-20">
          <Image
            src={
              imageChar === "char" && !voice_actors[0] ?
              character.images.jpg.image_url
                : imageChar === "char" && voice_actors[0]
                ? character.images.jpg.image_url
                : voice_actors[0]?.person?.images?.jpg?.image_url
            }
            alt={character.name}
            fill
            className="object-cover rounded-md"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center">
          <Link href={`/character/${character.mal_id}`}>
            <h3 className="text-lg font-medium transition-colors duration-100 hover:text-palette-accent">
              {character.name}&nbsp;<sup>{favorites > 1000 ? "💖" : ""}</sup>
            </h3>
          </Link>
          <p className="text-sm text-palette-secondary/80">{role}</p>
          {voice_actors[0] && (
            <Link
              href={`/person/${voice_actors[0]?.person?.mal_id}`}
              onMouseOver={() => setImageChar("person")}
              onMouseOut={() => setImageChar("char")}
            >
              <p className="mt-1 text-sm transition-colors duration-100 hover:text-palette-accent text-palette-secondary/60">
                VA: {voice_actors[0].person.name} ({voice_actors[0].language})
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const renderDetails = () => (
    <article className="px-2 h-[calc(100vh-20rem)] overflow-y-auto">
      <h1 className="text-2xl font-semibold">{animeData.title}</h1>
      {animeData.genres && (
        <h2 className="text-sm text-palette-secondary/80">
          {animeData.genres.map((genre, i) => (
            <span key={genre.mal_id}>
              {genre.name}
              {i < animeData.genres.length - 1 && ", "}
            </span>
          ))}
        </h2>
      )}
      <main className="mt-4">
        <p className="text-sm leading-relaxed text-justify">{animeData?.synopsis}</p>
        <table className="mt-4 space-y-2" aria-hidden="true">
          <tbody>
            {animeData?.rank !== null ? (
              <tr>
                <td>Rank&nbsp;</td>
                <td>: {animeData.rank}</td>
              </tr>
            ) : null}
            {animeData?.score !== null ? (
              <tr>
                <td>Score&nbsp;</td>
                <td>: {animeData.score}</td>
              </tr>
            ) : null}
            {animeData?.episodes !== null ? (
              <tr>
                <td>Episodes&nbsp;</td>
                <td>: {animeData.episodes}</td>
              </tr>
            ) : null}
            {animeData?.status !== null ? (
              <tr>
                <td>Status&nbsp;</td>
                <td>: {animeData.status}</td>
              </tr>
            ) : null}
            {animeData?.rating !== null ? (
              <tr>
                <td>Rating&nbsp;</td>
                <td>: {animeData.rating}</td>
              </tr>
            ) : null}
            {animeData?.season !== null ? (
              <tr>
                <td>Season&nbsp;</td>
                <td>: {toCapitalize(animeData?.season)}</td>
              </tr>
            ) : null}
            {animeData?.year !== null ? (
              <tr>
                <td>Year&nbsp;</td>
                <td>
                  : <time dateTime="yyyy">{animeData.year}</time>
                </td>
              </tr>
            ) : null}
            {animeData?.studios?.length > 0 ? (
              <tr>
                <td>Studio&nbsp;</td>
                <td>
                  :{" "}
                  {animeData.studios.map((studio, i) => {
                    return (
                      <Link
                        key={i}
                        href={studio.url}
                        className="mx-1 hover:text-palette-accent"
                      >
                        {studio.name}
                        {i < animeData.studios.length - 1 && ", "}
                      </Link>
                    );
                  })}
                </td>
              </tr>
            ) : null}
            
          </tbody>
        </table>
        {animeData?.trailer?.youtube_id ? <Button onClick={handleTrailer}>Trailer</Button> : ""}
        <VideoPlayer youtubeId={animeData?.trailer?.youtube_id} state={isOpen} close={handleTrailer} stream={animeData?.streaming} />
      </main>
    </article>
  );

  const renderCharacters = () => {
    if (isLoading) {
      return (
        <div className="px-2 py-4 h-[calc(100vh-20rem)] flex items-center justify-center">
          Loading characters...
        </div>
      );
    }

    if (error) {
      return (
        <div className="px-2 py-4 h-[calc(100vh-20rem)] flex items-center justify-center text-red-400">
          {error}
        </div>
      );
    }

    if (!characters.length) {
      return (
        <div className="px-2 py-4 h-[calc(100vh-20rem)] flex items-center justify-center">
          No character information available.
        </div>
      );
    }

    return (
      <section className="px-2">
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-20rem)] overflow-y-auto pr-2">
          {[...characters]
            .sort((a, b) => b.favorites - a.favorites)
            .map(renderCharacterCard)}
        </article>
      </section>
    );
  };

  return (
    <>
      <nav className="flex justify-center w-full pb-4">
        <div className="w-full">
          <div className="sr-only">
            <input
              type="radio"
              id="details"
              name="tab"
              checked={activeTab === "details"}
              onChange={() => setActiveTab("details")}
            />
            <input
              type="radio"
              id="characters"
              name="tab"
              checked={activeTab === "characters"}
              onChange={() => setActiveTab("characters")}
            />
          </div>
          <ul className="flex gap-6 font-medium">
            <li
              className={`cursor-pointer border-b-2 transition-all duration-200 ${
                activeTab === "details"
                  ? "border-b-palette-accent"
                  : "border-b-transparent opacity-75"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </li>
            <li
              className={`cursor-pointer border-b-2 transition-all duration-200 ${
                activeTab === "characters"
                  ? "border-b-palette-accent"
                  : "border-b-transparent opacity-75"
              }`}
              onClick={() => setActiveTab("characters")}
            >
              Characters
            </li>
          </ul>
        </div>
      </nav>

      <div className="mt-4">
        {activeTab === "details" && renderDetails()}
        {activeTab === "characters" && renderCharacters()}
      </div>
    </>
  );
};

export default DetailContentAnime;
