import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  LucideHome, Search } from "lucide-react";
import MangaList from "./pages/Mangalist";
import MangaDetail from "./pages/Mangadetail";
import dogningen from "./images/Dog_ningen.png";
import ChapterReader from "./pages/chapterreader";
import About from "./pages/ABOUT";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";




function App() {
  const mangas = [
    {
      id: 1,
      title: "Dog Ningen",
      author: "Eiichiro Oda",
      rating: 4.8,
      date: "1 ay önce",
      image: dogningen,
      chapters: [ 
        "Bölüm 1: Benim hikayem", 
        "Bölüm 2: Gizemli suikast",
        "Bölüm 3: Neo,Rex'e Karş",
      ]
    },
    {
      id: 2,
      title: "One Piece",
      author: "Eiichiro Oda",
      rating: 4.9,
      date: "2 gün önce",
      image: "https://i.imgur.com/Kc94H8y.jpg",
      chapters:[
       "Bölüm 1:deneme"
      ]
    },
    {
      id: 3,
      title: "Attack on Titan",
      author: "Hajime Isayama",
      rating: 4.7,
      date: "5 gün önce",
      image: "https://i.imgur.com/lvXQjSH.jpg",
      chapters:[
        "bölüm 1: titan'a saldırı"
      ]
    },
    {
      id: 4,
      title: "Kagurabachi",
      author: "Takeru Hokazono",
      rating: 4.5,
      date: "17 Ekim 2025",
      image: "https://i.imgur.com/Wkn3tZH.jpg",
      chapters:[
        "Bölüm 1:sdsssds"
      ]
      
    },
  ];

  return (
  
  <Router>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* NAVBAR */}
      <nav className="bg-red-800 flex justify-between items-center px-8 py-4 shadow-md">
        <div className="text-2xl font-bold flex items-center gap-2">
          🔥 <span>MangaWorld</span>
        </div>

        <ul className="flex gap-6 text-lg">
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1"></li>
  <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
  <Link to="/" className="flex items-center gap-1">
    <HomeIcon size={18} />
    <span>Ana Sayfa</span>
  </Link>
</li>
<li className="hover:text-yellow-300 cursor-pointer">
  <Link to="/series">Seriler</Link>
</li>
<li className="hover:text-yellow-300 cursor-pointer">
  <Link to="/hakkinda">Hakkında</Link>
</li>

        </ul>

        <div className="w-6 h-6 cursor-pointer hover:text-yellow-300">🔍</div>
      </nav>

      {/* SAYFA GEÇİŞLERİ */}
      <Routes>
        <Route path="/" element={<MangaList mangas={mangas} />} />
        <Route path="/hakkinda" element={<About />} />
        <Route path="/" element={<MangaList mangas={mangas} />} />
        <Route path="/manga/:id" element={<MangaDetail mangas={mangas} />} />
        <Route path="/manga/:id/chapter/:chapterId" element={<ChapterReader mangas={mangas} />} />

      </Routes>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12 border-t border-gray-700">
        <p className="text-sm">
          © {new Date().getFullYear()} MangaWorld — Tüm hakları saklıdır.
        </p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="hover:text-yellow-400 transition">Facebook</a>
          <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
          <a href="#" className="hover:text-yellow-400 transition">Discord</a>
        </div>
      </footer>
    </div>
  </Router>
);
}

export default App;
