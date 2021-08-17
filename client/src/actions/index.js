import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS",
GET_POKEMONS_NAME = "GET_POKEMONS_NAME",
GET_POKEMON_ID = "GET_POKEMON_ID",
GET_ALL_TYPES = "GET_ALL_TYPES",
SHOW_DB_POKEMON = "SHOW_DB_POKEMON",
NAME_ORDER_A = "NAME_ORDER_A",
NAME_ORDER_Z = "NAME_ORDER_Z",
TYPE = "TYPE",
CREATED = "CREATED",
POKE_ATK_MAX = "POKE_ATK_MAX",
POKE_ATK_MIN = "POKE_ATK_MIN"

export function getPokemon() {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/Pokemon");
            return dispatch({ type: "GET_POKEMONS", payload: json.data})
        } catch(error) {
            console.log(error)
        };
    }
}

export function getPokemonsName(Nombre) {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/Pokemon?Nombre=" + Nombre);
            return dispatch({ type: "GET_POKEMONS_NAME", payload: json.data})
        } catch(error) {
            console.log("No se mostró el Pokemon")
        }
    }
}

export function getPokemonID(ID) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/Pokemon/${ID}`);
            return dispatch({ type: "GET_POKEMON_ID", payload: json.data})
        } catch(error) {
            console.log(`No se encontró el Pokemon con ${ID}`)
        }
    }
}

export function createPokemon(pokemon) {
    console.log("Pokemon: ", pokemon)
    return async function() {
        try {
            const addPoke = await axios.post("http://localhost:3001/Pokemon", pokemon);
            console.log(addPoke)
        } catch(error) {
            console.log("No se mostró el Pokemon")
        }
    }
}

export function getTypes() {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/Type");
            return dispatch({ type: "GET_ALL_TYPES", payload: json.data})
        } catch(error) {
            console.log(error)
        };
    }
}

export function show_Pokemon(payload) {
    return {
        type: SHOW_DB_POKEMON,
        payload
    };
};

export function Name_OrderA() {
    return {
        type: NAME_ORDER_A,
    }
}

export function Name_OrderZ() {
    return {
        type: NAME_ORDER_Z,
    }
}

export function Type(payload) {
    return {
        type: TYPE,
        payload
    }
}

export function Created(payload) {
    return {
        type: CREATED,
        payload
    }
}

export function Poke_Attack_Max() {
    return {
    type: POKE_ATK_MAX,
    }
}

export function Poke_Attack_Min() {
    return {
        type: POKE_ATK_MIN,
    }
}