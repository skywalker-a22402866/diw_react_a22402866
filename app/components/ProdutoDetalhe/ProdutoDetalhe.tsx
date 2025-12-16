"use client";

import Image from "next/image";
import { Product } from "@/app/models/interface";
import { useFavorites } from "@/app/hooks/useFavorites";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProdutoDetalhe({ product }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="p-6">

      <button
        onClick={() => toggleFavorite(product.id)}
        className="text-3xl mb-4"
      >
        {isFavorite(product.id) ? "❤️ Favorito" : "🤍 Marcar como favorito"}
      </button>

      <img
        src={
          product.image.startsWith("http")
            ? product.image
            : `https://deisishop.pythonanywhere.com${product.image}`
        }
        alt={product.title}
        className="h-64 w-full object-contain mb-4"
      />

      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="font-bold mt-2">€ {product.price}</p>
      <p className="mt-1">
        ⭐ {product.rating.rate} ({product.rating.count})
      </p>

      <Link href="/produtos" className="text-blue-500 underline mt-4 block">
        ← Voltar aos produtos
      </Link>
    </div>
  );
}
