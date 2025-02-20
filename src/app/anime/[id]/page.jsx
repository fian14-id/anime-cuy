// page.js

import Image from "next/image";
import DetailContentAnime from "./DetailContent";
const { fetchDetailsAnime } = require("@/libs/fetch-api");

const getAnimeDetails = async (id) => {
  try {
      const result = await fetchDetailsAnime(id);
      return result?.data || null;
  } catch (error) {
      console.error("Failed to fetch anime details:", error);
      return null;
  }
};
export async function generateMetadata({params}) {
  const animeDetails = await getAnimeDetails(params.id)
  const title = animeDetails?.title || "Detail"
    return {
      title,
      openGraph: {
        title,
        description: `Searching for your favorite anime and manga from the keyword ${title}`,
    }
  }
  }

const Page = async ({ params }) => {
  const { id } = params;
  try {
    const result = await getAnimeDetails(id);
    // Handle kasus data null (404)
    if (!result) {
      return (
        <div className="grid w-full h-screen py-8 text-center place-content-center">
          <h2 className="mb-2 text-xl font-bold">Anime Tidak Ditemukan</h2>
          <p>Anime dengan ID {id} tidak tersedia di database.</p>
        </div>
      );
    }

    return (

      <section className="flex flex-col justify-center w-full gap-4 px-6 py-4 md:flex-row">
        <main className="grid w-full px-0 py-4 md:px-6 md:w-1/3 place-content-center">
          <Image
            src={result.images.jpg.large_image_url}
            alt={result.title}
            width={900}
            height={1600}
            className="w-72 flex-shrink-0 shadow-xl sm:w-80 md:w-96 rounded-md object-cover md:aspect-[4/6]"
          />
        </main>
        <main className="flex flex-col w-full gap-2 px-6 py-4">
          <DetailContentAnime animeData={result} />
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