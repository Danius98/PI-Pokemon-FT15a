import { 
GET_POKEMONS,
GET_POKEMONS_NAME,
GET_POKEMON_ID,
GET_ALL_TYPES,
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
    ExactPoke: [],
    PokeInfo: [],
    Types: []
};

function rootReducer(state = initialState, action) {
    if(action.type === GET_POKEMONS) {
        return {
            ...state,
            ExactPoke: action.payload,
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
        const allPokemons = state.ExactPoke
        const typeFilter = action.payload === "Todos" ? allPokemons
        : allPokemons.filter(({types}) => {
                return types.find(({Tipo}) => Tipo === action.payload)}
                 )
                 return {
                     ...state,
                     Pokemons: typeFilter,
                 }
    };
    if(action.type === CREATED) {
        const Existe = state.Pokemons
        let createdFilter;
        if(action.payload === "Todos") {
            createdFilter = Existe;
        }
        if(action.payload === "true") {
            createdFilter = Existe.filter((e) => e.Creado === true)
        }
        if(action.payload === "false") {
            createdFilter = Existe.filter((e) => e.Creado === false)
        }
        return  {
                ...state,
                Pokemons: createdFilter,
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
