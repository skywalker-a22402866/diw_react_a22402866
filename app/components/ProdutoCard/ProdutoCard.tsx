import Link from "next/link";

export default function ProdutoCard({ produto }: any) {
  return (
    <Link href={`/produtos/${produto.id}`}>
      <div className="border p-4 rounded hover:shadow cursor-pointer">
        <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover" />
        <h3 className="mt-2 font-semibold">{produto.nome}</h3>
      </div>
    </Link>
  );
}
