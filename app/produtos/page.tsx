"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Product } from "../models/interface";
import ProdutoCard from "../components/ProdutoCard/ProdutoCard";


const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutosPage() {
  const { data: products, error } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products",
    fetcher
  );

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("nome-asc");
  const [cart, setCart] = useState<Product[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!products) return;
    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "nome-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nome-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "preco-asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "preco-desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }

    setFilteredData(filtered);
  }, [search, sortBy, products]);

  const handleAddToCart = (product: Product) => {
    if (!cart.find(item => item.id === product.id)) setCart([...cart, product]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleBuy = async () => {
    if (cart.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    const payload = {
      products: cart.map(p => ({ id: p.id, price: Number(p.price) })),
      student: isStudent,
      coupon: coupon,
    };

    try {
      const response = await fetch("https://deisishop.pythonanywhere.com/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao realizar a compra");

      const data = await response.json();
      alert(`Compra realizada com sucesso! Pedido nº ${data.orderId}`);

      // Limpar carrinho após compra
      setCart([]);
      localStorage.removeItem("cart");
      setCoupon("");
      setIsStudent(false);
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  };

  if (error) return <div>Erro ao carregar produtos</div>;
  if (!products) return <div>Carregando...</div>;

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {/* Pesquisa e Ordenação */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-start">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
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
          <option value="preco-asc">Preço ↑</option>
          <option value="preco-desc">Preço ↓</option>
        </select>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.map(p => (
          <ProdutoCard
            key={p.id}
            product={p}
            onAdd={handleAddToCart}
            inCart={!!cart.find(item => item.id === p.id)}
          />
        ))}
      </div>

      {/* Carrinho */}
      <h2 className="text-xl font-bold mt-8 mb-2">Carrinho</h2>
      {cart.length === 0 ? (
        <p>Nenhum produto no carrinho.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cart.map(p => (
              <ProdutoCard
                key={p.id}
                product={p}
                onRemove={handleRemoveFromCart}
                inCart={true}
              />
            ))}
          </div>
          <p className="mt-4 font-bold text-lg">Total: € {totalPrice.toFixed(2)}</p>

          {/* Opções de compra */}
          <div className="mt-4 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isStudent}
                onChange={e => setIsStudent(e.target.checked)}
              />
              Sou estudante DEISI
            </label>

            <input
              type="text"
              placeholder="Cupão de desconto"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              className="border rounded px-2 py-1"
            />

            <button
              onClick={handleBuy}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Comprar
            </button>
          </div>
        </>
      )}
    </section>
  );
}
