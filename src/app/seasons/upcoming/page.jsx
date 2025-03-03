import UpcomingClient from "./UpcomingClient";

export async function generateMetadata() {
    return {
      title: 'Anime & Manga Upcoming - Nexanime',
      description: 'Jadwal rilis anime dan manga terbaru setiap hari. Dapatkan informasi lengkap dan tetap update!',
      keywords: 'jadwal anime, jadwal manga, anime release, manga release, update anime, update manga',
      openGraph: {
        title: 'Anime & Manga Upcoming - Nexanime',
        description: 'Jadwal rilis anime dan manga terbaru setiap hari. Dapatkan informasi lengkap dan tetap update!',
        url: 'https://nexanime.fianity.com/upcoming',
        siteName: 'Nexanime',
        images: [
          {
            url: 'https://nexanime.fianity.com/images/nexanime-img.png',
            width: 1200,
            height: 630,
            alt: 'Anime & Manga Upcoming',
          },
        ],
        type: 'website',
      },
    };
  }

const Page = () => {
    return <UpcomingClient />
}

export default Page