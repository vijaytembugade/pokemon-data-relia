import React, { useCallback } from 'react';
import { usePokenmonData } from '../../contexts/PokemonDataContext';
import { createUseStyles } from 'react-jss';

const SearchPokemon = () => {
  const classes = useStyles();
  const { searchInput, setSearchInput } = usePokenmonData();

  const handleOnChange = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <input
          placeholder="Search Pokemon..."
          className={classes.inputField}
          value={searchInput}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default React.memo(SearchPokemon);

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '2rem 4rem 0 4rem',
    },
    inputField: {
      height: '1.8rem',
      outline: 'none',
      color: '#333',
      fontSize: '1.3rem',
      padding: '0.4rem',
      width: '500px',
      minWidth: '200px',
    },
  },
  { name: 'ListPage' }
);
