import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ChapterReader({ mangas }) {
  const { id, chapterId } = useParams();
  const manga = mangas.find((m) => m.id === parseInt(id));
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  const chapterKey = `${manga?.title || "unknown"}-chapter-${chapterId}`;

  // Görselleri otomatik yükle
  useEffect(() => {
    if (manga) {
      const folder = manga.title.toLowerCase().replace(/\s+/g, "-");
      const basePath = `/images/${folder}/chapter${chapterId}`;
      const tempImages = [];

      for (let i = 1; i <= 100; i++) {
        const imgPath = `${basePath}/${i}.webp`;
        const img = new Image();
        img.src = imgPath;
        img.onload = () => {
          tempImages.push(imgPath);
          setImages([...tempImages]);
        };
      }
    }
  }, [manga, chapterId]);

  // LocalStorage'dan yorumları yükle
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(chapterKey)) || [];
    setComments(savedComments);
  }, [chapterKey]);

  // Yeni yorum ekle
  const addComment = () => {
    if (newComment.trim() === "" || username.trim() === "") return;
    const newEntry = { username, text: newComment };
    const updated = [...comments, newEntry];
    setComments(updated);
    localStorage.setItem(chapterKey, JSON.stringify(updated));
    setNewComment("");
  };

  if (!manga)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Manga bulunamadı 😢</h1>
        <Link to="/" className="text-yellow-400 hover:underline">
          Ana sayfaya dön
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-yellow-400 text-2xl font-bold mb-4 text-center">
          {manga.title} — {manga.chapters[chapterId - 1]}
        </h1>

        {/* 📖 Görseller */}
        {images.length > 0 ? (
          images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Sayfa ${index + 1}`}
              className="w-full mb-4 rounded-lg shadow-lg"
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">Görseller yükleniyor...</p>
        )}

        {/* 🔁 Bölüm Geçişi */}
        <div className="flex justify-between items-center mt-8">
          {parseInt(chapterId) > 1 ? (
            <Link
              to={`/manga/${id}/chapter/${parseInt(chapterId) - 1}`}
              className="bg-gray-700 hover:bg-gray-600 text-yellow-300 font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              ← Önceki Bölüm
            </Link>
          ) : (
            <div />
          )}

          {parseInt(chapterId) < manga.chapters.length ? (
            <Link
              to={`/manga/${id}/chapter/${parseInt(chapterId) + 1}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Sonraki Bölüm →
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* 💬 Yorum Bölümü */}
        <div className="mt-10 bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-yellow-400 text-xl font-bold mb-3 text-center">
            💬 Yorumlar
          </h2>

          <div className="space-y-2 mb-4">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-center">
                Henüz yorum yapılmamış. İlk sen yaz!
              </p>
            ) : (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-2 rounded-md border border-gray-600"
                >
                  <p className="text-yellow-400 font-semibold">
                    {comment.username}
                  </p>
                  <p className="text-white">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          {/* 🧑 Kullanıcı adı */}
          <input
            type="text"
            placeholder="Kullanıcı adınız..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white mb-2"
          />

          {/* ✍️ Yorum alanı */}
          <textarea
            className="w-full p-2 rounded-md bg-gray-700 text-white mb-2"
            rows="3"
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={addComment}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
          >
            Gönder
          </button>
        </div>

        {/* 🏠 Ana Sayfaya Dön */}
        <div className="fixed bottom-6 right-6">
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition"
          >
            🏠 Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChapterReader;
