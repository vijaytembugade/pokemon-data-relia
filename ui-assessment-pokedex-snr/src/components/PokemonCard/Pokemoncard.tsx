import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { Link } from 'react-router-dom';

const PokemonCard = (props: Pokemon) => {
  const classes = useStyles();
  const { image, name, number, types, id } = props;

  return (
    <div className={classes.card}>
      <Link to={`/pokemon/${id}/${name}`}>
        <img
          height={150}
          width={150}
          loading="lazy"
          src={`${image}`}
          alt={name}
          className={classes.image}
        />
      </Link>
      <div className={classes.name}>
        <Link to={`/pokemon/${id}/${name}`}>{name}</Link>
      </div>
      <div className={classes.number}>{number}</div>
      <div className={classes.tags}>
        {types?.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PokemonCard);

const useStyles = createUseStyles(
  {
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '180px',
      maxWidth: '200px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      minHeight: '250px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
      },
    },
    image: {
      width: '100%',
      borderRadius: '8px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    name: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      margin: '10px 0',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    number: {
      fontSize: '1em',
      color: '#666',
      margin: '5px 0',
    },
    tags: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '10px',
      '& span': {
        color: '#333',
        background: '#e0e0e0',
        borderRadius: '4px',
        padding: '5px 10px',
        margin: '2px',
        fontSize: '0.8em',
      },
    },
  },
  { name: 'Pokenmoncard' }
);
