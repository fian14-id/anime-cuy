// File: app/character/[id]/client-page.js
// Ini adalah client component yang menangani interaksi dan efek

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  checkImageRatioAndApplyStyle,
  formatToParagraph,
} from "@/libs/simple-function";
import {motion} from "framer-motion"
import ListAnime from "@/components/AnimeList/ListAnime";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function ClientCharacter({
  character,
  pictures,
  getRandomPicture,
}) {
  const [imageClass, setImageClass] = useState("aspect-square");
  const [isLoading, setIsLoading] = useState(true);
  const [isAbout, setIsAbout] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    
    if (pictures && pictures.length > 0) {
      checkImageRatioAndApplyStyle(pictures[getRandomPicture].jpg.image_url)
        .then((className) => {
          setImageClass(className);
          setIsLoading(false);
          if (character?.about) {
            setIsAbout(formatToParagraph(character?.about));
          }
        })
        .catch((error) => {
          console.error("Error checking image ratio: ", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [pictures, getRandomPicture, character?.about]);

  const handlePrevIndex = () => {
    console.log(currentIndex)
    setCurrentIndex((prevIndex) => prevIndex - 1)
    console.log(currentIndex)
  }
  const handleNextIndex = () => {
    console.log(currentIndex)
    if (currentIndex > pictures?.length) {
      return null
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    console.log(currentIndex)
    }
  }

  const boxCharacterStyle = "space-y-1";
  const titleCharacterStyle = "uppercase font-medium text-[1.5vw] md:text-sm";
  const contextCharacterStyle =
    "uppercase font-semibold text-[1.5vw] md:text-sm";
  return (
    <section className="w-full px-6 py-4">
      <header className="mx-3 border-b-2 md:mx-6 border-palette-secondary">
        <motion.h1
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{ease: "easeInOut", duration: 0.5}}
          className={`font-bold md:font-semibold pb-[3vw] text-center ${
            character.name.length > 8 ? "text-[10vw]" : "text-[15vw]"
          } leading-none`}
        >
          {character.name}
        </motion.h1>
      </header>
      <motion.main initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.5, ease: "easeInOut"}} className="grid w-full grid-cols-4 gap-2 p-4 place-items-center place-self-start md:p-6 md:gap-8">
        <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Favorites</h2>
          <h3 className={contextCharacterStyle}>{character?.favorites}</h3>
        </div>
        <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Origin Name</h2>
          <h3 className={contextCharacterStyle}>{character?.name_kanji}</h3>
        </div>
        <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Nickname</h2>
          <h3 className={contextCharacterStyle}>
            {character?.nicknames?.length > 0
              ? character?.nicknames[0]
              : "no nicknames"}
          </h3>
        </div>
        <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Role</h2>
          <h3 className={contextCharacterStyle}>
            {character?.anime.length > 0
              ? character?.anime?.[0].role
              : character?.manga?.[0].role}
          </h3>
        </div>
      </motion.main>
      <main
        className={`w-full flex flex-col md:flex-row justify-end gap-4 px-4 md:px-6 mt-2 md:mt-6`}
      >
        <main className="relative w-full h-full md:w-96">
        {pictures && pictures.length > 0 && (
          <Image
            width={400}
            height={400}
            loading="lazy"
            src={pictures[currentIndex-1]?.jpg?.image_url}
            alt={character.name}
            className={`relative hd-image rounded-md w-full ${imageClass === "aspect-[1/1.56] object-cover" ? "aspect-[3/4] object-cover" : imageClass} object-cover ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
        <div className="absolute top-0 z-10 flex w-full h-full">
          <div className="absolute rounded-sm top-2 right-2 md:top-1 md:right-1 bg-palette-secondary text-palette-primary backdrop-blur-sm backdrop-opacity-20">
            <span className="px-2 font-medium tracking-widest">{currentIndex}/{pictures?.length}</span>
          </div>
          <div className="absolute flex gap-2 bottom-2 right-2 md:bottom-1 md:right-1 text-palette-primary backdrop-blur-sm backdrop-opacity-20">
            {currentIndex <= 1 ? null : <button className="px-2 py-2 text-xs font-semibold rounded-md md:py-1 bg-palette-secondary" onClick={handlePrevIndex}><CaretLeft weight="bold" /></button>}
            {currentIndex >= pictures?.length ? null : <button className="px-2 py-2 text-xs font-semibold rounded-md md:py-1 bg-palette-secondary" onClick={handleNextIndex}><CaretRight weight="bold" /></button>}
          </div>
        </div>
        </main>
        <article className="w-full">
          <h2 className="relative overflow-hidden text-4xl font-black uppercase md:text-6xl">
            About Me
            <motion.div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary" initial={{ display: false, width: 500}} whileInView={{ display: true, width: 0}} transition={{ ease: "easeIn", duration: 1}} viewport={{once: true}} />
          </h2>
          {character?.about?.length > 0 ? character.about.split("\n").map((paragraph, index) => (
            <motion.p
            initial={{opacity: 0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{ease: "easeInOut", duration: 0.5, delay: 0.5}}
              key={index}
              className="text-xs opacity: 0, md:text-sm text-justify pr-2 md:pr-4 mt-2 md:mt-4"
            >
              {paragraph}
            </motion.p>
          )) : (<motion.p
            initial={{opacity: 0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{ease: "easeInOut", duration: 0.5, delay: 0.5}}
              className="text-xs opacity: 0, md:text-sm text-justify pr-2 md:pr-4 mt-2 md:mt-4"
            >
              I not have for my introducing
            </motion.p>)}
        </article>
      </main>
      <main className="px-4 mt-2 md:px-6 md:mt-6">
        <header>
        <h2 className="relative mt-4 overflow-hidden text-4xl font-black uppercase md:text-6xl md:mt-6">
            Voice Actors
            <motion.div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary" initial={{ display: false, width: 500}} whileInView={{ display: true, width: 0}} transition={{ ease: "easeIn", duration: 1}} viewport={{once: true}} />
          </h2>
        </header>
        <article className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-5 md:gap-6">
            {character?.voices?.length > 0 ? character.voices.map((voice, i) => (
                <Link key={i} className="flex flex-col" href={`/person/${voice?.person?.mal_id}`}>
                  <h3 className="text-xs font-medium uppercase md:text-sm">{voice?.person?.name}</h3>
                  <p className="text-xs md:text-sm">{voice?.language}</p>
                </Link>
            )): <p>Can't find the voice actors</p>}
        </article>
      </main>
      <main className="mt-2 md:mt-6">
        {character?.anime?.length > 0 ? <ListAnime api={character?.anime} setTitle="Anime"  /> : null}
        {character?.manga?.length > 0 ? <ListAnime api={character?.manga} setTitle="Manga"  /> : null}
      </main>
    </section>
  );
}
