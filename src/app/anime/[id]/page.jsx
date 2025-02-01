const { fetchDetailsAnime } = require("@/lib/FetchApi");

const Page = async({ params }) => {
  const { id } = params
  
  try {
      const result = await fetchDetailsAnime(id);
      
      // Handle kasus data null (404)
      if (!result.data) {
          return (
              <div className="py-8 text-center">
                  <h2 className="mb-2 text-xl font-bold">Anime Tidak Ditemukan</h2>
                  <p>Anime dengan ID {id} tidak tersedia di database.</p>
              </div>
          )
      }
      
      return (
          <>
            {result?.data ? (<>{result.data.title}</>) : (<p>Masih Loading</p>)}
          </>
      )
  } catch (error) {
      // Handle rate limiting dan error lainnya
      const errorMessage = error.message.includes('429') 
          ? 'Terlalu banyak request. Mohon tunggu sebentar dan coba lagi.'
          : 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.';
          
      return (
          <div className="py-8 text-center">
              <h2 className="mb-2 text-xl font-bold">Error</h2>
              <p>{errorMessage}</p>
          </div>
      )
  }
}

export default Page;