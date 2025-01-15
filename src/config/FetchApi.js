const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const fetchPopularAnime = async() => {
    try {
        const response = await fetch(`${baseUrl}/top/anime?limit=6`)
        const popular = await response.json()
        // console.log(popular)
        return popular
    } catch (err) {
        console.error("error fetching data: ", err)
        throw err;
    }
}
export const fetchSearchAnime = async(query) => {
    try {
        const response = await fetch(`${baseUrl}/anime?q=${query}`)
        const search = response.json()
        // console.log(search)
        return search
    } catch (err) {
        console.error("error fetching data: ", err)
        throw err;
    }
}
export const fetchSearchManga = async(query) => {
    try {
        const response = await fetch(`${baseUrl}/manga?q=${query}`)
        const search = response.json()
        // console.log(search)
        return search
    } catch (err) {
        console.error("error fetching data: ", err)
        throw err;
    }
}
export const fetchNewAnime = async() => {
    try {
        const response = await fetch(`${baseUrl}/seasons/now?limit=6`)
        const now = response.json()
        // console.log(now)
        return now
    } catch (err) {
        console.error("error fetching data: ", err)
        throw err;
    }
}
export const fetchGenreAnime = async() => {
    try {
        const response = await fetch(`${baseUrl}/genres/anime`)
        const genre = response.json()
        // console.log(now)
        return genre
    } catch (err) {
        console.error("error fetching data: ", err)
        throw err;
    }
}
export const fetchGenreManga = async() => {
    try {
        const response = await fetch(`${baseUrl}/genres/manga`)
        const genre = response.json()
        // console.log(now)
        return genre
    } catch (err) {
        console.error("error fetching data: ", err)
        throw err;
    }
}
