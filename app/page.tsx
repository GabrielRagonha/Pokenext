"use client";

import PokemonList from "@/components/pokemonList/page";
import { Pokemon } from "@/types";
import { useEffect, useState } from "react"

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const { results } = await response.json();
        const pokemonList = results.map((pokemon: Pokemon) => {
          const id = pokemon.url.split("/")[6];
          const formatedId = id.toString().padStart(3, '0');
          return {
            id: id,
            name: pokemon.name,
            image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatedId}.png`
          };
        }); 

        setPokemons(pokemonList);
        setLoading(false);
      } catch(e) {
        console.error("Error fetching pokemon data");
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [])

  return (
    <main>
      {loading ? <p>Loading...</p> : <PokemonList pokemons={pokemons} />}
    </main>
  )
}
