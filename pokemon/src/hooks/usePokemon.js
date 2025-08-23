import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/api';

export default function usePokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemonList()
      .then(data => {
        setPokemon(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { pokemon, loading, error };
}
