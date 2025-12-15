import Link from "next/link";

export default function CategoriaCard({ categoria }: any) {
  return (
    <Link href={`/categorias/${categoria.slug}`}>
      <div className="border p-4 rounded text-center hover:shadow cursor-pointer">
        <img src={categoria.logo} alt={categoria.nome} className="w-24 mx-auto mb-2" />
        <h3>{categoria.nome}</h3>
      </div>
    </Link>
  );
}
