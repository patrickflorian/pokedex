
export const prefixer = `https://pokebuildapi.fr/api/v1/`;
// export const prefixer = 'http://localhost:8003/api/v1/';


export const PokedexUrl = {
    LIST_POKEMON: `${prefixer}pokemon`,
    LIST_POKEMON_LIMIT: (limit: number) => `${prefixer}pokemon/limit/${limit}`,
    LIST_TYPES: `${prefixer}types`,
    GET_POKEMON_BY_ID: (id: number | string) => `${prefixer}pokemon/${id}`,
};
