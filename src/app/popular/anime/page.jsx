import { page_content } from "@/libs/setting-app";
import AnimePopularContent from "./AnimePopularContent";

export async function generateMetadata() {
  return {
    title: "Top Trending Anime | Most Popular Anime Right Now",
    description: "Discover the most popular anime currently trending! From action to romance, explore the highest-rated anime that you shouldn't miss.",
    metadataBase: new URL(page_content?.url_web),
    openGraph: {
      title: "Top Trending Anime | Most Popular Anime Right Now",
      description: "Explore the top trending anime with the highest ratings! Don't miss out on the best anime that everyone is talking about.",
      images: ["/images/nexanime-img.png"],
      type: "website",
    },
  };
}

const Page = () => {
  return (
      <AnimePopularContent />
  )
} 
export default Page;