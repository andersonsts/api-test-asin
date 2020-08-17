import PokemonRepository from '../repositories/PokemonRepository';

class ListAllPokemonsService {
  async execute({ page, limit }) {
    let allPokemons = await PokemonRepository.getAllPokemonsFromDatabase(limit, page);

    const {
      pokemonIdsThatDoNotExitsInDatabase,
      totalRegisters
    } = await PokemonRepository.getPokemonIdsThatDoNotExistInDatabase(limit, page);

    if(!pokemonIdsThatDoNotExitsInDatabase) {
      return {
        allPokemons,
        totalRegisters
      };
    }

    const savedPokemons = await PokemonRepository
              .savePokemons(pokemonIdsThatDoNotExitsInDatabase);

    return {
      allPokemons: [...allPokemons, ...savedPokemons],
      totalRegisters
    }
  }
}

export default new ListAllPokemonsService();
