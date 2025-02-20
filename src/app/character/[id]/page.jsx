import { fetchCharactersFull } from "@/libs/fetch-api"

const getCharacter = async(id) => {
    try {
        const result = await fetchCharactersFull(id)
        return result?.data || null
    } catch (error) {
        console.log("Error Fetching Character: ", error)
        return null
    }
}

const Page = async({params}) => {
    const {id} = params
    const character = await getCharacter(id)
    if (!character) {
        return (
            <div className="grid w-full h-screen py-8 text-center place-content-center">
              <h2 className="mb-2 text-xl font-bold">Character Tidak Ditemukan</h2>
              <p>Character dengan ID {id} tidak tersedia di database.</p>
            </div>
        )
    }
    return (
        <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center mb-6">
        <img
          src={character.images.jpg.image_url}
          alt={character.name}
          className="w-32 h-32 mr-6 border-4 border-gray-200 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{character.name}</h1>
          <h2 className="text-xl text-gray-600">{character.name_kanji}</h2>
          <p className="text-gray-500">
            <strong>Nicknames:</strong> {character.nicknames.join(', ')}
          </p>
          <p className="text-gray-500">
            <strong>Favorites:</strong> {character.favorites}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h3 className="mb-3 text-2xl font-semibold text-gray-800">About</h3>
        <p className="text-gray-600 whitespace-pre-line">{character.about}</p>
      </div>

      {/* Anime Section */}
      <div>
        <h3 className="mb-3 text-2xl font-semibold text-gray-800">Anime</h3>
        {character.anime.map((anime, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={anime.anime.images.jpg.small_image_url}
              alt={anime.anime.title}
              className="w-12 h-12 mr-4 rounded-lg"
            />
            <div>
              <p className="text-sm text-gray-500">{anime.role}</p>
              <p className="text-lg text-gray-800">{anime.anime.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}

export default Page