import ClientCharacter from "./ClientCharacter";
import { fetchCharactersFull, fetchCharactersPictures } from "@/libs/fetch-api";
import { page_content } from "@/libs/setting-app";
import { getRandomIndex } from "@/libs/simple-function";
import { cache } from "react";

const getCharacter = async (id) => {
  try {
    const result = await fetchCharactersFull(id);
    return result?.data || null;
  } catch (error) {
    console.log("Error Fetching Character: ", error);
    return null;
  }
};

const getCharacterPictures = cache(async (id) => {
  try {
    const result = await fetchCharactersPictures(id);
    return result?.data || null;
  } catch (error) {
    console.log("Error Fetching Character: ", error);
    return null;
  }
})

export async function generateMetadata({ params }) {
  const character = await getCharacter(params.id);
  const title = character?.name || "Default Title";
  const description = character?.about || "No description available."
  const imageUrl = character?.images?.jpg?.image_url || "/images/nexanime-img.png"
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${page_content?.url_web}/character/${params.id}`, // Sesuaikan dengan URL
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
  const character = await getCharacter(id);
  const pictures = await getCharacterPictures(id);
  const getRandomPicture = getRandomIndex(pictures?.length);

  // Jika karakter tidak ditemukan, tampilkan pesan error di server component
  if (!character) {
    return (
      <div className="grid w-full h-screen py-8 text-center place-content-center">
        <h2 className="mb-2 text-xl font-bold">Character Tidak Ditemukan</h2>
        <p>Character dengan ID {id} tidak tersedia di database.</p>
      </div>
    );
  }

  // Teruskan data ke client component
  return (
    <ClientCharacter 
      character={character} 
      pictures={pictures} 
      getRandomPicture={getRandomPicture} 
    />
  );
}