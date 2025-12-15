"use client";

import { useState } from "react";

export default function InputPage() {
  //  Estados
  const [texto, setTexto] = useState("");
  const [tecnologia, setTecnologia] = useState("React");

  const [tarefas, setTarefas] = useState<string[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  //  Adicionar / Editar tarefa
  const adicionarTarefa = () => {
    if (!novaTarefa.trim()) return;

    if (editIndex !== null) {
      const copia = [...tarefas];
      copia[editIndex] = novaTarefa;
      setTarefas(copia);
      setEditIndex(null);
    } else {
      setTarefas([...tarefas, novaTarefa]);
    }

    setNovaTarefa("");
  };

  //  Apagar tarefa
  const apagarTarefa = (index: number) => {
    setTarefas(tarefas.filter((_, i) => i !== index));
  };

  //  Editar tarefa
  const editarTarefa = (index: number) => {
    setNovaTarefa(tarefas[index]);
    setEditIndex(index);
  };

  return (
    <section className="max-w-md mx-auto mt-6 p-4 bg-grey-100 rounded-xl space-y-6 text-black">
      <h1 className="text-xl font-bold">Página Input</h1>

      {/* 🔤 Input de texto */}
      <div>
        <label className="font-semibold">Texto</label>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Digite algo..."
        />

        <p className="mt-2">
          Texto digitado: <b>{texto}</b>
        </p>
      </div>

      {/*  Seletor */}
      <div>
        <label className="font-semibold">Tecnologia</label>
        <select
          value={tecnologia}
          onChange={(e) => setTecnologia(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        >
          <option>React</option>
          <option>Next.js</option>
          <option>Node.js</option>
          <option>TypeScript</option>
          <option>Python</option>
        </select>

        <p className="mt-2">
          Selecionado: <b>{tecnologia}</b>
        </p>
      </div>

      {/*  Lista de tarefas */}
      <div>
        <label className="font-semibold">Lista de Tarefas</label>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Nova tarefa"
          />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-500 hover:bg-blue-700 text-black px-4 rounded"
          >
            {editIndex !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>

        <ul className="mt-3 space-y-2">
          {tarefas.map((tarefa, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-black text-white p-2 rounded shadow"
            >
              <span>{tarefa}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editarTarefa(index)}
                  className="text-yellow-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => apagarTarefa(index)}
                  className="text-red-600 hover:underline"
                >
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}