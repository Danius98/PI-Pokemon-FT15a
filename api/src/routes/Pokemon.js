const { default: axios } = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const Pokemons = "https://pokeapi.co/api/v2/pokemon?limit=40"
router = Router();


router.get('/', async function getPokemons(req, res) {
     const { data } = await axios.get(Pokemons);
     try {
         const response = await axios.all(
             data.results.map(async ({ url }) => await axios.get(url))
         );
         const results = response
         .map((e) => e.data)
         .map((e) => {
             return {
                 id: e.id,
                 name: upperFirst(e.name),
                 image: e.sprites.other.dream_world.front_default,
                 type: e.types.map((e) => upperFirst(e.type.name))
             };
         });
         return results;
     } catch(error) {
         res.send(error);
     }
    })

module.exports = router;