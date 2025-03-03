import HeaderProfile from "@/components/ProfileList/HeaderProfile";
import ProfileList from "@/components/ProfileList/ProfileList";
import { fetchSearchPerson } from "@/libs/fetch-api";

export async function generateMetadata({ params }) {
    const { keyword } = params;
    const capitalizeWords = (str) => {
      return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    const getParams = keyword.trim().replace(/-/g, ' ')
      return {
        title: `${capitalizeWords(getParams)} | Search People`,
        description: "Find anime, manga, characters, and people on nexanime with the latest technology and simple designs.",
        openGraph: {
        title: `${capitalizeWords(getParams)} | Search People`,
        description: `Find anime, manga, characters, and people on nexanime with the latest technology and simple designs from the keyword ${capitalizeWords(getParams)}`,
        images: ["/images/nexanime-img-search.png"],
        type: "website"
      }
    }
    }

const Page = async({params}) => {
    const {keyword} = params
    const getParams = keyword.trim().replace(/-/g, " ");
    const getSearchPerson = await fetchSearchPerson(keyword)

    return  (
        <section
      className={`w-full ${getSearchPerson?.data} ? (min-h-full) : (min-h-screen) py-6`}
    >
      {getSearchPerson?.data ? (
        <main>
          <HeaderProfile title={getParams} />
          <ProfileList
            api={getSearchPerson}
            setTitle={`People result`}
            linkHref=""
            addtionalText=""
            typeProfile="person"
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