"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pokemon } from "../types/Pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      const data = await res.json();
      setPokemons(data.results);
    } catch (err) {
      console.error("Erro ao buscar Pokémons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>

      {loading && <p>Carregando Pokémons...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {pokemons.map((p, index) => (
          <Link
            key={index}
            href={`/pokemon/${index + 1 + offset}`}
            className="p-4 border rounded-xl text-center hover:bg-gray-100"
          >
            <p className="capitalize font-semibold">{p.name}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          disabled={offset === 0}
          onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setOffset((prev) => prev + 20)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
