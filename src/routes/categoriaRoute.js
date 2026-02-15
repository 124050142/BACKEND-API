const express = require('express');
const { poblarCategorias, buscarCategoriaPorNombre  } = require('../controllers/categoriaController');
const router = express.Router();

router.post('/poblar', poblarCategorias);

router.get('/buscar', buscarCategoriaPorNombre); 

module.exports = router;