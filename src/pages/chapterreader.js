import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ChapterReader({ mangas }) {
  const { id, chapterId } = useParams();
  const manga = mangas.find((m) => m.id === parseInt(id));
  const [images, setImages] = useState([]);

  // ✅ GÖRSELLERİ OTOMATİK YÜKLE (404 DURDURMA İLE)
  useEffect(() => {
    const loadImages = async () => {
      
      if (!manga) return;

      const folderPath = `/images/${manga.imageFolder}/chapter${chapterId}/`;
      console.log("Yükleme denemesi:", folderPath);
      const foundImages = [];

      for (let i = 1; i <= 100; i++) {
        const url = `${folderPath}${i}.webp`;
        const img = new Image();

        const loadPromise = new Promise((resolve) => {
          img.onload = () => {
            foundImages.push(url);
            resolve();
          };
          img.onerror = () => resolve("stop");
        });

        img.src = url;
        const result = await loadPromise;
        if (result === "stop") break; // 404 geldiğinde dur
      }

      foundImages.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0);
        return numA - numB;
      });

      setImages(foundImages);
    };

    loadImages();
  }, [chapterId, manga]);

  // 💬 YORUM SİSTEMİ (LocalStorage)
  const chapterKey = `${manga?.title}-chapter-${chapterId}`;
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(chapterKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!username.trim() || !newComment.trim()) return;
    const updated = [...comments, { username, text: newComment }];
    setComments(updated);
    localStorage.setItem(chapterKey, JSON.stringify(updated));
    setNewComment("");
  };

  if (!manga) {
    return (
      <div className="text-center text-white mt-10">
        <h1 className="text-2xl font-bold">Manga bulunamadı 😢</h1>
        <Link to="/" className="text-yellow-400 underline">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      {/* Başlık */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        {manga.title} — Bölüm {chapterId}
      </h1>

      {/* GÖRSELLER */}
      <div className="max-w-3xl mx-auto">
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
          <p className="text-gray-400 text-center">Görseller yükleniyor...</p>
        )}
      </div>

      {/* BÖLÜM GEÇİŞLERİ */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mt-10">
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

      {/* 💬 YORUMLAR */}
      <div className="max-w-3xl mx-auto mt-10 bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-yellow-400 mb-2">💬 Yorumlar</h2>

        {comments.length === 0 ? (
          <p className="text-gray-400 mb-3">Henüz yorum yok, ilk sen yaz!</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="bg-gray-700 p-2 my-2 rounded-lg">
              <p className="text-yellow-300 font-semibold">{c.username}</p>
              <p>{c.text}</p>
            </div>
          ))
        )}

        <input
          type="text"
          placeholder="Kullanıcı adın..."
          className="w-full bg-gray-700 text-white p-2 rounded mb-2 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Yorum yaz..."
          className="w-full bg-gray-700 text-white p-2 rounded mb-2 outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg transition"
        >
          Gönder
        </button>
      </div>

      {/* 🏠 ANA SAYFA BUTONU */}
      <div className="fixed bottom-8 right-8">
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition"
        >
          🏠 Ana Sayfaya
        </Link>
      </div>
    </div>
  );
}

export default ChapterReader;
