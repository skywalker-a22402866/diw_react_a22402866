"use client";

import { Pais, Product } from "@/app/models/interface";
import Link from "next/link";
import Image from "next/image";


interface Props {
  pais: Pais;
  onAdd?: (p: Pais) => void;
  onRemove?: (id: number) => void;
  inCart?: boolean;
}

export default function PaisCard({
  pais,
  onAdd,
  onRemove,
  inCart
}: Props) {
  
  return (
    <div className="border rounded p-4 shadow relative">


      <h3 className="font-semibold mt-2">{pais.name}</h3>
      <p className="font-bold">€ {pais.populacao}</p>
      <p className="font-bold">€ {pais.area}</p>

      <div className="flex gap-2 mt-2">
        <Link
          href={`/pais/${pais.name}`}
          className="text-blue-500 underline"
        >
          +info
        </Link>
      </div>
    </div>
  );
}
