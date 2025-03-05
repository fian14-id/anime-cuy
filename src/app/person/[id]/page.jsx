// File: app/character/[id]/page.js
// Ini adalah server component yang menangani metadata dan fetching data awal

import { fetchPersonFull, fetchPersonPictures } from "@/libs/fetch-api";
import { page_content } from "@/libs/setting-app";
import { cache } from "react";
import dynamic from "next/dynamic";

const ClientPersonComponent = dynamic(() => import('./ClientPerson'), {ssr: false})

const getPerson = async (id) => {
  try {
    const result = await fetchPersonFull(id);
    return result?.data || null;
  } catch (error) {
    console.log("Error Fetching Person: ", error);
    return null;
  }
};

const getPersonPictures = cache(async (id) => {
  try {
    const result = await fetchPersonPictures(id);
    return result?.data || null;
  } catch (error) {
    console.log("Error Fetching Person: ", error);
    return null;
  }
})

export async function generateMetadata({ params }) {
  const person = await getPerson(params.id);
  const title = person?.name || "Default Title";
  const description = person?.about || "No description available."
  const imageUrl = person?.images?.jpg?.image_url || "/images/nexanime-img.png"
  return {
    title,
    description,
    metadataBase: new URL(page_content?.url_web),
    openGraph: {
      title,
      description,
      url: `${page_content?.url_web}/person/${params.id}`, // Sesuaikan dengan URL
      siteName: page_content?.name_page,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }) {
  const { id } = params;
  const person = await getPerson(id);
  const pictures = await getPersonPictures(id);

  // Jika karakter tidak ditemukan, tampilkan pesan error di server component
  if (!person) {
    return (
      <div className="grid w-full h-screen py-8 text-center place-content-center">
        <h2 className="mb-2 text-xl font-bold">Person Tidak Ditemukan</h2>
        <p>People dengan ID {id} tidak tersedia di database.</p>
      </div>
    );
  }

  // Teruskan data ke client component
  return (
    <ClientPersonComponent 
      person={person} 
      pictures={pictures} 
    />
  );
}