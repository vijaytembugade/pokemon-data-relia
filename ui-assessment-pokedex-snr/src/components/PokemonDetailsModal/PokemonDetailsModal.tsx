import React, { useCallback, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonById } from '../../hooks/useGetPokemonById';

type ModalProps = {
  isOpen: boolean;
  setModalState: (state: boolean) => void;
};

const PokemonDetailsModal = (props: ModalProps) => {
  const classes = useStyles();
  const { isOpen } = props;
  const navigate = useNavigate();
  const { id, name } = useParams();
  const { pokemonDetails, loading } = useGetPokemonById(id, name);

  const handleClose = useCallback(() => {
    navigate('/pokemon');
  }, [navigate]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  console.log(pokemonDetails, 'pokemon details');

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.setAttribute('open', 'true');
    } else {
      dialogRef.current?.setAttribute('open', 'false');
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className={classes.overlay} onClick={handleClose} />}

      <dialog className={classes.dialog} ref={dialogRef}>
        {loading ? (
          <h3 className={classes.detail}>Getting details ...</h3>
        ) : (
          <div className={classes.card}>
            <Link to="/pokemon" className={classes.close}>
              X
            </Link>
            <h2 className={classes.title}>
              {pokemonDetails?.name} (#{pokemonDetails?.number})
            </h2>
            <img
              src={pokemonDetails?.image}
              alt={pokemonDetails?.name}
              className={classes.image}
            />
            <p className={classes.detail}>
              <strong>Classification:</strong> {pokemonDetails?.classification}
            </p>
            <p className={classes.detail}>
              <strong>Types:</strong> {pokemonDetails?.types?.join(', ')}
            </p>
            <p className={classes.detail}>
              <strong>Weight:</strong> {pokemonDetails?.weight?.minimum} -{' '}
              {pokemonDetails?.weight?.maximum}
            </p>
            <p className={classes.detail}>
              <strong>Height:</strong> {pokemonDetails?.height?.minimum} -{' '}
              {pokemonDetails?.height?.maximum}
            </p>
            <p className={classes.detail}>
              <strong>Resistant to:</strong>{' '}
              {pokemonDetails?.resistant?.join(', ')}
            </p>
            <p className={classes.detail}>
              <strong>Weak against:</strong>{' '}
              {pokemonDetails?.weaknesses?.join(', ')}
            </p>
            <p className={classes.detail}>
              <strong>Flee Rate:</strong> {pokemonDetails?.fleeRate}
            </p>
            <p className={classes.detail}>
              <strong>Max CP:</strong> {pokemonDetails?.maxCP}
            </p>
            <p className={classes.detail}>
              <strong>Max HP:</strong> {pokemonDetails?.maxHP}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
};
export default React.memo(PokemonDetailsModal);

const useStyles = createUseStyles({
  dialog: {
    padding: '0.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f7f7f7',
    position: 'fixed',
    zIndex: 1000,
    top: '10%',
    color: '#333',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  close: {
    color: '#333',
    position: 'absolute',
    top: '1%',
    right: '2%',
    '&:hover': {
      color: 'red',
    },
  },
  card: {
    position: 'relative',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '400px',
    minWidth: '300px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    maxWidth: '250px',
    maxHeight: '250px',
    borderRadius: '10px',
  },
  title: {
    fontSize: '1.3em',
    margin: '10px 0',
    color: '#333',
  },
  detail: {
    margin: '8px 0',
    color: '#333',
    '& strong': {
      color: '#333',
    },
  },
});
