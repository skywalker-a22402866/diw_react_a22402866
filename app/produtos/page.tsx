"use client";

import useSWR from "swr";
import { Product } from "../models/interface";
import { fetcher } from "../lib/fetcher";


export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products",
    fetcher
  );

  

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 shadow hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain"
            />

            <h3 className="font-semibold mt-2">
              {product.title}
            </h3>

            <p className="text-sm text-gray-600">
              {product.category}
            </p>

            <p className="font-bold mt-1">
              € {product.price}
            </p>

            <p className="text-sm">
              ⭐ {product.rating.rate} ({product.rating.count})
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

