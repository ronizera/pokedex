"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type PokemonDetail = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
};

export default function PokemonDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error("Erro ao carregar Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPokemon();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!pokemon) return <p className="text-center mt-10">Nenhum Pokémon encontrado.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Voltar
      </button>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-40 h-40"
      />
      <h1 className="text-3xl font-bold capitalize mt-4">{pokemon.name}</h1>

      <div className="mt-4">
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
        <div className="mt-2">
          <p>Tipos:</p>
          <ul>
            {pokemon.types.map((t, i) => (
              <li key={i} className="capitalize">
                {t.type.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
