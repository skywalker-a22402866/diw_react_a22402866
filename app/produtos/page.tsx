import { produtos } from "../data/produtos";
import ProdutoCard from "../components/ProdutoCard/ProdutoCard";

export default function ProdutosPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Produtos DEISIshop</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  );
}
