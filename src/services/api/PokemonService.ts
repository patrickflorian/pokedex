import BaseService from "./BaseService";
import { PokedexUrl } from "./urls";

class PokemonService {
    static listPokemon = async () => {
        return BaseService.getRequest(PokedexUrl.LIST_POKEMON, false);
    }
    static listPokemonTypes = async () => {
        return BaseService.getRequest(PokedexUrl.LIST_TYPES, false);
    }
    static getPokemonDetail = async (id: string | number) => {
        return BaseService.getRequest(PokedexUrl.GET_POKEMON_BY_ID(id), false);
    }
}

export default PokemonService;