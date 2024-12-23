'use client';
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useDataContext } from "@/components/utils/DataContext";

const InputSearch = () => {
  const { selectedType, setSelectedType } = useDataContext();
  const searchRef = useRef();
  const router = useRouter();

  const handleChangeOption = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchRef.current.value;
    if (keyword) {
      router.push(`/search/${selectedType}/${keyword}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col items-center w-full h-full px-6">
      <br />
      <main className="px-2 mt-4 flex gap-4 text-sm font-semibold">
        <span className="flex gap-2">
          <input
            type="radio"
            id="animeType" 
            name="typeSearch"
            value="anime"
            checked={selectedType === "anime"}
            onChange={handleChangeOption}
          />
          <label htmlFor="animeType">Anime</label>
        </span>
        <span className="flex gap-2">
          <input
            type="radio"
            id="mangaType"
            name="typeSearch"
            value="manga"
            checked={selectedType === "manga"}
            onChange={handleChangeOption}
          />
          <label htmlFor="mangaType">Manga</label>
        </span>
      </main>
      <main className="flex flex-col items-center justify-center w-full gap-4 mt-4">
        <label htmlFor="inputSearch" className="text-xl font-bold uppercase">
          Look for Anything
        </label>
        <section className="w-full flex justify-center">
          <input
            type="text"
            placeholder="search..."
            id="inputSearch"
            ref={searchRef} // Gunakan ref untuk elemen input
            className="w-1/3 md:w-1/6 md:focus:w-1/3 focus:w-full focus:font-semibold px-8 py-4 outline-none bg-transparent text-center border-b-2 ease-in-out focus:mt-6 duration-300 border-b-[#242424] dark:border-b-white font-light"
            
          />
        </section>
      </main>
      <br />
      <h2 className="px-2 mt-6 text-sm font-semibold opacity-30">OR</h2>
      <br />
      {/* Rest of your form code remains the same */}
    </form>
  );
};

export default InputSearch;