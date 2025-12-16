// components/ProdutoDetalhe.tsx
"use client";

import { Product } from "@/app/models/interface";
import { useRouter } from "next/navigation";

interface ProdutoDetalheProps {
  product: Product;
}

export default function ProdutoDetalhe({ product }: ProdutoDetalheProps) {
  const router = useRouter();

  const handleVoltar = () => {
    router.push("/produtos"); // volta para a lista de produtos
  };

  return (
    <div className="p-4 max-w-2xl mx-auto border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <img
        src={
          product.image.startsWith("http")
            ? product.image
            : `https://deisishop.pythonanywhere.com${product.image}`
        }
        alt={product.title}
        className="h-64 w-full object-contain mb-4"
      />

      <p className="mb-2"><strong>Preço:</strong> €{product.price}</p>
      <p className="mb-2"><strong>Categoria:</strong> {product.category}</p>
      <p className="mb-2"><strong>Descrição:</strong> {product.description}</p>
      <p className="mb-2">
        <strong>Rating:</strong> ⭐ {product.rating.rate} ({product.rating.count})
      </p>

      <button
        onClick={handleVoltar}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Voltar à lista
      </button>
    </div>
  );
}
