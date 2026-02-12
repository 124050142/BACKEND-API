const express = require('express');
const { poblarCategorias } = require('../controllers/categoriaController');
const router = express.Router();

router.post('/poblar', poblarCategorias);

module.exports = router;