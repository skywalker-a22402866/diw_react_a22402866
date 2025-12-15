"use client";

import { useEffect, useState } from "react";

type ContadorPersonalizadoProps = {
  title: string;
};

export default function ContadorPersonalizado({
  title,
}: ContadorPersonalizadoProps) {
  const storageKey = `likes-${title}`;
  const [likes, setLikes] = useState(0);

  // Carregar do localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(storageKey);
    if (savedLikes) {
      setLikes(Number(savedLikes));
    }
  }, [storageKey]);

  // Guardar no localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, likes.toString());
  }, [likes, storageKey]);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-semibold"
    >
     {likes} Likes
    </button>
  );
}
