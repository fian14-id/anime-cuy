const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchDataApi = async () => {
  try {
    const [
      animePopularResponse,
      allAnimePopularResponse,
      newSeasonsResponse,
      allNewSeasonsResponse,
      genreMangaResponse,
      genreAnimeResponse,
    ] = await Promise.all([
      fetch(`${baseUrl}/top/anime?limit=6`, {next: {revalidate: 3600}}),
      fetch(`${baseUrl}/top/anime`, {next: {revalidate: 3600}}),
      fetch(`${baseUrl}/seasons/now?limit=6`, {next: {revalidate: 3600}}),
      fetch(`${baseUrl}/seasons/now`, {next: {revalidate: 3600}}),
      fetch(`${baseUrl}/genres/manga`, {next: {revalidate: 3600}}),
      fetch(`${baseUrl}/genres/anime`, {next: {revalidate: 3600}}),
    ]);
    const response = [
      animePopularResponse,
      allAnimePopularResponse,
      newSeasonsResponse,
      allNewSeasonsResponse,
      genreMangaResponse,
      genreAnimeResponse,
    ];

    if (response.some((response) => !response.ok)) {
      throw new Error("One or more API calls failed");
    }
    const [
      animePopular,
      allAnimePopular,
      newSeasons,
      allNewSeasons,
      genreManga,
      genreAnime,
    ] = await Promise.all([
      animePopularResponse.json(),
      allAnimePopularResponse.json(),
      newSeasonsResponse.json(),
      allNewSeasonsResponse.json(),
      genreMangaResponse.json(),
      genreAnimeResponse.json(),
    ]);

    return {
        animePopular,
        allAnimePopular,
        newSeasons,
        allNewSeasons,
        genreManga,
        genreAnime,
    };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {
      props: {
        animePopular: { data: [] },
        allAnimePopular: { data: [] },
        newSeasons: { data: [] },
        allNewSeasons: { data: [] },
        genreManga: { data: [] },
        genreAnime: { data: [] },
      },
    };
  }
};

export const fetchSearchAnime = async (query) => {
  try {
    const response = await fetch(`${baseUrl}/anime?q=${query}`);
    if (!response.ok) {
      throw new Error("Failed fething anime search result");
    }
    const search = response.json();
    return await search;
  } catch (err) {
    console.error("error fetching data: ", err);
    throw err;
  }
};
export const fetchSearchManga = async (query) => {
  try {
    const response = await fetch(`${baseUrl}/manga?q=${query}`);
    if (!response.ok) {
      throw new Error("Failed fething manga search result");
    }
    const search = response.json();
    // console.log(search)
    return await search;
  } catch (err) {
    console.error("error fetching data: ", err);
    throw err;
  }
};
