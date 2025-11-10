import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">MangaWorld'e Hoş Geldin!</h1>
      <p className="text-lg text-gray-300 max-w-2xl text-center">
        En sevdiğin mangaları keşfet, oku ve favorilerine ekle. 
        Her hafta yeni bölümlerle birlikte güncellenen koleksiyonumuzla, 
        senin için en iyi manga deneyimini sunuyoruz. 📚🔥
      </p>
    </div>
  );
}

export default Home;
