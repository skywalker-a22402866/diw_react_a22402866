"use client";

import { useEffect, useState } from "react";

export default function ContadorPage() {
  //  Estados
  const [contador, setContador] = useState<number>(0);
  const [historico, setHistorico] = useState<number[]>([]);

  //  Carregar do localStorage
  useEffect(() => {
    const valorGuardado = localStorage.getItem("contador");
    const historicoGuardado = localStorage.getItem("contador-historico");

    if (valorGuardado) setContador(Number(valorGuardado));
    if (historicoGuardado) setHistorico(JSON.parse(historicoGuardado));
  }, []);

  //  Guardar no localStorage
  useEffect(() => {
    localStorage.setItem("contador", contador.toString());
    localStorage.setItem("contador-historico", JSON.stringify(historico));
  }, [contador, historico]);

  //  Atualiza o contador respeitando limites
  const atualizarContador = (novoValor: number) => {
    if (novoValor < 0 || novoValor > 10) return;

    setContador(novoValor);
    setHistorico((prev) => [...prev, novoValor]);
  };

  //  Cor dinâmica
  const cor =
    contador <= 3
      ? "text-red-600"
      : contador <= 7
      ? "text-yellow-600"
      : "text-green-600";

  //  Renderização
  return (
    <section className="bg-blue-300 p-4 pb-6 mt-6 rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Contador</h2>

      <p className="mb-4">
        Contador vai em{" "}
        <span className={`font-bold text-2xl ${cor}`}>
          {contador}
        </span>
        !
      </p>

      <div className="flex gap-2 mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => atualizarContador(contador + 1)}
        >
          Aumentar
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => atualizarContador(contador - 1)}
        >
          Diminuir
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setContador(0);
            setHistorico([0]);
          }}
        >
          Reset
        </button>
      </div>

      <h3 className="font-semibold">Histórico</h3>
      <ul className="list-disc list-inside">
        {historico.map((valor, index) => (
          <li key={index}>{valor}</li>
        ))}
      </ul>
    </section>
  );
}
