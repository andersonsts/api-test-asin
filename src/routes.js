import { Router } from 'express';

const routes = new Router();

import PokemonController from './app/controllers/PokemonController';

routes.get('/pokemons', PokemonController.index);
routes.get('/pokemons/:pokemonId', PokemonController.show);

export default routes;
