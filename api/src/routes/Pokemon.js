const  axios  = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const Pokemons = "https://pokeapi.co/api/v2/pokemon?limit=40"
//const Rocket = `https://pokeapi.co/api/v2/pokemon/${id}`
const router = Router();

function upperFirst(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

router.get('/', async function PokeApi(req, res) {
    try {
    const { Nombre } = req.query
    const { data } = await axios.get(Pokemons);
    const PokeDB = await Pokemon.findAll({
        include: { 
          model: Type, 
        attributes: ["Tipo"], 
        through: {
          attributes: [],
        },
      },
      });
    /*const Pokeres = PokeDB.map((e) => {
      return {
        ...e,
        types: e.types.map((e) => e.Tipo)
      }
    })*/
    console.log(PokeDB)
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
            Creado: false,
            types: e.types.map(({type}) => {
              return {
              Tipo: upperFirst(type.name),
            };
        }),
      }
    })
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

router.get("/:id", async function PokemonID(req, res) {
    const { id } = req.params;
    console.log(id)
    if (id) {
      if ((/^([0-9])*$/.test(id))) {
        try {
          const ASH = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          let obj = {
            ID: ASH.data.id,
            Nombre: upperFirst(ASH.data.name),
            Vida: ASH.data.stats.find((e) => e.stat.name === "hp").base_stat,
            Ataque: ASH.data.stats.find((e) => e.stat.name === "attack")
              .base_stat,
            Defensa: ASH.data.stats.find((e) => e.stat.name === "defense")
              .base_stat,
            Velocidad: ASH.data.stats.find((e) => e.stat.name === "speed")
              .base_stat,
            Altura: ASH.data.height,
            Peso: ASH.data.weight,
            Imagen: ASH.data.sprites.other.dream_world.front_default,
            Creado: false,
            Tipo: ASH.data.types.map((e) => upperFirst(e.type.name)),
          };
          return res.json(obj);
        } catch (error) {
          res.status(400).send("ID NOT EXISTS");
        }
      } else {
        try {
          let query = await Pokemon.findByPk(id, {
            include: { model: Type },
          });
           res.json(query);
        } catch (error) {
          res.status(400).send(`No hay id ${id} en la DB`);
        }
      }
    }
  });

 /* include: { 
    model: Type, 
  attributes: ["Tipo"], 
  through: {
    attributes: [],
  },
},*/

/*router.get('/:id', async function PokemonID(req, res) {
    try {
    const { id } = req.params;
    const query = await Pokemon.findByPk(id, {
        include: { model: Type },
    });
    res.json(query);
} catch(error) {
    res.json('No hay `{id}` en la DB')
}
    if(query === null) {
        try {
            const ASH = await axios.get(Rocket);
            const obj = {
            ID: ASH.data.id,
            Nombre: upperFirst(ASH.data.name),
            Vida: ASH.data.stats.find((e) => e.stat.name === "hp").base_stat,
            Ataque: ASH.data.stats.find((e) => e.stat.name === "attack").base_stat,
            Defensa: ASH.data.stats.find((e) => e.stat.name === "defense").base_stat,
            Velocidad: ASH.data.stats.find((e) => e.stat.name === "speed").base_stat,
            Altura: ASH.data.height,
            Peso: ASH.data.weight,
            Imagen: ASH.data.sprites.other.dream_world.front_default,
            Tipo: ASH.data.types.map((e) => upperFirst(e.type.name))
            };
            if(ASH) return res.json(obj);
        } catch(error) {
            res.json("ID NOT EXISTS")
        }
    }
})*/

router.post('/', async function createPoke(req, res) {
     const { Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Imagen, typeId } = req.body;
     try {
     const Val_Pokemon = await Pokemon.findOne({
         where: {
             Nombre: Nombre,
         },
     })
     if(!Val_Pokemon) {
         const new_Pokemon = await Pokemon.create({
             Nombre: Nombre,
             Vida: Vida,
             Ataque: Ataque,
             Defensa: Defensa,
             Velocidad: Velocidad,
             Altura: Altura,
             Peso: Peso,
             Imagen: Imagen,
             Creado: true
         });
         const PokeID = await Type.findAll({
            where: {
                id: typeId
            },
         });
         const show_Pokemon = await new_Pokemon.addType(PokeID);
         return res.send(show_Pokemon);
     } 
     const PokeID = await Type.findAll({
         where: {
             id: typeId,
         },
     });
     const show_Pokemon = await Val_Pokemon.addType(PokeID);
     res.send(show_Pokemon)
    } catch(error) {
         res.status(500).json(error);
     }
})

module.exports = router;