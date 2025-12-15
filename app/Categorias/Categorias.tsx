import { categorias } from "../data/categorias";
import CategoriaCard from "../components/CategoriaCard/CategoriaCard";

export default function CategoriasPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <CategoriaCard key={cat.slug} categoria={cat} />
        ))}
      </div>
    </section>
  );
}
