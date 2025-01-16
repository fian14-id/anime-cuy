"use client";
import PropTypes from "prop-types";
import Link from "next/link";
import HeaderList from "./Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import SkeletonLoading from "./SkeletonLoading";

const AnimeList = ({ api, setTitle, linkHref, addtionalText }) => {
  const [isApi, setIsApi] = useState(api || { data: [] })
  const [isOffline, setIsOffline] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [networkStatus, setNetworkStatus] = useState({
    wasOffline: false,
    isOnline: true
  })

  useEffect(() => {
    setNetworkStatus(prev => ({
      ...prev,
      isOnline: navigator.onLine
    }))

    const handleOnline = () => {
      setNetworkStatus(prev => {
        if (prev.wasOffline) {
          alert("Koneksi internet telah tersedia. Data akan diperbarui.");
          return {
            wasOffline: false,
            isOnline: true
          }
        }
        return {
          ...prev,
          isOnline: true
        };
      });
      setIsOffline(false);
    };
    const handleOffline = () => {
      setNetworkStatus(prev => ({
        wasOffline: true,
        isOnline: false
      }));
      setIsOffline(true);
      alert("Koneksi internet terputus. Menggunakan data dari penyimpanan lokal.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const saveToLocalStorage = (data) => {
      try {
        if (data && data.data) {
          localStorage.setItem("savedDataApi", JSON.stringify(api));
        } 
      } catch (error) {
        console.error("Error saving to localStorage: ", error);
      }
    }
    const loadFromLocalStorage = () => {
      try {
        const savedApi = localStorage.getItem("savedDataApi");
        if (savedApi) {
          const parseData = JSON.parse(savedApi);
          if (parseData && parseData.data) {
            setIsApi(parseData);
          }
        }
      } catch (error) {
        console.error("Failded to load data from localStorage: ", error)
      }
    }
    const loadData = async() => {
      setIsLoading(true);
      if (networkStatus.isOnline && api) {
        setIsApi(api);
        saveToLocalStorage();
      }  else if (!networkStatus.isOnline) {
        const loaded = loadFromLocalStorage();
        if(!loaded) {
          setIsApi({ data: [] });
        }
      }
      setIsLoading(false);
    }

    loadData();
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    }
  }, [api, networkStatus.isOnline])

  const OfflineStatus = () => (
    <div className="w-full p-4 mb-4 text-yellow-800 bg-yellow-100 rounded-lg">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="font-medium">Anda sedang offline</p>
          <p className="text-sm">Menampilkan data dari penyimpanan lokal</p>
        </div>
      </div>
    </div>
  )


  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <>
    {isOffline && <OfflineStatus />}
      <HeaderList
        getTitle={setTitle}
        getLink={linkHref}
        getAddText={addtionalText}
      />
      <section className="grid w-full grid-cols-2 gap-8 p-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isApi?.data?.length > 0 ? (
          isApi.data.map((result) => {
            return (
              <Link href={`/${result.mal_id}`} key={result.mal_id}>
                <main className="w-full h-72 sm:h-full relative overflow-hidden text-center aspect-[9/16] duration-500 ease-in-out bg-center bg-cover rounded-sm  hover:shadow-2xl hover:bg-top hover:z-10 hover:scale-105 flex items-end justify-center text-palette-secondary">
                  <Image
                    src={result.images.webp.image_url}
                    alt={result.title}
                    width={900}
                    height={1600}
                    className="w-full aspect-[9/16] z-10 absolute bottom-0 left-0"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 z-20 w-full h-auto pt-2 bg-gradient-to-t from-palette-dark to-transparent">
                    <h3 className="px-4 py-2 text-xs font-black uppercase sm:text-md md:text-xl">
                      {result.title.length > 25 ? `${result.title.slice(0, 25)}...` : result.title}
                    </h3>
                    <p className="pb-2 text-sm font-bold text-palette-grey-600">
                      {result.score}
                    </p>
                  </div>
                </main>
              </Link>
            );
          })
        ) : (
          <h1>Can't be found :(</h1>
        )}
      </section>
    </>
  );
};

AnimeList.propTypes = {
  api: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        mal_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        images: PropTypes.shape({
          webp: PropTypes.shape({
            image_url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  setTitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
};

export default AnimeList;
