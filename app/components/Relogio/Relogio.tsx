"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // limpeza do intervalo
    return () => clearInterval(timer);
  }, []);

  const formatarHora = (data: Date) =>
    data.toLocaleTimeString("pt-PT");

  return (
    <span className="font-mono">
      {formatarHora(hora)}
    </span>
  );
}
