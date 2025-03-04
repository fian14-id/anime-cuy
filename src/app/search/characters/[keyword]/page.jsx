import HeaderProfile from "@/components/ProfileList/HeaderProfile";
import ProfileList from "@/components/ProfileList/ProfileList";
import { fetchSearchCharacter } from "@/libs/fetch-api";
import { page_content } from "@/libs/setting-app";

export async function generateMetadata({ params }) {
    const { keyword } = params;
    const capitalizeWords = (str) => {
      return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    const getParams = keyword.trim().replace(/-/g, ' ')
      return {
        title: `${capitalizeWords(getParams)} | Search Character`,
        description: "Find anime, manga, characters, and people on nexanime with the latest technology and simple designs.",
        metadataBase: new URL(page_content?.url_web),
        openGraph: {
        title: `${capitalizeWords(getParams)} | Search Character`,
        description: `Find anime, manga, characters, and people on nexanime with the latest technology and simple designs from the keyword ${capitalizeWords(getParams)}`,
        images: ["/images/nexanime-img-search.png"],
        type: "website"
      }
    }
    }

const Page = async({params}) => {
    const {keyword} = params
    const getParams = keyword.trim().replace(/-/g, " ");
    const getSearchCharacter = await fetchSearchCharacter(keyword)

    return  (
        <section
      className={`w-full ${getSearchCharacter?.data} ? (min-h-full) : (min-h-screen) py-6`}
    >
      {getSearchCharacter?.data ? (
        <main>
          <HeaderProfile title={getParams} />
          <ProfileList
            api={getSearchCharacter}
            setTitle={`Characters result`}
            linkHref=""
            addtionalText=""
            typeProfile="character"
          />
        </main>
      ) : (
        <h1 className="font-semibold text-center uppercase">
          Fail to fetching data
        </h1>
      )}
    </section>
    )
}

export default Page;