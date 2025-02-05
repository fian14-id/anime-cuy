// page.js
import Image from "next/image";
import DetailContentManga from "./client/page";
const { fetchDetailsManga } = require("@/libs/fetch-api");



const Page = async ({ params }) => {
  const { id } = params;
  try {
    const result = await fetchDetailsManga(id);
    // Handle kasus data null (404)
    if (!result.data) {
      return (
        <div className="grid w-full h-screen py-8 text-center place-content-center">
          <h2 className="mb-2 text-xl font-bold">Anime Tidak Ditemukan</h2>
          <p>Anime dengan ID {id} tidak tersedia di database.</p>
        </div>
      );
    }

    return (
      <section className="flex flex-col justify-center w-full gap-4 px-6 py-4 md:flex-row">
        <main className="w-full px-0 md:px-6 py-4 md:w-1/3 grid place-content-center">
          <Image
            src={result.data.images.jpg.large_image_url}
            alt={result.data.title}
            width={900}
            height={1600}
            className="w-72 sm:w-80 md:w-96 rounded-md object-cover md:aspect-[4/6]"
          />
        </main>
        <main className="flex flex-col gap-2 w-full px-6 py-4">
          <DetailContentManga animeData={result.data} />
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