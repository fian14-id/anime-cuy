"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { page_content } from "@/config/setting-app";

const Navbar = () => {
  // const dataSearch = await searchAnime()

  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  // console.log(searchList)
  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="relative flex items-center justify-between w-full px-4 py-2 md:px-8 md:py-6"
    >
      <Link href="/">
        <span className="text-lg font-bold md:text-xl lg:text-2xl">
          {page_content?.logo_app ? (
            <Image
              src={page_content.logo_app}
              width={100}
              height={100}
              alt={page_content.name_page}
            />
          ) : (
            page_content.name_page
          )}
        </span>
      </Link>
      <main>
        {/* Hamburger button with animation */}
        <div className="md:hidden" onClick={toggleMenu} role="button">
          <motion.div
            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-4 h-0.5 bg-[#242424] dark:bg-white my-1"
          />
          <motion.div
            animate={isOpen ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="w-6 h-0.5 bg-[#242424] dark:bg-white my-1"
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-4 h-0.5 bg-[#242424] dark:bg-white my-1"
          />
        </div>
        {/* for large menu */}
        <ul className="hidden gap-2 text-sm md:flex md:gap-6 md:text-lg justify-evenly">
          <li className="px-2 py-2 mt-1 md:px-6 md:py-2">
            <Link href="/search">
              <MagnifyingGlass size={22} weight="bold" />
            </Link>
          </li>
          <Link href="/login">
            <li className="px-4 py-2 font-semibold underline md:px-6 md:py-2 dark:text-white animate-pulse">
              <h2>Login</h2>
            </li>
          </Link>
        </ul>
        {/* for mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 z-50 flex flex-col items-center justify-center min-w-full min-h-screen gap-48 mt-4 text-xl font-bold md:hidden backdrop-blur-sm backdrop-opacity-80"
          >
            <div
              className="transition-all ease-in-out hover:scale-125"
              onClick={toggleMenu}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                <Link href="/search">
                Search
                </Link>
              </motion.h2>
            </div>
            <Link
              className="transition-all ease-in-out hover:scale-125"
              onClick={toggleMenu}
              href="/search"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="underline"
              >
                Login
              </motion.h2>
            </Link>
          </motion.div>
        )}
      </main>
    </motion.nav>
  );
};

export default Navbar;
