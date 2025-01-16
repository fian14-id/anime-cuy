'use client';
import Link from "next/link";
import Image from "next/image";
import { ArrowUUpLeft } from "@phosphor-icons/react";
import * as motion from 'framer-motion/client'
import { useEffect, useState } from "react";
import { page_content } from "@/lib/setting-app";

export default function NotFound() {
  const [pageContent, setPageContent] = useState([]);
  useEffect(() => {
    localStorage.setItem("savedContent", JSON.stringify(page_content));
    const savedPageContent = localStorage.getItem("savedContent");
    if (savedPageContent) setPageContent(JSON.parse(savedPageContent));
  }, [])
  return(
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeIn", duration: 0.5 }} className="flex flex-col items-center justify-center min-h-screen">
      <Image src={pageContent?.assets?.status_code_img?.not_found} alt="404" width={0} height={0} className="w-64 md:w-96" />
      <Link
        href="/"
      >
        <button className="flex items-center justify-center h-full gap-2 px-0 py-2 text-xl font-medium transition-all duration-300 ease-in-out border-b-2 text-palette-secondary border-palette-secondary hover:px-8"><ArrowUUpLeft size={16} weight="bold" className="text-palette-secondary" />{" "}Return Home</button>
      </Link>
    </motion.main>
  );
}
