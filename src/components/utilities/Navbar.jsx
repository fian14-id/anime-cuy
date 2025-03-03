"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MagnifyingGlass, SignIn } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useDataContext } from "./DataContext";
import { page_content } from "@/libs/setting-app";
import Modal from "./Modal";
import Link from "next/link";

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
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="sticky top-0 z-30 flex items-center justify-between w-full px-4 py-2 bg-palette-primary md:px-8 md:py-6"
    >
      <Link href="/" className="cursor-pointer">
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
      </Link>
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
              {page_content?.feature?.search_type?.length > 0 ? (
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
          <Link href="/login">
            <li className="px-4 py-2 font-semibold underline md:px-6 md:py-2 dark:text-palette-secondary animate-pulse">
              <h2>Login</h2>
            </li>
          </Link>
        </ul>
        {/* for mobile menu */}
        <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-4 z-30 flex flex-col min-w-full min-h-[100svh] bg-palette-primary text-xl font-bold md:hidden"
          >
            <div
              className="mt-5 transition-all ease-in-out hover:brightness-75"
              onClick={openSearch}
            >
              <motion.h2      
              initial={{ width: "200%" }}
              animate={{ width: "100%" }}
              exit={{ width: "200%" }}
              transition={{ ease: "backInOut", duration: 0.5 }}
              >
                <button type="button" className="flex items-center justify-end w-full px-6 py-4 text-palette-secondary md:py-6 bg-palette-primary">
                  <MagnifyingGlass size={24} weight="bold" />
                  <span className="ml-4 text-lg font-semibold tracking-widest uppercase">Search</span>
                </button>
              </motion.h2>
            </div>
            <Link
              className="transition-all ease-in-out hover:brightness-75"
              onClick={toggleMenu}
              href="/login"
            >
              <motion.h2
                initial={{ width: "200%" }}
                animate={{ width: "100%" }}
                exit={{ width: "200%" }}
                transition={{ ease: "backInOut", duration: 0.5, delay: 0.3 }}
              >
                <button type="button" className="flex items-center justify-end w-full px-6 py-4 text-palette-secondary md:py-6 bg-palette-primary">
                <SignIn size={24} weight="bold" />
                  <span className="ml-4 text-lg font-semibold tracking-widest uppercase">Login</span>
                </button>
              </motion.h2>
            </Link>
            <main className="absolute w-full px-6 bottom-20 text-end">
              <h2 className="text-sm font-semibold">Developed by{" "}<Link href={page_content?.main_web} target="_blank" className="text-palette-accent">{page_content?.developed_by}</Link></h2>
              <p className="text-xs font-medium">Copyright © {new Date().getFullYear()} - All right reserved by Fianity</p>
            </main>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </motion.nav>
  );
};

export default Navbar;
