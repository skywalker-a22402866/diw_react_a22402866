"use client";

import { Product } from "@/app/models/interface";
import Link from "next/link";
import Image from "next/image";



interface ProdutoCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  onRemove?: (id: number) => void;
  inCart?: boolean;
}

export default function ProdutoCard({ product, onAdd, onRemove, inCart }: ProdutoCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg flex flex-col items-center">
      <img src={product.image.startsWith("http") ? product.image : `https://deisishop.pythonanywhere.com${product.image}`}
      alt={product.title} 
      className="h-40 object-contain" />
      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="font-bold mt-1">€ {product.price}</p>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-sm">
        ⭐ {product.rating.rate} ({product.rating.count})
      </p>

      {/* Botão +info para abrir detalhes do produto */}
      <Link
        href={`/produtos/${product.id}`}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        +Info
      </Link>

      {/* Botão para adicionar/remover do carrinho */}
      {inCart ? (
        <button
          onClick={() => onRemove && onRemove(product.id)}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Remover do Carrinho
        </button>
      ) : (
        <button
          onClick={() => onAdd && onAdd(product)}
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Adicionar ao Carrinho
        </button>
      )}
    </div>
  );
}

