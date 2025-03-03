"use client";
import YouTube from "react-youtube";
import Modal from "./Modal";
import { ArrowSquareOut } from "@phosphor-icons/react";
import Link from "next/link";

const VideoPlayer = ({youtubeId, state, close, stream}) => {
    const option = {
        width: "100%",
        height: "100%",
        playerVars: {
          controls: 0,      // Sembunyikan tombol kontrol
          modestbranding: 0, // Sembunyikan logo YouTube
          rel: 0,           // Hanya tampilkan video terkait dari channel yang sama
        },
    }
  return (
    <Modal isOpen={state} onClose={close}>
        <main className="relative flex items-center justify-center w-full px-2 mt-5 md:mt-10 aspect-[16/8.8]">
        <YouTube opts={option} loading="lazy" className="w-full h-full rounded-md" videoId={youtubeId} onReady={(event) => event.target.pauseVideo()} />
        </main>
        {stream.length > 0 ? <section className="mt-2 md:mt-6">
          <h2 className="text-lg font-semibold text-center uppercase md:text-2xl text-palette-accent">Platform Streaming</h2>
          <ul className="grid grid-cols-2 gap-2 mt-2 text-center md:mt-4 md:gap-4 md:grid-cols-3 place-items-center place-justify-center">
            {stream?.map((streaming, i) => (
              <Link key={i} target="_blank" className="flex duration-300 ease-in-out text-palette-primary hover:text-palette-accent" href={streaming.url}>
                <li className="flex items-center gap-2 my-2 font-medium md:gap-4">{streaming.name}<ArrowSquareOut weight="bold" /></li>
              </Link>
            ))}
          </ul>
        </section> : null}
    </Modal>
  )
}

export default VideoPlayer