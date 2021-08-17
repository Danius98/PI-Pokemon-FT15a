import { 
GET_POKEMONS,
GET_POKEMONS_NAME,
GET_POKEMON_ID,
GET_ALL_TYPES,
SHOW_DB_POKEMON,
NAME_ORDER_A,
NAME_ORDER_Z,
TYPE,
CREATED,
POKE_ATK_MAX,
POKE_ATK_MIN
} from '../actions/index.js';

const Name_Order = (a, b) => {
    if(a.Nombre < b.Nombre) return -1
    if(a.Nombre > b.Nombre) return 1
    return 0
  }

  const Atk_Order = (a, b) => {
    if(a.Ataque < b.Ataque) return -1
    if(a.Ataque > b.Ataque) return 1
    return 0
  }

const initialState = {
    Pokemons: [],
    PokeInfo: [],
    Types: []
};

function rootReducer(state = initialState, action) {
    if(action.type === GET_POKEMONS) {
        return {
            ...state,
            Pokemons: action.payload
        };
    }
    if(action.type === GET_POKEMONS_NAME) {
        return {
            ...state,
            Pokemons: action.payload
        };
    }
    if(action.type === GET_POKEMON_ID) {
        return {
            ...state,
            PokeInfo: action.payload
        }
    }
    if(action.type === GET_ALL_TYPES) {
        return {
            ...state,
            Types: action.payload
        };
    }
    if(action.type === SHOW_DB_POKEMON) {
        return {
            ...state,
            Pokemons: state.Pokemons.filter((c) => {
                return c.pokemon.some((a) => a.Nombre === action.payload)
            })
        };
    }
    if(action.type === NAME_ORDER_A) {
        return {
            ...state,
            Pokemons: state.Pokemons.slice().sort(Name_Order)
        }
    };
    if(action.type === NAME_ORDER_Z) {
        return {
            ...state,
            Pokemons: state.Pokemons.slice().sort(Name_Order).reverse()
        }
    };
    if(action.type === TYPE) {
        return {
            ...state,
            Pokemons: state.Pokemons.filter((c) => c.Tipo === action.payload)
        }
    };
    if(action.type === CREATED) {
        return {
            ...state,
            Pokemons: state.Pokemons.filter((c) => c.Creado === action.payload)
        }
    };
    if(action.type === POKE_ATK_MAX) {
        return {
            ...state,
            Pokemons: state.Pokemons.slice().sort(Atk_Order).reverse()
        }
    }
    if(action.type === POKE_ATK_MIN) {
        return {
            ...state,
            Pokemons: state.Pokemons.slice().sort(Atk_Order)
        }
    }
    return state;
}

export default rootReducer;
