"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MagnifyingGlass, SignIn } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useDataContext } from "./DataContext";
import { page_content } from "@/libs/setting-app";
import Modal from "./Modal";
import TransitionsLink from "./TransitionsLink";

const Navbar = () => {
  const searchRef = useRef();
  const router = useRouter();
  const { selectedType, setSelectedType } = useDataContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [pageContent, setPageContent] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openSearch = () => {
    setSearchOpen(true);
    setIsMenuOpen(!isMenuOpen);
  };
  const handleChangeOption = (e) => {
    const targetRadio = e.target.value;
    setSelectedType(targetRadio);
  };
  const closeSearch = () => setSearchOpen(false);
  const cleanSearchQuery = (query) => {
    if (!query || query.trim() === "") return "";
    return query
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };
  const handleSearch = (e) => {
    const keyword = searchRef.current.value;
    e.preventDefault();
    if (keyword) {
      const cleanQuery = cleanSearchQuery(keyword);
      if (cleanQuery && selectedType && selectedType != "all") {
        router.push(`/search/${selectedType}/${cleanQuery}`);
      } else if (selectedType === null || selectedType === "all") {
        router.push(`/search/${cleanQuery}`);
      } else {
        alert("Insert a search keyword!");
      }
      localStorage.setItem("lastSearchQuery", keyword);
    }
    setSearchOpen(false);
  };
  useEffect(() => {
    localStorage.setItem("savedContent", JSON.stringify(page_content));
    const savedPageContent = localStorage.getItem("savedContent");
    const savedQuery = localStorage.getItem("lastSearchQuery");
    if (savedQuery) setSearchContent(savedQuery);
    if (savedPageContent) setPageContent(JSON.parse(savedPageContent));
  }, []);
  useEffect(() => {
    const handleKeySearch = (e) => {
      if (
        (e.ctrlKey && e.key === "k") ||
        (e.ctrlKey && e.key === "K") ||
        e.key === "/"
      ) {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeySearch);
    return () => window.removeEventListener("keydown", handleKeySearch);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="sticky top-0 z-30 flex items-center justify-between w-full px-4 py-2 bg-palette-primary md:px-8 md:py-6"
    >
      <TransitionsLink href="/">
        <span className="text-lg font-bold md:text-xl lg:text-2xl">
          {pageContent?.logo_app ? (
            <div className="flex items-center gap-2">
              <Image
                className="w-12 h-12 py-2 sm:w-14 sm:h-14"
                src={pageContent.logo_app}
                width={65}
                height={65}
                alt={pageContent.name_page}
              />{" "}
            <span className="font-semibold text-transparent bg-none bg-clip-text md:bg-palette-accent">{pageContent.name_page}</span>
            </div>
          ) : (
            <span className="font-semibold text-transparent bg-none bg-clip-text md:bg-palette-accent">{pageContent.name_page}</span>
          )}
        </span>
      </TransitionsLink>
      <main>
        {/* Start Modal Search */}
        <Modal isOpen={searchOpen} onClose={closeSearch}>
          <form
            onSubmit={handleSearch}
            className="flex flex-col justify-center mt-2 bg-palette-secondary/[0.5] backdrop-blur-md"
          >
            <main className="flex items-center justify-center w-full gap-2 mt-2">
              <MagnifyingGlass
                size={32}
                weight="fill"
                className="text-palette-primary"
              />
              <input
                type="search"
                placeholder="Search..."
                ref={searchRef}
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-b-2 border-b-palette-primary focus:outline-none placeholder:text-palette-primary"
                autoFocus
              />
              {searchContent.trim() ? (
                <button
                  type="submit"
                  className="p-2 border-b-2 border-b-palette-accent text-palette-accent"
                >
                  Go
                </button>
              ) : (
                ""
              )}
            </main>
            <main className="mt-4">
              {page_content?.feature?.search_type ? (
                page_content.feature.search_type.map((type, i) => {
                  return (
                    <section key={i} className="relative flex gap-2 px-4 py-2">
                      <input
                        type="radio"
                        id={type.name_type}
                        value={type.value}
                        checked={selectedType === type.value}
                        onChange={handleChangeOption}
                        className="absolute top-0 left-0 w-full h-full duration-75 ease-in border-l-0 rounded-sm outline-none appearance-none transtiion-all checked:border-l-4 border-palette-accent "
                      />
                      <label htmlFor={type.name_type} className="ml-4">
                        <h3 className="font-medium">{type.label_type}</h3>
                        <p className="text-xs">
                          Search by {type.label_type} type
                        </p>
                      </label>
                    </section>
                  );
                })
              ) : (
                <p className="text-center">missing data</p>
              )}
            </main>
          </form>
        </Modal>
        {/* End Modal Search */}
        {/* Hamburger button with animation */}
        <div className="md:hidden" onClick={toggleMenu} role="button">
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-4 h-0.5 bg-palette-secondary my-1"
          />
          <motion.div
            animate={isMenuOpen ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="w-6 h-0.5 bg-palette-secondary my-1"
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-4 h-0.5 bg-palette-secondary my-1"
          />
        </div>
        {/* for large menu */}
        <ul className="hidden gap-2 text-sm md:flex md:gap-6 md:text-lg justify-evenly">
          <li
            className="flex items-center justify-between gap-4 px-4 mt-1 text-sm border-b-2 cursor-pointer border-palette-accent text-palette-secondary "
            onClick={openSearch}
          >
            <span>Quick search...</span>
            <kbd className="px-2 text-xs rounded-sm bg-palette-secondary text-palette-dark">
              <abbr title="Control">Ctrl </abbr>K
            </kbd>
          </li>
          <TransitionsLink href="/login">
            <li className="px-4 py-2 font-semibold underline md:px-6 md:py-2 dark:text-palette-secondary animate-pulse">
              <h2>Login</h2>
            </li>
          </TransitionsLink>
        </ul>
        {/* for mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 z-50 flex flex-col items-end min-w-full min-h-screen gap-10 px-6 mt-8 text-xl font-bold md:hidden"
          >
            <div
              className="transition-all ease-in-out hover:scale-125"
              onClick={openSearch}
            >
              <motion.h2
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ ease: "backInOut", duration: 0.5 }}
              >
                <button type="button">
                  <MagnifyingGlass size={24} weight="bold" className="w-8 h-8 p-2 rounded-full shadow-xl text-palette-accent bg-palette-secondary bottom-10 right-5 hover:brightness-75" />
                </button>
              </motion.h2>
            </div>
            <TransitionsLink
              className="transition-all ease-in-out hover:scale-125"
              onClick={toggleMenu}
              href="/login"
            >
              <motion.h2
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ ease: "backInOut", duration: 0.5, delay: 0.5 }}
                className="underline"
              >
                <SignIn size={24} weight="bold" className="w-8 h-8 p-2 rounded-full shadow-xl text-palette-accent bg-palette-secondary bottom-10 right-5 hover:brightness-75" />
              </motion.h2>
            </TransitionsLink>
          </motion.div>
        )}
      </main>
    </motion.nav>
  );
};

export default Navbar;
