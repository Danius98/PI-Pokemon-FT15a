const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const PokemonRoutes = require('./Pokemon')
const TypeRoutes = require('./Type')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/Pokemon', PokemonRoutes)
router.use('/Type', TypeRoutes)

module.exports = router;
