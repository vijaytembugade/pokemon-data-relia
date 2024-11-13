import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type PokemonDimension = {
  minimum: string;
  maximum: string;
};

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

export const GET_POKEMONS_BY_ID = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonById = (id?: string, name?: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS_BY_ID, {
    variables: {
      id: id,
      name: name,
    },
  });

  const pokemonDetails: Pokemon = useMemo(() => data?.pokemon || [], [data]);

  //   const pokemonOptions: PokemonOption[] = useMemo(
  //     () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
  //     [pokemons]
  //   );

  return {
    pokemonDetails,
    ...queryRes,
  };
};
