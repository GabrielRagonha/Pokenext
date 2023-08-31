"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  types: PokemonType[];
}

interface PokemonDetailsProps {
  params: {
    name: string;
  }
}

const PokemonDetails = ({ params: { name } }: PokemonDetailsProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        const data = await response.json();
        setPokemonData(data);
      } catch (e) {
        console.error("Error fetching pokemon data");
      }
    }

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <p>loading...</p>
  }

  const formattedId = pokemonData.id.toString().padStart(3, '0');
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`;

  return (
    <div>
      <div>
        <Link href='/'>
          <p className='text-blue-500 hover:underline'>Ícone 1</p>
        </Link>
      </div>

      <div>
        <div>
          <p className='text-capitalize'>{name}</p>

          <ul>
            {pokemonData.types.map((el, index) => (
              <li key={index}>{el.type.name}</li>
            ))}
          </ul>
        </div>

        <p>#{formattedId}</p>
      </div>

      <div className='flex items-center'>
        <img
          src={imageUrl}
          alt={name}
          className='w-64 h-64 object-contain'
        />
      </div>

      <div>
        <div className='relative w-max mx-auto h-12 grid grid-cols-4 px-[3xl] items-center bg-blue-200 overflow-hidden shadow-2xl shadow-900/20 transition' role='tablist' aria-label='tabs'>
          <button className='relative block h-10 px-6' role='tab' aria-selected='true' aria-controls='panel-1' id='tab-1' tabIndex={0}>
            <span className='text-gray-800'>About</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails;
