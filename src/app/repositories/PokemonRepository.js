import Pokemon from '../models/Pokemon';

import { getOnePokemon, getAllPokemons } from '../../services/apiService';

class PokemonRepository {
  async getAllPokemonsFromDatabase(limit, page) {
    const allPokemons = await Pokemon.findAll({
      limit,
      offset: (page - 1) * limit
    });

    return allPokemons;
  }

  async getPokemonIdsThatDoNotExistInDatabase(limit, page) {
    const offset = (page - 1) * limit;

    const response = await getAllPokemons(offset, limit);
    const pokemonsIdsFromApi = response.results.map(result => Number(result.url.split('/')[6]));
    const { count: totalRegisters } = response;

    const pokemonsExistingInDatabase = await this.getAllPokemonsFromDatabase(limit, page);

    const arrayVerify = pokemonsExistingInDatabase.map(
      pokemonExisting => pokemonExisting['pokemon_identifier']
    );

    const pokemonIdsThatDoNotExitsInDatabase = pokemonsIdsFromApi.filter(id => !arrayVerify.includes(id));

    return { pokemonIdsThatDoNotExitsInDatabase, totalRegisters };
  }

  async savePokemons(pokemonsIds) {
    const [...data] = await Promise.all(pokemonsIds.map(pokemonId => getOnePokemon(pokemonId)));

    const pokemonsData = data.map(pokemonData => ({
      name: pokemonData.name,
      pokemon_identifier: pokemonData.id,
      avatar_url: pokemonData.sprites.front_default,
      types: pokemonData.types.map(typeItem => typeItem.type.name),
      abilities: pokemonData.abilities.map(abilityItem => abilityItem.ability.name),
      height: pokemonData.height,
      weight: pokemonData.weight
    }));

    const savedPokemons = await Pokemon.bulkCreate(pokemonsData);

    return savedPokemons;
  }

  async getOnePokemon(pokemonId) {
    const pokemon = await Pokemon.findByPk(pokemonId);

    return pokemon;
  }

  async savePokemon(pokemonId) {
    const pokemonData = await getOnePokemon(pokemonId);

    const pokemonObject = {
      name: pokemonData.name,
      pokemon_identifier: pokemonData.id,
      avatar_url: pokemonData.sprites.front_default,
      types: pokemonData.types.map(typeItem => typeItem.type.name),
      abilities: pokemonData.abilities.map(abilityItem => abilityItem.ability.name),
      height: pokemonData.height,
      weight: pokemonData.weight
    }

    const pokemon = await Pokemon.create(pokemonObject);

    return pokemon;
  }
}

export default new PokemonRepository();
