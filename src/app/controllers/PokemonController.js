import ListAllPokemonsService from '../services/ListAllPokemonsService';
import GetSpecificPokemonService from '../services/GetSpecificPokemonService';

class PokemonController {
  async index(request, response) {
    const { page = 1, limit = 40 } = request.query;
    const { allPokemons, totalRegisters } = await ListAllPokemonsService.execute({ page, limit });

    return response.json({
      allPokemons,
      totalRegisters
    });
  }

  async show(request, response) {
    const { pokemonId } = request.params;

    const pokemon = await GetSpecificPokemonService.execute({ pokemonId })

    return response.json(pokemon);
  }
}

export default new PokemonController();
