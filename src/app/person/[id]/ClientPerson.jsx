// File: app/character/[id]/client-page.js
// Ini adalah client component yang menangani interaksi dan efek

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ExperienceList from "./ExperienceList";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Time from "@/components/utilities/Time";

export default function ClientCharacter({ person, pictures }) {
  const [imageClass, setImageClass] = useState("aspect-square");
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   if (pictures && pictures.length > 0) {
  //     checkImageRatioAndApplyStyle(pictures[currentIndex]?.jpg?.image_url)
  //       .then((className) => {
  //         setImageClass(className);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error checking image ratio: ", error);
  //         setIsLoading(false);
  //       });
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [pictures, currentIndex]);

  const handlePrevIndex = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    console.log(currentIndex);
  };
  const handleNextIndex = () => {
    console.log(currentIndex);
    if (currentIndex > pictures?.length) {
      return null;
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      console.log(currentIndex);
    }
  };

  const boxCharacterStyle = "space-y-1";
  const titleCharacterStyle = "uppercase font-medium text-[1.5vw] md:text-sm";
  const contextCharacterStyle =
    "uppercase font-semibold text-[1.5vw] md:text-sm";
  return (
    <section className="w-full px-6 py-4">
      <header className="mx-3 border-b-2 md:mx-6 border-palette-secondary">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className={`font-bold md:font-semibold pb-[3vw] text-center ${
            person?.name?.length > 8 ? "text-[10vw]" : "text-[15vw]"
          } leading-none`}
        >
          {person?.name}
        </motion.h1>
      </header>
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="grid w-full grid-cols-4 gap-2 p-4 place-items-center place-self-start md:p-6 md:gap-8"
      >
        {person?.favorites ? <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Favorites</h2>
          <h3 className={contextCharacterStyle}>{person?.favorites}</h3>
        </div> : null}
        {!person?.given_name || !person?.alternate_names ? null : <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Origin Name</h2>
          <h3 className={contextCharacterStyle}>
            {person?.given_name && person?.family_name
              ? person?.family_name + person?.given_name
              : person?.alternate_names[0]}
          </h3>
        </div>}
        {person?.anime?.length > 0 || person?.voices?.length > 0 ? <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle} title="total voice actor roles">
            Many VA
          </h2>
          <h3 className={contextCharacterStyle}>
            {person?.voices?.length > 0
              ? person?.voices?.length
              : person?.anime?.length}
          </h3>
        </div> : null}
        <div className={boxCharacterStyle}>
          <h2 className={titleCharacterStyle}>Birthday</h2>
          <h3 className={contextCharacterStyle}>
            {person?.birthday ? <Time date={person?.birthday} /> : "I can't tell"}
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
              src={pictures[currentIndex - 1]?.jpg?.image_url}
              alt={person.name}
              className={`relative hd-image rounded-md w-full aspect-[3/4] object-cover 
            }`}
            />
          )}
          <div className="absolute top-0 z-10 flex w-full h-full">
            <div className="absolute rounded-sm top-2 right-2 md:top-1 md:right-1 bg-palette-secondary text-palette-primary backdrop-blur-sm backdrop-opacity-20">
              <span className="px-2 font-medium tracking-widest">
                {currentIndex}/{pictures?.length}
              </span>
            </div>
            <div className="absolute flex gap-2 bottom-2 right-2 md:bottom-1 md:right-1 text-palette-primary backdrop-blur-sm backdrop-opacity-20">
              {currentIndex <= 1 ? null : (
                <button
                  className="px-2 py-2 text-xs font-semibold rounded-md md:py-1 bg-palette-secondary"
                  onClick={handlePrevIndex}
                >
                  <CaretLeft weight="bold" />
                </button>
              )}
              {currentIndex >= pictures?.length ? null : (
                <button
                  className="px-2 py-2 text-xs font-semibold rounded-md md:py-1 bg-palette-secondary"
                  onClick={handleNextIndex}
                >
                  <CaretRight weight="bold" />
                </button>
              )}
            </div>
          </div>
        </main>
        <article className="w-full">
          <h2 className="relative overflow-hidden text-4xl font-black uppercase md:text-6xl">
            About Me
            <motion.div
              className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary"
              initial={{ display: false, width: 500 }}
              whileInView={{ display: true, width: 0 }}
              transition={{ ease: "easeIn", duration: 1 }}
              viewport={{ once: true }}
            />
          </h2>
          {person?.about?.length > 0 ? (
            person.about.split("\n").map((paragraph, index) => (
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
                key={index}
                className="text-xs opacity: 0, md:text-sm text-justify pr-2 md:pr-4 mt-2 md:mt-4"
              >
                {paragraph}
              </motion.p>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
              className="text-xs opacity: 0, md:text-sm text-justify pr-2 md:pr-4 mt-2 md:mt-4"
            >
              I not have for my introducing
            </motion.p>
          )}
        </article>
      </main>
      <main className="px-4 mt-2 md:px-6 md:mt-6">
        <header className="relative flex justify-between">
          <h2 className="relative mt-4 overflow-hidden text-4xl font-black uppercase md:text-6xl md:mt-6">
            Staff Position
            <motion.div
              className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary"
              initial={{ display: false, width: 500 }}
              whileInView={{ display: true, width: 0 }}
              transition={{ ease: "easeIn", duration: 1 }}
              viewport={{ once: true }}
            />
          </h2>
          <button
            className="relative flex flex-col items-center justify-center w-10 h-10 mt-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Garis pertama (atas) */}
            <motion.span
              className="absolute w-10/12 h-1 rounded bg-palette-accent"
              animate={{ rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Garis ketiga (bawah) */}
            <motion.span
              className="absolute w-8/12 h-1 rounded bg-palette-accent"
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </button>
        </header>
          <AnimatePresence mode="wait">
        {isOpen ? <article className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 md:gap-6">
          {person?.anime?.length > 0 ? (
            person.anime.map((staff, i) => (
              <motion.main initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity: 1}} exit={{y: 50, opacity: 0}} transition={{ease: "easeInOut", duration: 0.5}} key={i}>
                <Link
                className="flex flex-col"
                href={`/anime/${staff?.anime?.mal_id}`}
              >
                <h3 className="text-xs font-medium uppercase md:text-sm">
                  {staff?.position}
                </h3>
                <p className="text-xs md:text-sm">{staff?.anime?.title}</p>
              </Link>
              </motion.main>
            ))
          ) : (
            <p>Can't find the voice actors</p>
          )}
        </article> : null}
          </AnimatePresence>
      </main>
        {person?.voices?.length > 0 ? <ExperienceList api={person?.voices} setTitle="VA Role"  /> : null}
    </section>
  );
}
