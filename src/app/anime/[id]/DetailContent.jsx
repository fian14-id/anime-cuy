// DetailContent.js
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TransitionsLink from '@/components/utilities/TransitionsLink';
const { fetchCharactersAnime } = require("@/libs/fetch-api");

const DetailContentAnime = ({ animeData }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [characters, setCharacters] = useState([]);
  const [imageChar, setImageChar] = useState('char');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'characters' && characters.length === 0) {
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

  const renderCharacterCard = ({ character, role, voice_actors }) => (
    <div key={character.mal_id} className="flex flex-col p-4 transition-all rounded-lg bg-white/5 hover:bg-white/10">
      <div className="flex gap-4">
        <div className="relative flex-shrink-0 w-20 h-20">
          <Image
            src={imageChar === 'char' && voice_actors[0] ? character.images.jpg.image_url : voice_actors[0]?.person?.images?.jpg?.image_url}
            alt={character.name}
            fill
            className="object-cover rounded-md"
            loading='lazy'
          />
        </div>
        <div className="flex flex-col justify-center">
          <TransitionsLink href={`/character/${character.mal_id}`}>
            <h3 className="text-lg font-medium transition-colors duration-100 hover:text-palette-accent">{character.name}</h3>
          </TransitionsLink>
          <p className="text-sm text-palette-secondary/80">{role}</p>
          {voice_actors[0] && (
            <TransitionsLink href={`/person/${voice_actors[0]?.person?.mal_id}`} onMouseOver={() => setImageChar('person')} onMouseOut={() => setImageChar('char')}>
                <p className="mt-1 text-sm transition-colors duration-100 hover:text-palette-accent text-palette-secondary/60">
                VA: {voice_actors[0].person.name} ({voice_actors[0].language})
                </p>
            </TransitionsLink>
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
        <p className="text-sm leading-relaxed">{animeData.synopsis}</p>
        <table className="mt-4 space-y-2" aria-hidden="true">
          <tbody>
          <tr>
            <td>Rank&nbsp;</td>
            <td>: {animeData.rank}</td>
          </tr>
          <tr>
            <td>Score&nbsp;</td>
            <td>: {animeData.score}</td>
          </tr>
          {animeData.episodes && <tr>
            <td>Episodes&nbsp;</td>
            <td>: {animeData.episodes}</td>
          </tr>}
          <tr>
            <td>Status&nbsp;</td>
            <td>: {animeData.status}</td>
          </tr>
          <tr>
            <td>Rating&nbsp;</td>
            <td>: {animeData.rating}</td>
          </tr>
          </tbody>
        </table>
        <button className="px-6 py-2 mt-4 transition-all duration-300 ease-in-out shadow-md rounded-xl hover:rounded-none bg-palette-accent w-fit text-palette-primary">Trailer</button>
      </main>
    </article>
  );

  const renderCharacters = () => {
    if (isLoading) {
      return <div className="px-2 py-4 h-[calc(100vh-20rem)] flex items-center justify-center">Loading characters...</div>;
    }

    if (error) {
      return <div className="px-2 py-4 h-[calc(100vh-20rem)] flex items-center justify-center text-red-400">{error}</div>;
    }

    if (!characters.length) {
      return <div className="px-2 py-4 h-[calc(100vh-20rem)] flex items-center justify-center">No character information available.</div>;
    }

    return (
      <div className="px-2">
        <div className="grid gap-4 h-[calc(100vh-20rem)] overflow-y-auto pr-2">
          {characters.map(renderCharacterCard)}
        </div>
      </div>
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
              checked={activeTab === 'details'}
              onChange={() => setActiveTab('details')}
            />
            <input
              type="radio"
              id="characters"
              name="tab"
              checked={activeTab === 'characters'}
              onChange={() => setActiveTab('characters')}
            />
          </div>
          <ul className="flex gap-6 font-medium">
            <li
              className={`cursor-pointer border-b-2 transition-all duration-200 ${
                activeTab === 'details'
                  ? 'border-b-palette-accent'
                  : 'border-b-transparent opacity-75'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </li>
            <li
              className={`cursor-pointer border-b-2 transition-all duration-200 ${
                activeTab === 'characters'
                  ? 'border-b-palette-accent'
                  : 'border-b-transparent opacity-75'
              }`}
              onClick={() => setActiveTab('characters')}
            >
              Characters
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="mt-4">
        {activeTab === 'details' && renderDetails()}
        {activeTab === 'characters' && renderCharacters()}
      </div>
    </>
  );
};

export default DetailContentAnime;