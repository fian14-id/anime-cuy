// page.js
import Image from "next/image";
import DetailContentManga from "./DetailManga";
import { page_content } from "@/libs/setting-app";
const { fetchDetailsManga } = require("@/libs/fetch-api");

const getMangaDetails = async (id) => {
  try {
      const result = await fetchDetailsManga(id);
      return result?.data || null;
  } catch (error) {
      console.error("Failed to fetch anime details:", error);
      return null;
  }
};
export async function generateMetadata({ params }) {
  const details = await getMangaDetails(params.id);
  const title = details?.name || "Default Title";
  const description = details?.about || "No description available."
  const imageUrl = details?.images?.jpg?.image_url || "/nexanime-img.png"
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${page_content?.url_web}/manga/${params.id}`, // Sesuaikan dengan URL
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

const Page = async ({ params }) => {
  const { id } = params;
  try {
    const result = await getMangaDetails(id);
    // Handle kasus data null (404)
    if (!result) {
      return (
        <div className="grid w-full h-screen py-8 text-center place-content-center">
          <h2 className="mb-2 text-xl font-bold">Manga Tidak Ditemukan</h2>
          <p>Manga dengan ID {id} tidak tersedia di database.</p>
        </div>
      );
    }

    return (

      <section className="flex flex-col justify-center w-full gap-4 px-6 py-4 md:flex-row">
        <main className="grid w-full px-0 py-4 md:px-6 md:w-1/3 place-content-center">
          <Image
            src={result?.images.jpg.large_image_url}
            alt={result?.title}
            width={900}
            height={1600}
            className="w-72 sm:w-80 md:w-96 shadow-lg rounded-md object-cover md:aspect-[4/6]"
          />
        </main>
        <main className="flex flex-col w-full gap-2 px-6 py-4">
          <DetailContentManga animeData={result} />
        </main>
      </section>
    );
  } catch (error) {
    // Handle rate limiting dan error lainnya
    const errorMessage = error.message.includes("429")
      ? "Terlalu banyak request. Mohon tunggu sebentar dan coba lagi."
      : "Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.";
    return (
      <div className="py-8 text-center">
        <h2 className="mb-2 text-xl font-bold">Error</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }
};

export default Page;