"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ExperienceList = ({ api, addtionalText, linkHref, setTitle }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Set isMounted to true when component mounts on client
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

  return (
    <section className="relative flex flex-col gap-4 px-2 mt-8 overflow-x-hidden md:px-6">
      <header className="relative py-2 overflow-x-hidden border-b-2 border-palette-secondary">
        <h1
          className="relative text-4xl font-black uppercase md:text-6xl"
        >
            <motion.div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-palette-secondary" initial={{ display: false, width: 500}} whileInView={{ display: true, width: 0}} transition={{ ease: "easeIn", duration: 1}} viewport={{once: true}} />
          {setTitle}
        </h1>
      </header>
      <AnimatePresence>
        {api?.length > 0 ? (
          api.map((result, i) => (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              transition={{ ease: "easeInOut", delay: 0.5, duration: 0.8 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{once:true}}
              key={i}
              className="relative overflow-x-hidden"
            >
              <Link
                href={`/anime/${result?.anime?.mal_id}`}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="flex justify-between w-full px-4 py-4 duration-300 ease-in-out border-b-2 opacity-75 md:px-6 border-palette-secondary contrast-50 hover:opacity-100 hover:contrast-100"
              >
                <h2 className="w-1/2 text-lg font-semibold md:text-3xl">
                  {result?.anime?.title?.length > 0
                    ? `${result.anime?.title.slice(0, 25)}...`
                    : result.anime?.title}
                </h2>
                <span className="flex items-center justify-center w-1/12 text-xs text-center md:text-sm">{result?.role ? result.role : null}</span>
                <p className="flex items-center justify-end w-1/2 gap-2 text-xs font-medium uppercase md:gap-4 text-end sm:text-sm md:text-lg">
                  <Image width={500} height={500} className="object-cover w-10 rounded-md aspect-square" src={result?.character?.images?.jpg?.image_url} alt={result?.character?.name} />
                  <span>{result?.character?.name.length > 25 ? `${result?.character?.name.slice(0, 25)}...` : result?.character?.name}</span>
                </p>
              </Link>
              {isMounted && isHovered === i && createPortal(
                <motion.div
                initial={{opacity: 0}} 
                whileInView={{opacity: 1}}
                exit={{opacity: 0}} 
                transition={{duration: 0.5, ease: "easeInOut"}} 
                  className="fixed pointer-events-none"  
                  style={{
                    left: `${mousePosition.x + 20}px`, 
                    top: `${mousePosition.y - 75}px`, 
                    transform: 'translate(0, -50%)', 
                    zIndex: 50
                  }}
                >
                  <Image 
                    src={result?.anime?.images?.jpg?.large_image_url ? result?.anime?.images?.jpg?.large_image_url : null} 
                    alt={result?.anime?.title} 
                    width={400} 
                    height={600} 
                    className="object-cover w-40 rounded-md shadow-lg" 
                  />
                </motion.div>,
                document.body
              )}
            </motion.div>
          ))
        ) : (
          <h2 className="font-semibold text-center uppercase opacity-50">Empty</h2>
        )}
      </AnimatePresence>
      {addtionalText && (
        <Link
          href={linkHref}
          className="text-sm font-semibold text-center underline uppercase text-palette-accent hover:opacity-75"
        >
          {addtionalText}
        </Link>
      )}
    </section>
  );
};

export default ExperienceList;