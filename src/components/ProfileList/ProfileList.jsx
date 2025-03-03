"use client";

import PropTypes from "prop-types";
import HeaderList from "@/components/AnimeList/Header";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import SkeletonLoading from "@/components/AnimeList/SkeletonLoading";
import Link from "next/link";
import { motion } from "framer-motion";

const STORAGE_KEY = "savedProfileDataApi";

const ProfileCard = ({ result, typeProfile }) => (
  <Link href={`/${typeProfile}/${result?.mal_id}`}>
    <motion.article 
      initial={{y: -50, opacity: 0}} 
      whileInView={{y: 0, opacity: 1}} 
      viewport={{once:true}} 
      transition={{ease: "easeIn", duration: 0.5}} 
      className="relative overflow-hidden rounded-md shadow-lg group"
    >
      <Image
        src={result?.images?.jpg?.image_url || "/default-profile.jpg"}
        alt={result?.name}
        width={400}
        height={600}
        className="w-full aspect-[3/4] transition-transform hd-image duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-palette-secondary to-transparent">
        <h3 className="font-semibold text-palette-primary">
          {result?.name?.length > 25 ? `${result?.name?.slice(0, 25)}...` : result?.name}
        </h3>
        <div className="flex flex-col text-xs md:text-sm text-palette-primary/80">
          {result?.given_name && result?.family_name && (
            <p>
              {result.family_name} {result.given_name}
            </p>
          )}
          {result?.favorites > 0 && (
            <p className="flex items-center gap-1">
              <span>♥</span> {result.favorites} fans
            </p>
          )}
        </div>
      </div>
    </motion.article>
  </Link>
);

const ProfileList = ({ api, setTitle, linkHref, addtionalText, typeProfile }) => {
  const [profileData, setProfileData] = useState(api || { data: [] });
  const [isLoading, setIsLoading] = useState(true);

  const saveToLocalStorage = useCallback((data) => {
    try {
      if (data?.data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, []);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData?.data) {
          setProfileData(parsedData);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (api) {
        setProfileData(api);
        saveToLocalStorage(api);
      } else {
        loadFromLocalStorage();
      }
      setIsLoading(false);
    };

    loadData();
  }, [api, saveToLocalStorage, loadFromLocalStorage]);

  if (isLoading) return <SkeletonLoading />;

  return (
    <>
      <HeaderList
        getTitle={setTitle}
        getLink={linkHref}
        getAddText={addtionalText}
      />
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {profileData?.data?.length > 0 ? (
          profileData.data.map((result, index) => (
            <ProfileCard key={`${result.mal_id}-${index}`} typeProfile={typeProfile} result={result} />
          ))
        ) : (
          <div className="py-8 text-center col-span-full">
            <p className="text-lg font-semibold">No profiles found.</p>
            <p className="text-sm font-medium">Suggestion: Try refreshing the page.</p>
          </div>
        )}
      </div>
      {profileData?.pagination?.has_next_page && (
        <div className="flex justify-center mt-4 mb-8">
          <p className="text-sm text-palette-primary/70">
            Showing {profileData.pagination.items.count} of {profileData.pagination.items.total} profiles
          </p>
        </div>
      )}
    </>
  );
};

ProfileList.propTypes = {
  api: PropTypes.shape({
    pagination: PropTypes.shape({
      last_visible_page: PropTypes.number,
      has_next_page: PropTypes.bool,
      current_page: PropTypes.number,
      items: PropTypes.shape({
        count: PropTypes.number,
        total: PropTypes.number,
        per_page: PropTypes.number
      })
    }),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        mal_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        given_name: PropTypes.string,
        family_name: PropTypes.string,
        alternate_names: PropTypes.array,
        birthday: PropTypes.string,
        favorites: PropTypes.number,
        about: PropTypes.string,
        images: PropTypes.shape({
          jpg: PropTypes.shape({
            image_url: PropTypes.string
          })
        })
      })
    ).isRequired,
  }).isRequired,
  setTitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string,
  addtionalText: PropTypes.string,
};

export default ProfileList;