import PokemonRepository from '../repositories/PokemonRepository';

class GetSpecificPokemonService {
  async execute({ pokemonId }) {
    let pokemon = await PokemonRepository.getOnePokemon(pokemonId);

    if(!pokemon) {
      pokemon = await PokemonRepository.savePokemon(pokemonId);

      return pokemon;
    }

    return pokemon;
  }
}

export default new GetSpecificPokemonService();
