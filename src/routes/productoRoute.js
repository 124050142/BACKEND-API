
const express = require('express');
const router = express.Router();
const { buscarProductoPorNombre } = require('../controllers/productoController');


router.get('/search', buscarProductoPorNombre); 

module.exports = router;