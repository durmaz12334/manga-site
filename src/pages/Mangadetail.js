import React from "react";
import { useParams, Link } from "react-router-dom";


function MangaDetail({ mangas }) {
  // URL'deki :id parametresini alıyoruz
  const { id } = useParams();

  // Gelen id'yi listeyle karşılaştırıyoruz
  const manga = mangas.find((m) => m.id === parseInt(id));

  if (!manga)
    return (
      <p className="text-center text-red-400 mt-10">
        Manga bulunamadı! (id: {id})
      </p>
    );

  return (
    <div className="p-8 text-white">
      <Link to="/" className="text-yellow-400 hover:underline">
        ← Geri Dön
      </Link>

      <div className="flex flex-col md:flex-row mt-6 gap-6">
        <img
          src={manga.image}
          alt={manga.title}
          className="w-64 rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            {manga.title}
          </h1>
          <p className="text-gray-400 mb-1">Yazar: {manga.author}</p>
          <p className="text-yellow-400 mb-1">Puan: {manga.rating} ⭐</p>
          <p className="text-gray-400 mb-4">Yayın Tarihi: {manga.date}</p>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bu alana
            manganın açıklamasını veya kısa özetini yazabilirsin.
          </p>
          {/* Bölüm Listesi */}
<div className="mt-8">
  <h2 className="text-2xl font-bold text-yellow-400 mb-4">📚 Bölümler</h2>
  <ul className="space-y-2">
     {manga.chapters.map((chapter, index) => (
        <li
          key={index}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer transition"
        >
        <Link 
         to={`/manga/${manga.id}/chapter/${index + 1}`}
         className="block w-full text-white"
         >
          {chapter}
       </Link>
        </li>
      ))}
    </ul>
  </div>

    
  
</div>

        </div>
      </div>
  
    )
}

export default MangaDetail;
