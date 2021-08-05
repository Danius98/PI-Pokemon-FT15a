const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();

router.get('/', async function getAll(req, res) {
    const { Tipo } = req.query; 
    try {
        if(!Tipo) {
            const All_Type = await Type.findAll({include: Pokemon});
            res.json(All_Type);
        } 
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;