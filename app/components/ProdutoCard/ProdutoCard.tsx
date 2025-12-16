import { Product } from "@/app/models/interface";
import Image from "next/image";

interface ProdutoCardProps {
  product: Product;
}

export default function ProdutoCard({ product }: ProdutoCardProps) {
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `https://deisishop.pythonanywhere.com/produto_imagens/${product.image}`;

    //https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-1-1.png

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <img
        //src={imageUrl}
        src="https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-1-1.png"
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />
      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="font-bold mt-1">€ {product.price}</p>
    </div>
  );
}
