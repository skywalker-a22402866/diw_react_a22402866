"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import ProdutoDetalhe from "../../components/ProdutoDetalhe/ProdutoDetalhe";
import { Product } from "../../models/interface";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutoDetalhePage() {
  const params = useParams();
  const { id } = params;

  const { data: product, error } = useSWR<Product>(
    id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
    fetcher
  );

  if (error) return <div>Erro ao carregar o produto.</div>;
  if (!product) return <div>Carregando...</div>;

  return <ProdutoDetalhe product={product} />;
}
