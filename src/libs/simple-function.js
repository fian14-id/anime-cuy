/**
 * Fungsi untuk mengubah teks (satu kalimat) menjadi paragraf-paragraf dengan jarak
 * @param {string} text - Teks yang akan diubah
 * @returns {string} - HTML string yang berisi paragraf dengan jarak
 */
export const toCapitalize = (text) => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

export const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
}

export const formatToParagraph = (text) => {
  if (!text) return "I can't introduce myself :(";

  // Pisahkan teks menjadi kalimat berdasarkan tanda titik (.), tanda tanya (?), atau tanda seru (!)
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  
  if (!sentences) return text; // Jika tidak ditemukan kalimat, kembalikan teks asli

  let paragraphs = [];
  let tempParagraph = [];

  sentences.forEach((sentence) => {
    tempParagraph.push(sentence.trim());

    // Setiap paragraf memiliki 2 - 4 kalimat
    if (tempParagraph.length >= 2 && (Math.random() < 0.5 || tempParagraph.length === 4)) {
      paragraphs.push(tempParagraph.join(" "));
      tempParagraph = [];
    }
  });

  // Tambahkan sisa kalimat ke paragraf terakhir
  if (tempParagraph.length) {
    paragraphs.push(tempParagraph.join(" "));
  }

  return paragraphs.join("\n\n"); // Gabungkan dengan pemisah paragraf
};


/**
 * Fungsi untuk mengecek rasio gambar dan menerapkan kelas Tailwind CSS yang sesuai
 * @param {string} imageUrl - URL gambar yang akan dicek rasionya
 * @returns {Promise<string>} - Promise yang mengembalikan kelas Tailwind CSS untuk aspect ratio
 */
export const checkImageRatioAndApplyStyle = (imageUrl) => {
    return new Promise((resolve, reject) => {
      // Buat elemen gambar baru
      const img = new Image();
      
      // Handler saat gambar berhasil dimuat
      img.onload = () => {
        // Hitung rasio (lebar / tinggi)
        const ratio = img.width / img.height;
        
        // Tentukan kelas Tailwind CSS berdasarkan rasio
        let aspectRatioClass = '';
        
        if (ratio === 1) {
          // Rasio 1:1 (kotak)
          aspectRatioClass = 'aspect-square';
        } else if (ratio >= 1.7 && ratio <= 1.8) {
          // Rasio 16:9
          aspectRatioClass = 'aspect-video';
        } else if (ratio >= 1.3 && ratio <= 1.4) {
          // Rasio 4:3
          aspectRatioClass = 'aspect-[4/3]';
        } else if (ratio >= 0.66 && ratio <= 0.67) {
          // Rasio 2:3 (portrait)
          aspectRatioClass = 'aspect-[2/3]';
        } else if (ratio >= 0.75 && ratio <= 0.76) {
          // Rasio 3:4 (portrait)
          aspectRatioClass = 'aspect-[3/4]';
        } else if (ratio > 1) {
          // Landscape dengan rasio kustom
          const widthRounded = Math.round(ratio * 100) / 100;
          aspectRatioClass = `aspect-[${widthRounded}/1]`;
        } else {
          // Portrait dengan rasio kustom
          const heightRounded = Math.round((1 / ratio) * 100) / 100;
          aspectRatioClass = `aspect-[1/${heightRounded}]`;
        }
        
        // Tambahkan kelas object-fit
        const objectFitClass = 'object-cover';
        
        // Kembalikan kelas Tailwind lengkap
        resolve(`${aspectRatioClass} ${objectFitClass}`);
      };
      
      // Handler saat terjadi error
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Mulai mengunduh gambar
      img.src = imageUrl;
      
      // Untuk mendukung gambar dari cache
      if (img.complete) {
        img.onload();
      }
    });
  };