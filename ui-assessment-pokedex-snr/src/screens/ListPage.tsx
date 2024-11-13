import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';
import SearchPokemon from '../components/SearchPokemon';
import PokemonDetailsModal from '../components/PokemonDetailsModal/PokemonDetailsModal';

type ListPageProps = {
  isModalOpen?: boolean;
};

export const ListPage = (props: ListPageProps) => {
  const { isModalOpen = false } = props;
  const classes = useStyles();

  const handleModalState = (state: any) => {};

  return (
    <div className={classes.root}>
      <SearchPokemon />
      {isModalOpen && (
        <PokemonDetailsModal
          isOpen={isModalOpen}
          setModalState={handleModalState}
        />
      )}
      <PokemonList />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
