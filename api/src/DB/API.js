const axios = require('axios');
const { Pokemon, Type } = require ('../db')
const Pokemons = "https://pokeapi.co/api/v2/pokemon?limit=40"

function upperFirst(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

//Pokemons de la API al Back
async function API(_req, res) {
    try {
    const { data } = await axios.get(Pokemons);
    const response = await axios.all(data.results.map(async ({ url }) => await axios.get(url)));
    const results = response
    .map((e) => e.data)
    .map((e) => {
        return {
            id: e.id,
            name: upperFirst(e.name),
            hp: e.stats.find((e) => e.stat.name === "hp").base_stat,
            attack: e.stats.find((e) => e.stat.name === "attack").base_stat,
            defense: e.stats.find((e) => e.stat.name === "defense").base_stat,
            speed: e.stats.find((e) => e.stat.name === "speed").base_stat,
            height: e.height,
            weight: e.weight,
            image: e.sprites.other.dream_world.front_default,
            type: e.types.map((e) => upperFirst(e.type.name))
        };
    });
    res.send(results);
    } catch (error) {
        res.send(error)
    }
};

async function getDBPoke (_req, res) {
    try {
        const response = await Pokemon.findAll({ include: {model: Tipo, as: "type"}})
        const results = response.map((e) => {
            return {
                ...e,
                Tipo: e.type.map((e) => e.name)
            }
        })
        console.log(results)
        return results;
    } catch(error) {
        res.send(error)
    }
}

module.exports = {API, getDBPoke}