import React, { useState } from "react";
import { Link } from "react-router-dom";

function MangaList({ mangas }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredManga = mangas.filter((manga) =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      {/* Arama Çubuğu */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Manga ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 md:w-1/2 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Başlık */}
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8 flex justify-center items-center gap-2">
        📚 Yeni Bölümler
      </h2>

      {/* Manga Kartları */}
      <div className="flex flex-wrap justify-start gap-4 pl-8">
        {filteredManga.map((manga) => (
          <div
            key={manga.id}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300 hover:shadow-yellow-500/20 border border-gray-700 hover:border-yellow-400 flex flex-col"
            style={{ width:"170px", minHeight:"310px"}}
          >
            <Link to={`/manga/${manga.id}`} className="block">
              <img
                src={manga.image}
                alt={manga.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-bold text-yellow-400">
                  {manga.title}
                </h2>
                <p className="text-gray-400 text-sm mb-2">{manga.author}</p>
                <p className="text-yellow-400 text-sm">
                  ⭐ {manga.rating} — <span className="text-gray-400">{manga.date}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangaList;
