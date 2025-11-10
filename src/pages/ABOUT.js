import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Hakkında</h1>
      <p className="text-lg text-gray-300 max-w-3xl text-center leading-relaxed">
        MangaWorld, manga severler için tasarlanmış bir platformdur. 
        Amacımız, kullanıcıların istedikleri mangaları kolayca bulabilmesi, 
        yeni seriler keşfetmesi ve keyifli bir okuma deneyimi yaşamasıdır. 🌙
      </p>
      <p className="text-gray-400 mt-6 text-center">
        © {new Date().getFullYear()} MangaWorld. Tüm hakları saklıdır.
      </p>
    </div>
  );
}

export default About;
