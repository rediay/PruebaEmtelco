// Ejemplo de servicio para peticiones HTTP
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async () => {
  try {
    const response = await axios.get(`${API_URL}/pokemon?limit=20`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
