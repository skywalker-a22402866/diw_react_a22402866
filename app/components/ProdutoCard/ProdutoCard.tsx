"use client";

import { Product } from "@/app/models/interface";
import Link from "next/link";
import Image from "next/image";

import { useFavorites } from "@/app/hooks/useFavorites";

interface Props {
  product: Product;
  onAdd?: (p: Product) => void;
  onRemove?: (id: number) => void;
  inCart?: boolean;
}

export default function ProdutoCard({
  product,
  onAdd,
  onRemove,
  inCart
}: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="border rounded p-4 shadow relative">

      {/* ❤️ FAVORITO */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-2 right-2 text-2xl"
      >
        {isFavorite(product.id) ? "❤️" : "🤍"}
      </button>

      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto object-contain"
      />

      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="font-bold">€ {product.price}</p>

      <div className="flex gap-2 mt-2">
        <Link
          href={`/produtos/${product.id}`}
          className="text-blue-500 underline"
        >
          +info
        </Link>

        {!inCart && onAdd && (
          <button
            onClick={() => onAdd(product)}
            className="bg-green-500 text-white px-2 rounded"
          >
            Adicionar
          </button>
        )}

        {inCart && onRemove && (
          <button
            onClick={() => onRemove(product.id)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
}