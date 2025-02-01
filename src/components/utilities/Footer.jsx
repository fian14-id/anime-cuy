"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { page_content } from "@/lib/setting-app";
import Link from "next/link";

const Footer = () => {
  const [pageContent, setPageContent] = useState([]);
  useEffect(() => {
    localStorage.setItem("savedContent", JSON.stringify(page_content));
    const savedPageContent = localStorage.getItem("savedContent");
    if (savedPageContent) setPageContent(JSON.parse(savedPageContent));
  }, []);
  return (
    <footer className="flex flex-col items-center justify-center w-full gap-4 px-4 py-4 mt-8 md:justify-between md:flex-row md:px-6 md:py-4 ">
      <span className="text-lg font-bold text-palette-secondary md:text-xl lg:text-2xl">
        {pageContent?.logo_app ? (
          <div className="flex items-center gap-2">
            <Image
              className="py-2 "
              src={pageContent.logo_app}
              width={50}
              height={50}
              alt={pageContent.name_page}
            />{" "}
            <span className="font-semibold text-transparent bg-none bg-clip-text bg-palette-secondary">
              {pageContent.name_page}
            </span>
          </div>
        ) : (
          pageContent.name_page
        )}
      </span>
      <ul className="flex items-center justify-center gap-4">
        {pageContent?.social_media ? (
          pageContent?.social_media?.map((media, i) => {
            return (
              <li key={i}>
                <Link href={media.link} target="_blank" className="flex items-center justify-center gap-2">
                  <Image
                    className="invert brightness-200"
                    src={media.icon}
                    width={20}
                    height={20}
                  />
                  <h1 className="text-xs font-semibold md:text-sm">{media.name}</h1>
                </Link>
              </li>
            );
          })
        ) : (
          <li>Made with ❤ by Fianity</li>
        )}
      </ul>
    </footer>
  );
};

export default Footer;
