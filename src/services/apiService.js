import api from './api';

const getAllPokemons = async (offset = 0, limit = 40) => {
  const { data: responseApi } = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);

  return responseApi;
}

const getOnePokemon = async (pokemonId) => {
  const { data: responseApi } = await api.get(`/pokemon/${pokemonId}/`);

  return responseApi;
}

export { getAllPokemons, getOnePokemon };
