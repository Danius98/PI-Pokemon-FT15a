const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();

router.get('/', async function getAll(_req, res) {
    try {
        const All_Type = await Type.findAll();
        res.json(All_Type)
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;