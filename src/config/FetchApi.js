const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const popularAnime = async() => {
    try {
        const response = await fetch(`${baseUrl}/top/anime?limit=6`)
        const popular = await response.json()
        // console.log(popular)
        return popular
    } catch (err) {
        console.log(err)
        return err
    }
}
export const searchAnime = async(query) => {
    try {
        const response = await fetch(`${baseUrl}/anime?q=${query}`)
        const search = response.json()
        // console.log(search)
        return search
    } catch (err) {
        console.log(err)
        return err
    }
}
export const newAnime = async() => {
    try {
        const response = await fetch(`${baseUrl}/seasons/now?limit=6`)
        const now = response.json()
        // console.log(now)
        return now
    } catch (err) {
        console.log(err)
        return err
    }
}