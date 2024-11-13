import { createContext, useContext, useMemo, useState } from 'react';
import { Pokemon, useGetPokemons } from '../hooks/useGetPokemons';

type ProviderPropTyoes = {
  children: React.ReactChild;
};

const PokemonDataContext = createContext<{
  pokemons: Pokemon[] | [];
  loading: boolean;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}>({ pokemons: [], loading: false, searchInput: '', setSearchInput: () => '' });

const PokemonDataProvider = ({ children }: ProviderPropTyoes) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const { pokemons, loading } = useGetPokemons();

  const filterdPokemon = useMemo<Pokemon[]>(() => {
    if (searchInput !== null || searchInput !== '') {
      const pkmnsList = pokemons.filter((pkmn) => {
        if (pkmn?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      return pkmnsList;
    }
    return pokemons;
  }, [searchInput, pokemons]);

  return (
    <PokemonDataContext.Provider
      value={{ pokemons: filterdPokemon, loading, searchInput, setSearchInput }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};

const usePokenmonData = () => {
  const context = useContext(PokemonDataContext);
  return context;
};

export { PokemonDataProvider, usePokenmonData };
