const { fetchDetailsManga } = require("@/lib/FetchApi");

const Page = async({ params }) => {
  const { id } = params
  
  try {
      const result = await fetchDetailsManga(id);
      
      // Handle kasus data null (404)
      if (!result.data) {
          return (
              <div className="text-center py-8">
                  <h2 className="text-xl font-bold mb-2">Manga Tidak Ditemukan</h2>
                  <p>Manga dengan ID {id} tidak tersedia di database.</p>
              </div>
          )
      }
      
      return (
          <div>
              ini manga {result.data.title}
          </div>
      )
  } catch (error) {
      // Handle rate limiting dan error lainnya
      const errorMessage = error.message.includes('429') 
          ? 'Terlalu banyak request. Mohon tunggu sebentar dan coba lagi.'
          : 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.';
          
      return (
          <div className="text-center py-8">
              <h2 className="text-xl font-bold mb-2">Error</h2>
              <p>{errorMessage}</p>
          </div>
      )
  }
}

export default Page;