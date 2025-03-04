import { page_content } from "@/libs/setting-app";
import MangaPopularContent from "./MangaPopularContent";
export async function generateMetadata() {
  return {
    title: "Best-Selling Manga | Top Popular Manga to Read",
    description: "Check out the most popular manga with the best stories and top sales! From shonen to seinen, find your next favorite manga.",
    metadataBase: new URL(page_content?.url_web),
    openGraph: {
      title: "Best-Selling Manga | Top Popular Manga to Read",
      description: "Find the best-rated manga with incredible stories! Here’s a list of must-read manga that every fan should check out.",
      images: ["/images/nexanime-img.png"],
      type: "website",
    },
  };
}
const Page = () => {
  return (
      <MangaPopularContent />
  )
} 
export default Page;