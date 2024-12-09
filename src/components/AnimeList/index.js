import PropTypes from "prop-types";
import Link from "next/link";

const AnimeList = ({ api, setTitle, linkHref }) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 mt-4">
        <h1 className="font-bold uppercase text-md sm:text-xl md:text-2xl">
          {setTitle}
        </h1>
        <Link
          href={linkHref}
          className="text-xs font-light underline opacity-80 hover:opacity-100 md:text-sm"
        >
          See More...
        </Link>
      </div>
      <div className="grid w-full h-full grid-cols-1 gap-8 p-4 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {api.data.map((result) => {
          return (
            <Link href={`${result.mal_id}`} key={result.mal_id}>
              <div
                style={{ backgroundImage: `url(${result.images.webp.image_url})` }}
                className="w-full h-56 text-center duration-500 ease-in-out bg-center bg-cover rounded-sm hover:shadow-2xl hover:bg-top hover:z-10 hover:scale-105 sm:h-96"
              >
                {/* <Image
            src={images}
            width={600}
            height={400}
            alt="..."
          /> */}
                <div className="relative flex items-end justify-center h-full text-white duration-500 ease-in-out">
                  <div className="absolute bottom-0 w-full h-auto pt-2 bg-gradient-to-t from-slate-800 to-transparent">
                    <h3 className="px-4 py-2 font-black uppercase text-md md:text-xl">
                      {result.title}
                    </h3>
                    <p className="pb-2 text-sm font-bold">{result.score}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

AnimeList.propTypes = {
  api: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        mal_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        images: PropTypes.shape({
          webp: PropTypes.shape({
            image_url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  setTitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
};

export default AnimeList;
