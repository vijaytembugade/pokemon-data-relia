import React from 'react';
import { createUseStyles } from 'react-jss';
import PokemonCard from '../PokemonCard/Pokemoncard';
import { usePokenmonData } from '../../contexts/PokemonDataContext';

export const PokemonList = React.memo(() => {
  const classes = useStyles();
  const { loading, pokemons } = usePokenmonData();

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      <div className={classes.gridContainer}>
        {pokemons?.map((pkmn) => (
          <div className={classes.gridItem} key={pkmn.id}>
            <PokemonCard
              id={pkmn?.id}
              name={pkmn?.name}
              image={pkmn?.image}
              number={pkmn?.number}
              types={pkmn?.types}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 250px)',
      padding: '10px',
    },
    gridItem: {
      padding: '20px',
      textAlign: 'center',
    },
  },
  { name: 'PokemonList' }
);
