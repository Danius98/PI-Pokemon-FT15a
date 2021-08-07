const  axios  = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const Pokemons = "https://pokeapi.co/api/v2/pokemon?limit=40"
const PokeCode = "https://pokeapi.co/api/v2/pokemon/{id}"
const router = Router();

function upperFirst(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

router.get('/', async function PokeApi(req, res) {
    try {
    const { Nombre } = req.query
    const { data } = await axios.get(Pokemons);
    const PokeDB = await Pokemon.findAll();
    const response = await axios.all(data.results.map(async ({ url }) => await axios.get(url)));
    const results = response
    .map((e) => e.data)
    .map((e) => { 
        return {
            ID: e.id,
            Nombre: upperFirst(e.name),
            Vida: e.stats.find((e) => e.stat.name === "hp").base_stat,
            Ataque: e.stats.find((e) => e.stat.name === "attack").base_stat,
            Defensa: e.stats.find((e) => e.stat.name === "defense").base_stat,
            Velocidad: e.stats.find((e) => e.stat.name === "speed").base_stat,
            Altura: e.height,
            Peso: e.weight,
            Imagen: e.sprites.other.dream_world.front_default,
            Tipo: e.types.map((e) => upperFirst(e.type.name))
        };
    });
    const PokeArray = PokeDB.concat(results);
    const array = [];
    if(!Nombre) {
        return res.json(PokeArray);
    } else {
        for(j in PokeArray) {
            result = PokeArray[j].Nombre.toLowerCase().match(Nombre.toLocaleLowerCase());
            if(result) {
                array.push(PokeArray[j]);
            }
            console.log(array)
        }
        res.json(array)
    }
    } catch (error) {
        console.error("No hay Pokemons")
    }
})

/*router.get("/:id", async function PokeID(req, res) {
        const { id } = req.params;
        const query = await Pokemon.findByPk(id, { include: {model: Type}});
        res.json(query);
        if (query === null) {
            try {
               const PokeApi = await axios.get(PokeCode);
               const POKECODE = {
                ID: PokeApi.data.id,
                Nombre: PokeApi.data.upperFirst(name),
                Vida: PokeApi.data.stats.find((e) => e.stat.name === "hp").base_stat,
                Ataque: PokeApi.data.stats.find((e) => e.stat.name === "attack").base_stat,
                Defensa: PokeApi.data.stats.find((e) => e.stat.name === "defense").base_stat,
                Velocidad: PokeApi.data.stats.find((e) => e.stat.name === "speed").base_stat,
                Altura: PokeApi.data.height,
                Peso: PokeApi.data.weight,
                Imagen: PokeApi.data.sprites.other.dream_world.front_default,
                Tipo: PokeApi.data.types.map((e) => upperFirst(e.type.name))
               };
               if (PokeApi) return res.json(POKECODE);
            } catch(error) {
                res.json("ID NO EXISTENTE")
            }
        }
})*/

router.post('/', async function createPoke(req, res) {
     const { Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso } = req.body;
     try {
         const new_Pokemon = await Pokemon.create({
             Nombre,
             Vida,
             Ataque,
             Defensa,
             Velocidad,
             Altura,
             Peso
         });
         res.json(new_Pokemon);
     } catch(error) {
         res.status(500).json(error);
     }
})

module.exports = router;