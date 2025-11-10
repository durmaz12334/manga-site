import React from "react";
import { useParams, Link } from "react-router-dom";

function ChapterReader({ mangas }) {
  const { id, chapterId } = useParams();
  const manga = mangas.find((m) => m.id === parseInt(id));
  const chapterTitle = manga ? manga.chapters[parseInt(chapterId) - 1] : null;

  if (!manga || !chapterTitle) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Bölüm bulunamadı 😢</h1>
        <Link to={`/manga/${id}`} className="text-yellow-400 hover:underline">
          ← Geri dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        {manga.title} — {chapterTitle}
      </h1>

      <p className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-gray-300 leading-relaxed">
        Bu, <strong>{chapterTitle}</strong> adlı bölümün örnek içeriğidir. Gerçek projede burada manga görselleri veya sayfalar yer alacaktır.
      </p>

      <img
        src="https://placehold.co/600x800?text=Manga+Page+1"
        alt="manga page"
        className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />

      <img
        src="https://placehold.co/600x800?text=Manga+Page+2"
        alt="manga page"
        className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-lg"
      />

      <div className="flex justify-between mt-6">
        {parseInt(chapterId) > 1 && (
          <Link
            to={`/manga/${id}/chapter/${parseInt(chapterId) - 1}`}
            className="text-yellow-400 hover:underline"
          >
            ← Önceki Bölüm
          </Link>
        )}

        {parseInt(chapterId) < manga.chapters.length && (
          <Link
            to={`/manga/${id}/chapter/${parseInt(chapterId) + 1}`}
            className="text-yellow-400 hover:underline ml-auto"
          >
            Sonraki Bölüm →
          </Link>
        )}
      </div>
    </div>
  );
}

export default ChapterReader;
