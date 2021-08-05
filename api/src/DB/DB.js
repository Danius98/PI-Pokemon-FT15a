const axios = require('axios');
const { Type } = require ('../db')
const ALL_TYPE = "https://pokeapi.co/api/v2/type"

async function DataBase(_req, res) {
    try {
      {
        const All_Api = await axios.get(ALL_TYPE);
        const Type_Model = All_Api.data.results.map((e) => {
            return {
                Tipo: e.name,
            };
        });
        Type_Model.forEach(async (e) => {
            await Type.findOrCreate({
                where: {
                    Tipo: e.Tipo
                },
            });
        });
      }
      console.log('Josha')
    } catch(error) {
        res.send(error);
    }
}

module.exports = {DataBase}