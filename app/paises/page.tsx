"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Pais } from "../models/interface";
import PaisCard from "../components/PaisCard/PaisCard";


const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PaisesPage() {
  const { data: pais, error } = useSWR<Pais[]>(
    "@/app/data/paises.json",
    fetcher
  );

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Pais[]>([]);
  const [sortBy, setSortBy] = useState("nome-asc");

  useEffect(() => {
    if (!pais) return;
    let filtered = pais.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "nome-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nome-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "populacao-asc":
        filtered.sort((a, b) => Number(a.populacao) - Number(b.populacao));
        break;
      case "populacao-desc":
        filtered.sort((a, b) => Number(b.populacao) - Number(a.populacao));
        break;
    }

    setFilteredData(filtered);
  }, [search, sortBy, pais]);

  

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Paises</h1>

      {/* Pesquisa e Ordenação */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-start">
        <input
          type="text"
          placeholder="Pesquisar paises..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="nome-asc">Nome ↑</option>
          <option value="nome-desc">Nome ↓</option>
          <option value="preco-asc">População ↑</option>
          <option value="preco-desc">População ↓</option>
        </select>
      </div>
          
      
    </section>
  );
}
