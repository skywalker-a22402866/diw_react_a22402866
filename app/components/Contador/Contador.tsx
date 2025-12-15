"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState<number>(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    const storedValor = localStorage.getItem("contador");
    const storedHistorico = localStorage.getItem("contador-historico");

    if (storedValor) setValor(Number(storedValor));
    if (storedHistorico) setHistorico(JSON.parse(storedHistorico));
  }, []);

  // Guardar no localStorage
  useEffect(() => {
    localStorage.setItem("contador", valor.toString());
    localStorage.setItem("contador-historico", JSON.stringify(historico));
  }, [valor, historico]);

  // Atualizar valor respeitando limites
  const atualizarValor = (novoValor: number) => {
    if (novoValor < 0 || novoValor > 10) return;

    setValor(novoValor);
    setHistorico(prev => [...prev, novoValor]);
  };

  const cor =
    valor <= 3 ? "red" : valor <= 7 ? "orange" : "green";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contador</h1>

      <h2 style={{ color: cor }}>{valor}</h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => atualizarValor(valor + 1)}>
          Incrementar
        </button>

        <button onClick={() => atualizarValor(valor - 1)}>
          Decrementar
        </button>

        <button onClick={() => {
          setValor(0);
          setHistorico([0]);
        }}>
          Reset
        </button>
      </div>

      <h3>Histórico</h3>
      <ul>
        {historico.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
